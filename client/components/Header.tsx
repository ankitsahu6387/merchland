import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-red-600 text-white font-bold text-xl px-3 py-1 rounded">
                ML
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                MerchLand
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              <Link
                to="/products"
                className="text-gray-300 hover:text-white transition-colors"
              >
                All Products
              </Link>
              <Link
                to="/celebrities"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Celebrities
              </Link>
            </nav>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-300 hover:text-white"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-300 hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  Login
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <nav className="space-y-2">
                <Link
                  to="/products"
                  className="block text-white hover:text-red-400 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  to="/celebrities"
                  className="block text-white hover:text-red-400 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Celebrities
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/profile"
                      className="block text-white hover:text-red-400 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block text-white hover:text-red-400 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
