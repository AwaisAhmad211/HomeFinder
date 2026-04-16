import mongoose, { HydratedDocument } from "mongoose";
import { buildUniqueSlug } from "../utils/slug";

export type Category = {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryDocument = HydratedDocument<Category>;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

CategorySchema.pre("validate", async function () {
  const category = this as CategoryDocument;

  if (!category.name) {
    return;
  }

  if (!category.isModified("name") && category.slug) {
    return;
  }

  const model = category.constructor as mongoose.Model<unknown>;
  category.slug = await buildUniqueSlug(model, category.name, category._id);
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<Category>("Category", CategorySchema);
