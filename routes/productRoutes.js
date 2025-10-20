import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();
// Create product (original)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /api/products error:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all products (with filter, sort, pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt", order = "desc", name, category, brand } = req.query;

    // Build filters
    const filters = {};
    if (name) filters.name = { $regex: name, $options: "i" };
    if (category) filters.category = { $regex: category, $options: "i" };
    if (brand) filters.brand = { $regex: brand, $options: "i" };

    const products = await Product.find(filters)
      .sort({ [sort]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filters);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
