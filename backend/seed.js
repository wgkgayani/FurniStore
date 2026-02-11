import mongoose from "mongoose";
import Product from "./models/product.js";
import "dotenv/config";

const sampleProducts = [
  {
    productId: "FURN001",
    name: "Modern Leather Sofa",
    description: "Comfortable 3-seater leather sofa with wooden legs",
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25"],
    labelledPrice: 899,
    price: 699,
    stock: 15,
    isAvailable: true,
  },
  // Add more products...
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample products added");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
