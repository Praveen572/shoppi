import React, { useContext } from 'react'
import './CartItems.css'
import {ShopContext} from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeToCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Size</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr/>
          {Object.entries(cartItems).map(([key, itemData]) => {
  const [id, size] = key.split("_");
  const product = all_product.find((p) => p.id === Number(id));
  if (!product || itemData.quantity <= 0) return null;

  return (
    <div key={key}>
      <div className="cartitems-format cartitems-format-main">
        <img src={product.image} alt='' className='carticon-product-icon'/>
        <p>{product.name}</p>
        <p>${product.new_price}</p>
        <p> {itemData.size}</p>
        <button className='cartitems-quantity'>{itemData.quantity}</button>
        <p>${product.new_price * itemData.quantity}</p>
        <img
          className='cartitems-romove-icon'
          src={remove_icon}
          onClick={() => removeToCart(product.id, itemData.size)}
          alt=''
        />
      </div>
      <hr/>
    </div>
  );
})}

          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Total</h1>
              <div>
                 <div className="cartitems-total-item">
                     <p>Subtotal</p>
                     <p>${getTotalCartAmount()}</p>
                 </div>
                 <hr/>
                 <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                 </div>
                 <hr/>
                 <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount()}</h3>
                 </div>
              </div>
              <button>PROCEED TO CHECKOUT</button>
            </div>
                <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                  <input type='text' placeholder='promo code'/>
                  <button>Submit</button>
                </div>
              </div>
          </div>
    </div>
  )
}

export default CartItems