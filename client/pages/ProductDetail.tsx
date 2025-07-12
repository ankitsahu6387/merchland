import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  User,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "@shared/types";
import { cn } from "../lib/utils";

// Mock product data - in real app this would come from API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "PewDiePie Official Gaming Hoodie",
    description:
      "Premium quality gaming hoodie from the king of YouTube. Made with 100% cotton blend for ultimate comfort during those long gaming sessions. Features the iconic PewDiePie logo and comes in multiple colors. Perfect for fans who want to show their support while staying comfortable.",
    price: 2499,
    originalPrice: 3499,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
    ],
    category: "Hoodies",
    celebrity: {
      id: "pewdiepie",
      name: "PewDiePie",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      verified: true,
      followerCount: 111000000,
    },
    tags: ["gaming", "merch", "youtube", "comfortable", "premium"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Red", "Navy", "Grey"],
    stock: 50,
    rating: 4.8,
    reviewCount: 1234,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "MrBeast Chocolate Bar T-Shirt",
    description:
      "Official MrBeast merchandise celebrating Feastables chocolate bars.",
    price: 1299,
    originalPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    ],
    category: "T-Shirts",
    celebrity: {
      id: "mrbeast",
      name: "MrBeast",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      verified: true,
      followerCount: 200000000,
    },
    tags: ["mrbeast", "feastables", "youtube"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    stock: 75,
    rating: 4.9,
    reviewCount: 856,
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    user: "Gaming Pro",
    rating: 5,
    comment:
      "Amazing quality hoodie! Super comfortable and the design is perfect. Fits exactly as expected.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: "2",
    user: "PewDiePie Fan",
    rating: 4,
    comment:
      "Great hoodie, love the material. Delivery was fast too. Highly recommend!",
    date: "2024-01-08",
    verified: true,
  },
  {
    id: "3",
    user: "Merch Collector",
    rating: 5,
    comment:
      "Best gaming hoodie I've ever bought. The quality is outstanding and it's so warm and comfortable.",
    date: "2024-01-05",
    verified: false,
  },
];

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "specs"
  >("description");
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors?.[0] || "");
        setSelectedSize(foundProduct.sizes?.[0] || "");

        // Get related products (same category, different product)
        const related = mockProducts.filter(
          (p) => p.id !== id && p.category === foundProduct.category,
        );
        setRelatedProducts(related);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-900 rounded-lg animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-900 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-900 rounded animate-pulse" />
              <div className="h-4 bg-gray-900 rounded animate-pulse" />
              <div className="h-6 bg-gray-900 rounded animate-pulse w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/products">
            <Button className="bg-red-600 hover:bg-red-700">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
  };

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index
                      ? "border-red-500"
                      : "border-gray-700 hover:border-gray-600",
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Celebrity Badge */}
            <div className="flex items-center space-x-3 bg-gray-900 rounded-lg p-4 border border-gray-700">
              <img
                src={product.celebrity.avatar}
                alt={product.celebrity.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {product.celebrity.name}
                  </span>
                  {product.celebrity.verified && (
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {(product.celebrity.followerCount! / 1000000).toFixed(0)}M
                  followers
                </p>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600",
                      )}
                    />
                  ))}
                  <span className="ml-2 text-gray-400">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-red-600 text-white">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-400">
                    In Stock ({product.stock} left)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-red-400">Out of Stock</span>
                </>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 border rounded-md transition-colors",
                        selectedSize === size
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-gray-600 hover:border-gray-500",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Color:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 border rounded-md transition-colors",
                        selectedColor === color
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-gray-600 hover:border-gray-500",
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-600 rounded-md hover:border-gray-500 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="p-2 border border-gray-600 rounded-md hover:border-gray-500 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-red-600 hover:bg-red-700 text-lg py-3"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleToggleWishlist}
                variant="outline"
                className={cn(
                  "px-4 py-3 border-gray-600",
                  isLiked
                    ? "bg-red-600 border-red-600 text-white"
                    : "hover:border-red-500 hover:text-red-400",
                )}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-gray-700">
              <div className="flex items-center space-x-3 text-gray-300">
                <Truck className="h-5 w-5 text-red-400" />
                <span>Free delivery on orders above ₹999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <RotateCcw className="h-5 w-5 text-red-400" />
                <span>Easy 30-day returns</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Shield className="h-5 w-5 text-red-400" />
                <span>100% Authentic merchandise</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Description" },
                { id: "reviews", label: `Reviews (${product.reviewCount})` },
                { id: "specs", label: "Specifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === tab.id
                      ? "border-red-500 text-red-400"
                      : "border-transparent text-gray-400 hover:text-gray-300",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {product.description}
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Features:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Premium quality materials</li>
                    <li>Comfortable fit for all-day wear</li>
                    <li>Official licensed merchandise</li>
                    <li>Machine washable</li>
                    <li>Perfect for fans and collectors</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button variant="outline" className="border-gray-600">
                    Write Review
                  </Button>
                </div>

                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-900 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-green-500 text-green-400"
                                >
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-4 w-4",
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-600",
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-400">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Product Details
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Category:</dt>
                      <dd className="text-white">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Material:</dt>
                      <dd className="text-white">100% Cotton Blend</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Care:</dt>
                      <dd className="text-white">Machine Wash</dd>
                    </div>
                    {product.sizes && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Available Sizes:</dt>
                        <dd className="text-white">
                          {product.sizes.join(", ")}
                        </dd>
                      </div>
                    )}
                    {product.colors && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Available Colors:</dt>
                        <dd className="text-white">
                          {product.colors.join(", ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Shipping & Returns
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Shipping:</dt>
                      <dd className="text-white">2-5 business days</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Return Policy:</dt>
                      <dd className="text-white">30 days</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Warranty:</dt>
                      <dd className="text-white">1 year quality guarantee</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
