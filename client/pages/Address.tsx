import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MapPin, Phone, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Address } from "@shared/types";
import { useAuth } from "../context/AuthContext";

export function AddressPage() {
  const { user, updateUser } = useAuth();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });

  const addresses: Address[] = user?.addresses || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAddress: Address = {
      id: editingAddress?.id || `addr-${Date.now()}`,
      ...formData,
    };

    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id ? newAddress : addr,
      );
      updateUser({ addresses: updatedAddresses });
    } else {
      // Add new address
      const updatedAddresses = [...addresses, newAddress];

      // If this is the first address or marked as default, make it default
      if (formData.isDefault || addresses.length === 0) {
        updatedAddresses.forEach((addr, index) => {
          addr.isDefault = addr.id === newAddress.id;
        });
      }

      updateUser({ addresses: updatedAddresses });
    }

    // Reset form
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: false,
    });
    setIsAddingAddress(false);
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setEditingAddress(address);
    setIsAddingAddress(true);
  };

  const handleDelete = (addressId: string) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
    updateUser({ addresses: updatedAddresses });
  };

  const setAsDefault = (addressId: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    updateUser({ addresses: updatedAddresses });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Delivery Addresses</h1>
            <p className="text-gray-400">
              Manage your delivery addresses for faster checkout
            </p>
          </div>
          <Button
            onClick={() => {
              setIsAddingAddress(true);
              setEditingAddress(null);
              setFormData({
                name: "",
                street: "",
                city: "",
                state: "",
                pincode: "",
                phone: "",
                isDefault: false,
              });
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>

        {/* Add/Edit Address Form */}
        {isAddingAddress && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-600"
                  placeholder="House no, Building name, Street name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isDefault: !!checked }))
                  }
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingAddress ? "Update Address" : "Save Address"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingAddress(false);
                    setEditingAddress(null);
                  }}
                  className="border-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        <div className="grid gap-4">
          {addresses.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-700">
              <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No addresses added</h3>
              <p className="text-gray-400 mb-6">
                Add your first delivery address to get started
              </p>
              <Button
                onClick={() => setIsAddingAddress(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                Add Address
              </Button>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 relative"
              >
                {address.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{address.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{address.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{address.pincode}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">
                  {address.street}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(address)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  {!address.isDefault && (
                    <Button
                      onClick={() => setAsDefault(address.id)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600"
                    >
                      Set as Default
                    </Button>
                  )}

                  <Button
                    onClick={() => handleDelete(address.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Checkout */}
        <div className="mt-8 flex justify-between">
          <Link to="/checkout">
            <Button variant="outline" className="border-gray-600">
              Back to Checkout
            </Button>
          </Link>

          {addresses.length > 0 && (
            <Link to="/checkout">
              <Button className="bg-red-600 hover:bg-red-700">
                Continue with Selected Address
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
