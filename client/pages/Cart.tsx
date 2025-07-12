import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gray-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-red-600 hover:bg-red-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      by {item.product.celebrity.name}
                    </p>
                    {(item.size || item.color) && (
                      <div className="text-gray-400 text-sm mb-2">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " • "}
                        {item.color && `Color: ${item.color}`}
                      </div>
                    )}
                    <div className="text-white font-semibold text-lg">
                      ₹{item.product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-gray-800 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white px-3 py-2 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>
              <span className="text-white">₹99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">
                ₹{Math.round(total * 0.18).toLocaleString()}
              </span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                ₹{(total + 99 + Math.round(total * 0.18)).toLocaleString()}
              </span>
            </div>
          </div>

          <Link to="/checkout">
            <Button className="w-full bg-red-600 hover:bg-red-700 mb-4">
              Proceed to Checkout
            </Button>
          </Link>

          <Link to="/products">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-800"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
