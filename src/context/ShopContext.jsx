import React, { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

// 🛍️ Create Shop Context
export const ShopContext = createContext(null);

// 🔄 Initialize empty cart structure
const getDefaultCart = () => {
  return {};
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState({});

  // 🛒 Add item to cart with size
  const addToCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: prev[key]
        ? { ...prev[key], quantity: prev[key].quantity + 1 }
        : { size, quantity: 1 },
    }));
  };

  // 🛒 Remove item from cart
  const removeToCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      if (!prev[key]) return prev;

      const newQty = Math.max(prev[key].quantity - 1, 0);
      if (newQty === 0) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }

      return {
        ...prev,
        [key]: { ...prev[key], quantity: newQty },
      };
    });
  };

  // 💰 Get total cart amount
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [key, item]) => {
      const [id] = key.split("_");
      const product = all_product.find((p) => p.id === Number(id));
      return product ? total + product.new_price * item.quantity : total;
    }, 0);
  };

  // 📦 Count total cart items
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // 💖 Add item to wishlist
  const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  // 💔 Remove item from wishlist
  const removeToWishlist = (itemId) => {
    const updated = { ...wishlistItems };
    delete updated[itemId];
    setWishlistItems(updated);
  };

  // 📋 Count wishlist items
  const getTotalWishlistItems = () => {
    return Object.values(wishlistItems).filter(Boolean).length;
  };

  // 🧠 Bundle context values
  const contextValue = {
    all_product,
    cartItems,
    wishlistItems,
    addToCart,
    removeToCart,
    addToWishlist,
    removeToWishlist,
    getTotalCartAmount,
    getTotalCartItems,
    getTotalWishlistItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
