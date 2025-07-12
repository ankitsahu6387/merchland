import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export function Wishlist() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gray-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-400 mb-8">
            Save items you love to your wishlist for easy shopping later.
          </p>
          <Link to="/products">
            <Button className="bg-red-600 hover:bg-red-700">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Wishlist ({items.length})</h1>
        <Button
          onClick={clearWishlist}
          variant="outline"
          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
        >
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </div>
  );
}
