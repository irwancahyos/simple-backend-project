import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  sku: String,
  color: String,
  size: String,
  price: Number,
  stock: Number,
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: String,
    brand: String,
    description: String,
    variants: [variantSchema],
    rating: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
