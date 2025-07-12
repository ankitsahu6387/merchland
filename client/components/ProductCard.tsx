import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Product } from "@shared/types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { cn } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={cn(
          "group bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:scale-105",
          className,
        )}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all",
              isLiked
                ? "bg-red-600 text-white"
                : "bg-black/50 text-white hover:bg-red-600",
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </button>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-600 text-white">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Celebrity Badge */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-black/70 rounded-full px-3 py-1">
            <img
              src={product.celebrity.avatar}
              alt={product.celebrity.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white text-sm font-medium">
              {product.celebrity.name}
            </span>
            {product.celebrity.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600",
                  )}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-white text-lg font-bold">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 text-sm line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
