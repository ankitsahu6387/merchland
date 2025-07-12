import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Settings,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export function Profile() {
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-400 mb-8">
            You need to be logged in to view your profile
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
  };

  const defaultAddress = user.addresses?.find((addr) => addr.isDefault);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSubmit}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="border-gray-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{user.email}</p>
                      <p className="text-gray-400 text-sm">Email Address</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Default Address */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Default Address</h2>
                <Link to="/address">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </Link>
              </div>

              {defaultAddress ? (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">
                      {defaultAddress.name}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {defaultAddress.street}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {defaultAddress.city}, {defaultAddress.state} -{" "}
                      {defaultAddress.pincode}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      <Phone className="h-3 w-3 inline mr-1" />
                      {defaultAddress.phone}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <MapPin className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400 mb-4">No default address set</p>
                  <Link to="/address">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Add Address
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Account Actions</h2>
              <div className="space-y-3">
                <Button
                  onClick={logout}
                  variant="outline"
                  className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <Link
                  to="/orders"
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-red-400" />
                    <span>Orders</span>
                  </div>
                  <span className="text-gray-400">3</span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-400" />
                    <span>Wishlist</span>
                  </div>
                  <span className="text-gray-400">{wishlistCount}</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-red-400" />
                    <span>Cart Items</span>
                  </div>
                  <span className="text-gray-400">{itemCount}</span>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/address">
                  <Button variant="outline" className="w-full border-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    Manage Addresses
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="outline" className="w-full border-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    Order History
                  </Button>
                </Link>
                <Link to="/wishlist">
                  <Button variant="outline" className="w-full border-gray-600">
                    <Heart className="h-4 w-4 mr-2" />
                    My Wishlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
