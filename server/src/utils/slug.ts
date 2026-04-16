import mongoose from "mongoose";

export function slugifyText(value: string) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export async function buildUniqueSlug(
  model: mongoose.Model<unknown>,
  sourceText: string,
  currentId?: mongoose.Types.ObjectId,
) {
  const base = slugifyText(sourceText) || "item";

  let slug = base;
  let counter = 1;

  // Keep incrementing until we find a slug that isn't used by another document.
  while (true) {
    const existing = await model.findOne({ slug }).select("_id").lean();

    if (!existing) {
      return slug;
    }

    if (currentId && String((existing as { _id: unknown })._id) === String(currentId)) {
      return slug;
    }

    counter += 1;
    slug = `${base}-${counter}`;
  }
}