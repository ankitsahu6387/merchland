import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  RotateCcw,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../context/AuthContext";
import { Order } from "@shared/types";

// Mock orders data - in real app this would come from API
const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    userId: "user-1",
    items: [
      {
        id: "item-1",
        product: {
          id: "1",
          name: "PewDiePie Official Gaming Hoodie",
          description: "Premium quality gaming hoodie from the king of YouTube",
          price: 2499,
          originalPrice: 3499,
          images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
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
          tags: ["gaming", "merch", "youtube"],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black", "Red"],
          stock: 50,
          rating: 4.8,
          reviewCount: 1234,
          featured: true,
          createdAt: new Date().toISOString(),
        },
        quantity: 1,
        size: "L",
        color: "Black",
      },
    ],
    totalAmount: 2617,
    shippingAddress: {
      id: "addr-1",
      name: "John Doe",
      street: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210",
      isDefault: true,
    },
    status: "shipped",
    paymentMethod: "Razorpay",
    paymentStatus: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "ORD-2024-002",
    userId: "user-1",
    items: [
      {
        id: "item-2",
        product: {
          id: "3",
          name: "CarryMinati Roast Mug",
          description: "Premium ceramic mug for all roasting sessions",
          price: 599,
          images: [
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
          ],
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
        quantity: 2,
      },
    ],
    totalAmount: 1305,
    shippingAddress: {
      id: "addr-1",
      name: "John Doe",
      street: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210",
      isDefault: true,
    },
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "completed",
    createdAt: "2024-01-10T14:20:00Z",
    estimatedDelivery: "2024-01-14",
  },
  {
    id: "ORD-2024-003",
    userId: "user-1",
    items: [
      {
        id: "item-3",
        product: {
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
        quantity: 1,
        size: "M",
        color: "White",
      },
    ],
    totalAmount: 1435,
    shippingAddress: {
      id: "addr-1",
      name: "John Doe",
      street: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210",
      isDefault: true,
    },
    status: "pending",
    paymentMethod: "Card",
    paymentStatus: "completed",
    createdAt: "2024-01-16T09:15:00Z",
    estimatedDelivery: "2024-01-20",
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-600",
    label: "Order Confirmed",
    description: "Your order is being prepared",
  },
  confirmed: {
    icon: Package,
    color: "bg-blue-600",
    label: "Confirmed",
    description: "Order confirmed and being packed",
  },
  shipped: {
    icon: Truck,
    color: "bg-purple-600",
    label: "Shipped",
    description: "Your order is on the way",
  },
  delivered: {
    icon: CheckCircle,
    color: "bg-green-600",
    label: "Delivered",
    description: "Order delivered successfully",
  },
  cancelled: {
    icon: XCircle,
    color: "bg-red-600",
    label: "Cancelled",
    description: "Order was cancelled",
  },
};

export function Orders() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate API call
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 500);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-400 mb-8">
            You need to be logged in to view your orders
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-800 rounded w-1/4 mb-4" />
              <div className="h-3 bg-gray-800 rounded w-1/2 mb-4" />
              <div className="h-16 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-400">
            Track and manage your orders from MerchLand
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 mb-8">
          {["all", "pending", "shipped", "delivered", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {status === "all"
                  ? "All Orders"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ),
          )}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {filter === "all" ? "No orders yet" : `No ${filter} orders`}
            </h3>
            <p className="text-gray-400 mb-6">
              {filter === "all"
                ? "Start shopping to see your orders here"
                : `You don't have any ${filter} orders`}
            </p>
            <Link to="/products">
              <Button className="bg-red-600 hover:bg-red-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div
                  key={order.id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-6"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-gray-400 text-sm">
                          Ordered on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={`${statusConfig[order.status].color} text-white`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[order.status].label}
                      </Badge>
                      <span className="text-lg font-semibold">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4 mb-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">
                            {item.product.name}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            by {item.product.celebrity.name}
                          </p>
                          {(item.size || item.color) && (
                            <p className="text-gray-400 text-sm">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && " • "}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-gray-400 text-sm">
                            ₹{item.product.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Status and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {statusConfig[order.status].description}
                      </span>
                      {order.estimatedDelivery &&
                        order.status === "shipped" && (
                          <span className="text-gray-400 text-sm">
                            • Expected by {formatDate(order.estimatedDelivery)}
                          </span>
                        )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
