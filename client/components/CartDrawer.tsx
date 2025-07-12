import React from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const {
    items,
    total,
    itemCount,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative ml-auto bg-gray-900 border-l border-gray-700 w-full max-w-md h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="text-gray-400 mb-4">Your cart is empty</div>
              <Button
                onClick={closeCart}
                className="bg-red-600 hover:bg-red-700"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      by {item.product.celebrity.name}
                    </p>
                    {(item.size || item.color) && (
                      <p className="text-gray-400 text-xs">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ", "}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                    <p className="text-white font-semibold">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-white text-sm w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-400 hover:text-red-300 self-center"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold text-white">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className="space-y-2">
              <Link to="/cart" onClick={closeCart}>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                >
                  View Cart
                </Button>
              </Link>
              <Link to="/checkout" onClick={closeCart}>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
