import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Category } from "../../models/Category";
import { ok } from "../../utils/envelope";
import { Product } from "../../models/Product";
import { requireFound } from "../../utils/helpers";
import { slugifyText } from "../../utils/slug";

export const customerProductRouter = Router();

type ProductSort = "recent" | "price-low" | "price-high";

type ProductAppliedFilterListQuery = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: ProductSort;
};

customerProductRouter.get(
  "/categories",

  asyncHandler(async (_req: Request, res: Response) => {
    const categories = await Category.find({}).sort({ name: 1 });

    // Backfill slugs for legacy records so new slug URLs work without manual admin edits.
    await Promise.all(
      categories
        .filter((category) => !category.slug)
        .map(async (category) => {
          category.slug = slugifyText(category.name) || "category";
          await category.save();
        }),
    );

    res.json(ok(categories));
  }),
);

customerProductRouter.get(
  "/products",

  asyncHandler(
    async (
      req: Request<{}, {}, {}, ProductAppliedFilterListQuery>,
      res: Response,
    ) => {
      const category = (req.query.category || "").trim();
      const brand = (req.query.brand || "").trim();
      const color = (req.query.color || "").trim();
      const size = (req.query.size || "").trim();
      const sort: ProductSort = req.query.sort || "recent";

      const query: Record<string, unknown> = {
        status: "active",
      };

      if (category) {
        const categoryDoc = await Category.findOne({ slug: category })
          .select("_id name slug")
          .lean();

        if (!categoryDoc) {
          res.json(ok([]));
          return;
        }

        query.category = categoryDoc._id;
      }
      if (brand) {
        query.brand = brand;
      }
      if (color) {
        query.colors = color;
      }
      if (size) {
        query.sizes = size;
      }

      let sortOption: Record<string, 1 | -1> = { createdAt: -1 };

      if (sort === "price-low") {
        sortOption = { price: 1 };
      }

      if (sort === "price-high") {
        sortOption = { price: -1 };
      }

      const products = await Product.find(query)
        .populate("category", "name slug")
        .sort(sortOption);

      await Promise.all(
        products
          .filter((product) => !product.slug)
          .map(async (product) => {
            product.slug = slugifyText(product.title) || "product";
            await product.save();
          }),
      );

      res.json(ok(products));
    },
  ),
);

customerProductRouter.get(
  "/products/:slug",

  asyncHandler(async (req: Request, res: Response) => {
    const productSlug = String(req.params.slug || "").trim();

    let product = await Product.findOne({
      slug: productSlug,
      status: "active",
    }).populate("category", "name slug");

    // Backward compatibility for existing product docs that don't yet have a persisted slug.
    if (!product) {
      const candidates = await Product.find({ status: "active" })
        .select("_id title")
        .lean();

      const matched = candidates.find(
        (item) => slugifyText(item.title) === productSlug,
      );

      if (matched) {
        product = await Product.findOne({
          _id: matched._id,
          status: "active",
        }).populate("category", "name slug");

        if (product && !product.slug) {
          product.slug = productSlug;
          await product.save();
        }
      }
    }

    const foundProduct = requireFound(product, "Product not found", 404);

    const relatedProducts = await Product.find({
      _id: { $ne: foundProduct._id },
      category: foundProduct.category,
      status: "active",
    })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(4);

    await Promise.all(
      [foundProduct, ...relatedProducts]
        .filter((item) => !item.slug)
        .map(async (item) => {
          item.slug = slugifyText(item.title) || "product";
          await item.save();
        }),
    );

    res.json(
      ok({
        product: foundProduct,
        relatedProducts,
      }),
    );
  }),
);
