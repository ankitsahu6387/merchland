import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CreditCard, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function Checkout() {
  const { items, total } = useCart();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-400 mb-8">
            You need to be logged in to proceed with checkout
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  const defaultAddress = user?.addresses?.find((addr) => addr.isDefault);
  const deliveryCharge = 99;
  const tax = Math.round(total * 0.18);
  const finalTotal = total + deliveryCharge + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Steps */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-400" />
                  <h2 className="text-lg font-semibold">Delivery Address</h2>
                </div>
                <Link to="/address">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600"
                  >
                    {defaultAddress ? "Change" : "Add Address"}
                  </Button>
                </Link>
              </div>

              {defaultAddress ? (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-2">{defaultAddress.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {defaultAddress.street}, {defaultAddress.city}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {defaultAddress.state} - {defaultAddress.pincode}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Phone: {defaultAddress.phone}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 mb-4">
                    No delivery address added
                  </p>
                  <Link to="/address">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Add Delivery Address
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-5 w-5 text-red-400" />
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="razorpay"
                      name="payment"
                      defaultChecked
                    />
                    <label htmlFor="razorpay" className="flex-1">
                      <div className="font-medium">Razorpay</div>
                      <div className="text-sm text-gray-400">
                        UPI, Cards, Wallets, NetBanking
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <input type="radio" id="cod" name="payment" />
                    <label htmlFor="cod" className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-400">
                        Pay when you receive
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="font-medium">Secure Checkout</span>
              </div>
              <p className="text-sm text-gray-400">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 h-fit">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Delivery</span>
                <span>₹{deliveryCharge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <hr className="border-gray-700" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              disabled={!defaultAddress}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700"
            >
              {defaultAddress ? "Place Order" : "Add Address First"}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
