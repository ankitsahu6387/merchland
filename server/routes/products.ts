import { RequestHandler } from "express";
import { Product, ApiResponse } from "@shared/types";
import { mockProducts } from "../data/mockData";

export const getAllProducts: RequestHandler = (req, res) => {
  const { category, search, limit, offset } = req.query;

  let filtered = [...mockProducts];

  // Filter by category
  if (category && category !== "All") {
    filtered = filtered.filter(
      (product) =>
        product.category.toLowerCase() === (category as string).toLowerCase(),
    );
  }

  // Search filter
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.celebrity.name.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
  }

  // Pagination
  const limitNum = limit ? parseInt(limit as string) : 20;
  const offsetNum = offset ? parseInt(offset as string) : 0;
  const paginatedProducts = filtered.slice(offsetNum, offsetNum + limitNum);

  const response: ApiResponse<{ products: Product[]; total: number }> = {
    success: true,
    data: {
      products: paginatedProducts,
      total: filtered.length,
    },
  };

  res.json(response);
};

export const getProductById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Product not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Product> = {
    success: true,
    data: product,
  };

  res.json(response);
};

export const getFeaturedProducts: RequestHandler = (req, res) => {
  const featured = mockProducts.filter((product) => product.featured);

  const response: ApiResponse<Product[]> = {
    success: true,
    data: featured,
  };

  res.json(response);
};
