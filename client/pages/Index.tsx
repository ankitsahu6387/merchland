import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Star, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ProductCard } from "../components/ProductCard";
import { HomeSearch } from "../components/HomeSearch";
import { Product, Celebrity } from "@shared/types";

// Mock data - in real app this would come from API
const allMockProducts: Product[] = [
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
    id: "4",
    name: "Dude Perfect Trick Shot Cap",
    description: "Official cap from the trick shot masters",
    price: 899,
    originalPrice: 1299,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
    ],
    category: "Caps",
    celebrity: {
      id: "dudeperfect",
      name: "Dude Perfect",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      verified: true,
      followerCount: 59000000,
    },
    tags: ["dudeperfect", "sports", "tricks"],
    colors: ["Blue", "Red", "Black"],
    stock: 25,
    rating: 4.6,
    reviewCount: 312,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Techno Gamerz Gaming Setup Poster",
    description: "High-quality poster featuring epic gaming setup",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400",
    ],
    category: "Posters",
    celebrity: {
      id: "technogamerz",
      name: "Techno Gamerz",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      verified: true,
      followerCount: 35000000,
    },
    tags: ["gaming", "poster", "tech"],
    stock: 150,
    rating: 4.5,
    reviewCount: 287,
    featured: false,
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
    id: "8",
    name: "Elvish Yadav Systum Phone Case",
    description: "Durable phone case with Elvish's signature style",
    price: 799,
    images: ["https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400"],
    category: "Accessories",
    celebrity: {
      id: "elvishyadav",
      name: "Elvish Yadav",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
      verified: true,
      followerCount: 15000000,
    },
    tags: ["elvish", "systum", "phone"],
    stock: 120,
    rating: 4.4,
    reviewCount: 156,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Sourav Joshi Art Sketch Book",
    description: "Premium sketch book for aspiring artists",
    price: 449,
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    ],
    category: "Accessories",
    celebrity: {
      id: "souravjoshi",
      name: "Sourav Joshi",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
      verified: true,
      followerCount: 20000000,
    },
    tags: ["sourav", "art", "sketch"],
    stock: 200,
    rating: 4.8,
    reviewCount: 89,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Triggered Insaan React Mug",
    description: "Perfect mug for reaction video fans",
    price: 549,
    images: [
      "https://images.unsplash.com/photo-1608500344087-cc84d0fb53e3?w=400",
    ],
    category: "Accessories",
    celebrity: {
      id: "triggered",
      name: "Triggered Insaan",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100",
      verified: true,
      followerCount: 18000000,
    },
    tags: ["triggered", "react", "gaming"],
    stock: 90,
    rating: 4.5,
    reviewCount: 134,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    name: "PewDiePie Bro Fist Keychain",
    description: "Iconic bro fist keychain for true bros",
    price: 299,
    images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400"],
    category: "Accessories",
    celebrity: {
      id: "pewdiepie",
      name: "PewDiePie",
      platform: "youtube",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      verified: true,
      followerCount: 111000000,
    },
    tags: ["pewdiepie", "brofist", "keychain"],
    stock: 300,
    rating: 4.9,
    reviewCount: 567,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    name: "MrBeast Beast Mode Tank Top",
    description: "Lightweight tank top for beast mode workouts",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
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
    tags: ["mrbeast", "workout", "beast"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Red"],
    stock: 60,
    rating: 4.6,
    reviewCount: 223,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

const topCelebrities: Celebrity[] = [
  {
    id: "pewdiepie",
    name: "PewDiePie",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    verified: true,
    followerCount: 111000000,
  },
  {
    id: "mrbeast",
    name: "MrBeast",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    verified: true,
    followerCount: 200000000,
  },
  {
    id: "carryminati",
    name: "CarryMinati",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    verified: true,
    followerCount: 40000000,
  },
  {
    id: "dudeperfect",
    name: "Dude Perfect",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    verified: true,
    followerCount: 59000000,
  },
];

export function Index() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In real app, fetch from API
    setFeaturedProducts(allMockProducts);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-red-900/20 to-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              India's #1 Celebrity Merch Store
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              MerchLand
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Exclusive merchandise from your favorite YouTubers, influencers,
              and celebrities. Authentic products, guaranteed quality.
            </p>

            {/* Homepage Search */}
            <div className="mb-8">
              <HomeSearch />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/celebrities">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white text-lg px-8 py-4"
                >
                  Browse Celebrities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">500+</div>
              <div className="text-gray-300">Celebrity Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">1M+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">10K+</div>
              <div className="text-gray-300">Products Sold</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Celebrities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top Celebrities
            </h2>
            <p className="text-gray-400 text-lg">
              Shop merchandise from the biggest names
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topCelebrities.map((celebrity) => (
              <Link
                key={celebrity.id}
                to={`/celebrities/${celebrity.id}`}
                className="group bg-gray-900 border border-gray-700 rounded-lg p-6 text-center hover:border-red-500/50 transition-all hover:scale-105"
              >
                <div className="relative mb-4">
                  <img
                    src={celebrity.avatar}
                    alt={celebrity.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  {celebrity.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                  {celebrity.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {celebrity.followerCount
                    ? `${(celebrity.followerCount / 1000000).toFixed(0)}M followers`
                    : "Verified Creator"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-gray-400 text-lg">
                Handpicked merchandise from top creators
              </p>
            </div>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Arrivals
              </h2>
              <p className="text-gray-400 text-lg">
                Fresh drops from your favorite creators
              </p>
            </div>
            <Link to="/products?sort=newest">
              <Button
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                Shop Latest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trending Now
              </h2>
              <p className="text-gray-400 text-lg">
                Most popular products this week
              </p>
            </div>
            <Link to="/products?sort=popular">
              <Button
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                View Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(8, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-400 text-lg">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "T-Shirts",
                image:
                  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
                count: "2.5K+",
              },
              {
                name: "Hoodies",
                image:
                  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300",
                count: "1.8K+",
              },
              {
                name: "Accessories",
                image:
                  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300",
                count: "3.2K+",
              },
              {
                name: "Caps",
                image:
                  "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300",
                count: "900+",
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-red-500/50 transition-all hover:scale-105"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {category.count} products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 text-lg mb-8">
            Get notified about new merch drops and exclusive deals
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <Button className="bg-red-600 hover:bg-red-700 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
