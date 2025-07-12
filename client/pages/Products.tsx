import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { ProductCard } from "../components/ProductCard";
import { Product } from "@shared/types";

// Mock products data - in real app this would come from API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "PewDiePie Official Gaming Hoodie",
    description: "Premium quality gaming hoodie from the king of YouTube",
    price: 2499,
    originalPrice: 3499,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"],
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
    tags: ["gaming", "merch", "youtube"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red"],
    stock: 50,
    rating: 4.8,
    reviewCount: 1234,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "MrBeast Chocolate Bar T-Shirt",
    description: "Official MrBeast merchandise celebrating Feastables",
    price: 1299,
    originalPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
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
  {
    id: "3",
    name: "CarryMinati Roast Mug",
    description: "Premium ceramic mug for all roasting sessions",
    price: 599,
    images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"],
    category: "Accessories",
    celebrity: {
      id: "carryminati",
      name: "CarryMinati",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      verified: true,
      followerCount: 40000000,
    },
    tags: ["carryminati", "roast", "indian"],
    stock: 100,
    rating: 4.7,
    reviewCount: 423,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "BB Ki Vines Vintage T-Shirt",
    description: "Classic vintage style tee from Bhuvan Bam",
    price: 999,
    originalPrice: 1499,
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
    ],
    category: "T-Shirts",
    celebrity: {
      id: "bhuvanb",
      name: "Bhuvan Bam",
      platform: "youtube",
      avatar: "https://images.unsplash.com/photo-1558499932-8a515e97bf6f?w=100",
      verified: true,
      followerCount: 26000000,
    },
    tags: ["bbkivines", "vintage", "comedy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Maroon", "Black"],
    stock: 80,
    rating: 4.6,
    reviewCount: 245,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Ashish Chanchlani Comedy Hoodie",
    description: "Comfortable hoodie perfect for comedy fans",
    price: 1899,
    originalPrice: 2499,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    ],
    category: "Hoodies",
    celebrity: {
      id: "ashishvideo",
      name: "Ashish Chanchlani",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      verified: true,
      followerCount: 29000000,
    },
    tags: ["ashish", "comedy", "youtube"],
    sizes: ["M", "L", "XL"],
    colors: ["Grey", "Black", "Blue"],
    stock: 45,
    rating: 4.7,
    reviewCount: 189,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Techno Gamerz RGB Gaming Mousepad",
    description: "Large RGB gaming mousepad for pro gamers",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1580327332075-4d2d3c44c781?w=400",
    ],
    category: "Gaming",
    celebrity: {
      id: "technogamerz",
      name: "Techno Gamerz",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      verified: true,
      followerCount: 35000000,
    },
    tags: ["gaming", "rgb", "mousepad"],
    stock: 70,
    rating: 4.6,
    reviewCount: 167,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

const categories = [
  "All",
  "T-Shirts",
  "Hoodies",
  "Accessories",
  "Caps",
  "Posters",
  "Gaming",
  "Mugs",
];

const platforms = ["All", "YouTube", "Instagram", "TikTok"];
const priceRanges = [
  { label: "All", min: 0, max: 10000 },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "Above ₹2000", min: 2000, max: 10000 },
];
const ratings = [
  { label: "All", value: 0 },
  { label: "4+ Stars", value: 4 },
  { label: "4.5+ Stars", value: 4.5 },
];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize search query from URL params
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }

    // Initialize sort from URL params
    const sort = searchParams.get("sort");
    if (sort) {
      setSortBy(sort);
    }

    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Celebrity filter from URL params
    const celebrityParam = searchParams.get("celebrity");
    if (celebrityParam) {
      filtered = filtered.filter(
        (product) => product.celebrity.id === celebrityParam,
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.celebrity.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Platform filter
    if (selectedPlatform !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.celebrity.platform === selectedPlatform.toLowerCase(),
      );
    }

    // Price range filter
    if (selectedPriceRange !== "All") {
      const range = priceRanges.find((r) => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(
          (product) => product.price >= range.min && product.price <= range.max,
        );
      }
    } else {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1],
      );
    }

    // Rating filter
    if (selectedRating !== "All") {
      const minRating =
        ratings.find((r) => r.label === selectedRating)?.value || 0;
      filtered = filtered.filter((product) => product.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    setFilteredProducts(filtered);
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedPlatform,
    selectedPriceRange,
    selectedRating,
    sortBy,
    priceRange,
    searchParams,
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPlatform("All");
    setSelectedPriceRange("All");
    setSelectedRating("All");
    setSortBy("newest");
    setPriceRange([0, 10000]);
    setSearchQuery("");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4 animate-pulse">
              <div className="aspect-square bg-gray-800 rounded mb-4" />
              <div className="h-4 bg-gray-800 rounded mb-2" />
              <div className="h-4 bg-gray-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {location.pathname === "/search" ? "Search Results" : "Products"}
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-lg">
            <Input
              type="text"
              placeholder="Search for products or celebrities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Search
          </Button>
        </form>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-gray-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setViewMode("grid")}
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-gray-400">
            {filteredProducts.length} products found
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-64 bg-gray-900 rounded-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filters</h3>
              <Button onClick={clearFilters} variant="ghost" size="sm">
                Clear All
              </Button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Platform</h4>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedPlatform === platform}
                      onCheckedChange={() => setSelectedPlatform(platform)}
                    />
                    <span className="text-sm">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-2 mb-3">
                {priceRanges.map((range) => (
                  <label
                    key={range.label}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={selectedPriceRange === range.label}
                      onCheckedChange={() => setSelectedPriceRange(range.label)}
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>

              {selectedPriceRange === "All" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="bg-gray-800 border-gray-700"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Rating</h4>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label
                    key={rating.label}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={selectedRating === rating.label}
                      onCheckedChange={() => setSelectedRating(rating.label)}
                    />
                    <span className="text-sm">{rating.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                No products found
              </div>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={viewMode === "list" ? "flex-row h-48" : ""}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
