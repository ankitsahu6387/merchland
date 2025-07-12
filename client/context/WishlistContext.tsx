import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { WishlistItem, Product } from "@shared/types";

interface WishlistState {
  items: WishlistItem[];
  count: number;
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" };

const initialState: WishlistState = {
  items: [],
  count: 0,
};

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction,
): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return state; // Item already in wishlist
      }

      const newItem: WishlistItem = {
        id: `wishlist-${product.id}`,
        product,
        addedAt: new Date().toISOString(),
      };

      const newItems = [...state.items, newItem];
      return { items: newItems, count: newItems.length };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
      return { items: newItems, count: newItems.length };
    }

    case "CLEAR_WISHLIST":
      return { items: [], count: 0 };

    default:
      return state;
  }
}

interface WishlistContextType extends WishlistState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  const isInWishlist = (productId: string) => {
    return state.items.some((item) => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
