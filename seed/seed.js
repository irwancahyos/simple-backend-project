import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/productModel.js";

dotenv.config();

const products = [
  {
    name: "T-Shirt Oversized",
    category: "Apparel",
    brand: "UrbanDrip",
    description: "Soft cotton oversized T-shirt with minimal logo",
    variants: [
      { sku: "TSHIRT-BLK-M", color: "Black", size: "M", price: 129000, stock: 42 },
      { sku: "TSHIRT-WHT-L", color: "White", size: "L", price: 139000, stock: 13 },
    ],
    rating: 4.6,
  },
  {
    name: "Sneakers Runner",
    category: "Footwear",
    brand: "FastFeet",
    description: "Lightweight running sneakers",
    variants: [
      { sku: "SNKR-BLU-42", color: "Blue", size: "42", price: 499000, stock: 22 },
      { sku: "SNKR-RED-44", color: "Red", size: "44", price: 519000, stock: 5 },
    ],
    rating: 4.8,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected. Seeding products...");
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted.`);
    mongoose.connection.close();
  })
  .catch((err) => console.log("Seeding error:", err));
