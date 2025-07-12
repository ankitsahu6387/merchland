import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Users, CheckCircle, Youtube, Instagram } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Celebrity } from "@shared/types";

// Mock celebrities data - in real app this would come from API
const mockCelebrities: Celebrity[] = [
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
  {
    id: "technogamerz",
    name: "Techno Gamerz",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    verified: true,
    followerCount: 35000000,
  },
  {
    id: "bhuvanb",
    name: "Bhuvan Bam",
    platform: "youtube",
    avatar: "https://images.unsplash.com/photo-1558499932-8a515e97bf6f?w=100",
    verified: true,
    followerCount: 26000000,
  },
  {
    id: "ashishvideo",
    name: "Ashish Chanchlani",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    verified: true,
    followerCount: 29000000,
  },
  {
    id: "elvishyadav",
    name: "Elvish Yadav",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    verified: true,
    followerCount: 15000000,
  },
  {
    id: "souravjoshi",
    name: "Sourav Joshi",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
    verified: true,
    followerCount: 20000000,
  },
  {
    id: "triggered",
    name: "Triggered Insaan",
    platform: "youtube",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100",
    verified: true,
    followerCount: 18000000,
  },
];

const platformFilters = ["All", "YouTube", "Instagram", "TikTok"];
const followerRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "50M+", min: 50000000, max: Infinity },
  { label: "20M - 50M", min: 20000000, max: 50000000 },
  { label: "10M - 20M", min: 10000000, max: 20000000 },
  { label: "Under 10M", min: 0, max: 10000000 },
];

export function Celebrities() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [filteredCelebrities, setFilteredCelebrities] = useState<Celebrity[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedFollowerRange, setSelectedFollowerRange] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCelebrities(mockCelebrities);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...celebrities];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((celebrity) =>
        celebrity.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Platform filter
    if (selectedPlatform !== "All") {
      filtered = filtered.filter(
        (celebrity) => celebrity.platform === selectedPlatform.toLowerCase(),
      );
    }

    // Follower range filter
    if (selectedFollowerRange !== "All") {
      const range = followerRanges.find(
        (r) => r.label === selectedFollowerRange,
      );
      if (range) {
        filtered = filtered.filter(
          (celebrity) =>
            celebrity.followerCount &&
            celebrity.followerCount >= range.min &&
            celebrity.followerCount <= range.max,
        );
      }
    }

    // Sort by follower count (highest first)
    filtered.sort((a, b) => (b.followerCount || 0) - (a.followerCount || 0));

    setFilteredCelebrities(filtered);
  }, [celebrities, searchQuery, selectedPlatform, selectedFollowerRange]);

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4" />
              <div className="h-4 bg-gray-800 rounded mb-2" />
              <div className="h-3 bg-gray-800 rounded w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Featured Celebrities</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover merchandise from your favorite content creators, YouTubers,
          and influencers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search celebrities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700"
            />
          </div>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          >
            {platformFilters.map((platform) => (
              <option key={platform} value={platform}>
                {platform} Platform
              </option>
            ))}
          </select>

          {/* Follower Range Filter */}
          <select
            value={selectedFollowerRange}
            onChange={(e) => setSelectedFollowerRange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          >
            {followerRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label} Followers
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Users className="h-5 w-5 text-red-400" />
          <span className="text-gray-300">
            {filteredCelebrities.length} celebrities found
          </span>
        </div>
        <div className="text-sm text-gray-400">Sorted by follower count</div>
      </div>

      {/* Celebrities Grid */}
      {filteredCelebrities.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No celebrities found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedPlatform("All");
              setSelectedFollowerRange("All");
            }}
            variant="outline"
            className="border-gray-600"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCelebrities.map((celebrity) => (
            <Link
              key={celebrity.id}
              to={`/products?celebrity=${celebrity.id}`}
              className="group bg-gray-900 border border-gray-700 rounded-lg p-6 text-center hover:border-red-500/50 transition-all hover:scale-105"
            >
              <div className="relative mb-4">
                <img
                  src={celebrity.avatar}
                  alt={celebrity.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gray-700 group-hover:border-red-500 transition-colors"
                />
                {celebrity.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors mb-2">
                {celebrity.name}
              </h3>

              <div className="flex items-center justify-center space-x-1 mb-2">
                {getPlatformIcon(celebrity.platform)}
                <span className="text-xs text-gray-400 capitalize">
                  {celebrity.platform}
                </span>
              </div>

              {celebrity.followerCount && (
                <Badge variant="outline" className="text-xs border-gray-600">
                  {formatFollowerCount(celebrity.followerCount)} followers
                </Badge>
              )}

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-red-400 text-sm">View Products →</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16 bg-gradient-to-r from-red-900/20 to-black rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          Want to see your favorite creator here?
        </h2>
        <p className="text-gray-400 mb-6">
          Suggest new celebrities and content creators for us to partner with
        </p>
        <Button className="bg-red-600 hover:bg-red-700">
          Suggest a Celebrity
        </Button>
      </div>
    </div>
  );
}
