"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSettingsRouter = void 0;
const auth_1 = require("../../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const Banner_1 = require("../../models/Banner");
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const AppError_1 = require("../../utils/AppError");
const cloudinary_1 = require("../../utils/cloudinary");
function mapBanner(item) {
    return {
        _id: String(item._id),
        imageUrl: item.imageUrl,
        imagePublicId: item.imagePublicId,
        createdAt: item.createdAt.toISOString(),
    };
}
const BANNER_FOLDER = "ecommerce-monster-video/banners";
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024,
        files: 10,
    },
});
exports.adminSettingsRouter = (0, express_1.Router)();
exports.adminSettingsRouter.use(auth_1.requireAdmin);
exports.adminSettingsRouter.get("/settings/banners", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const items = await Banner_1.Banner.find().sort({ createdAt: -1 });
    res.json((0, envelope_1.ok)({
        items: items.map(mapBanner),
    }));
}));
exports.adminSettingsRouter.post("/settings/banners", upload.array("images", 10), (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const files = (req.files || []);
    if (!files.length) {
        throw new AppError_1.AppError(400, "At least one image is required");
    }
    const uploadedImages = await (0, cloudinary_1.uploadManyBuffersToCloudinary)(files.map((file) => file.buffer), BANNER_FOLDER);
    const createFinalBanners = await Banner_1.Banner.insertMany(uploadedImages.map((item) => ({
        imageUrl: item.url,
        imagePublicId: item.publicId,
        createdBy: dbUser._id,
    })));
    res.json((0, envelope_1.ok)({
        items: createFinalBanners.map(mapBanner),
    }));
}));
