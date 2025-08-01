import React, { useContext } from "react";
import './Wishlist.css'
import { ShopContext } from "../../context/ShopContext";

const Wishlist = () => {
  const { wishlistItems, all_product, removeToWishlist } = useContext(ShopContext);

  const wishlistArray = Object.entries(wishlistItems)
    .filter(([_, value]) => value > 0)
    .map(([key]) => {
      const product = all_product.find((p) => p.id === Number(key));
      return product ? (
        <div key={product.id} className="wishlist-main">
          <img src={product.image} alt=' ' className='wishlist-product-icon'/>
          <h3>{product.name}</h3>
          <p>₹{product.new_price}</p>
          <button onClick={() => removeToWishlist(product.id)}>Remove</button>
        </div>
      ) : null;
    });

 return (
  <div>
    <h2 className="wishlist-title">My Wishlist 💖</h2>
    {wishlistArray.length > 0 ? (
      <div className="wishlist-container">
        {wishlistArray}
      </div>
    ) : (
      <p className="wishlist-empty">Your wishlist is empty.</p>
    )}
  </div>
);
};

export default Wishlist;
