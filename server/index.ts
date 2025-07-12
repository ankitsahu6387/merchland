import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
} from "./routes/products";
import { loginUser, signupUser, getCurrentUser } from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Product routes
  app.get("/api/products", getAllProducts);
  app.get("/api/products/featured", getFeaturedProducts);
  app.get("/api/products/:id", getProductById);

  // Auth routes
  app.post("/api/auth/login", loginUser);
  app.post("/api/auth/signup", signupUser);
  app.get("/api/auth/me", getCurrentUser);

  return app;
}
