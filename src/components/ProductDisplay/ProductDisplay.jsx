import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import fav_red from '../Assets/fav_red.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, addToWishlist } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeWarning, setSizeWarning] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    if (sizeWarning) {
      const timer = setTimeout(() => setSizeWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sizeWarning]);

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={`${product.name} preview 1`} />
          <img src={product.image} alt={`${product.name} preview 2`} />
          <img src={product.image} alt={`${product.name} preview 3`} />
          <img src={product.image} alt={`${product.name} preview 4`} />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={`${product.name} main`} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt='star' />
          <img src={star_icon} alt='star' />
          <img src={star_icon} alt='star' />
          <img src={star_icon} alt='star' />
          <img src={star_dull_icon} alt='star dull' />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="productdisplay-right-discription">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a
          round neckline and short sleeves, worn as an undershirt and outer garment.
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {sizes.map(size => (
              <div
                key={size}
                className={selectedSize === size ? 'size selected' : 'size'}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
          {sizeWarning && (
            <p className="size-warning">⚠️ Please select a size before adding to cart.</p>
          )}
        </div>

        <div className='cart_fav'>
          <button className='cart-btn'
            onClick={() => {
              if (selectedSize) {
                addToCart(product.id, selectedSize);
                setSizeWarning(false);
              } else {
                setSizeWarning(true);
              }
            }}
          >
            ADD TO CART
          </button>

          <button className='wishlist-btn' onClick={() => addToWishlist(product.id)}>
            <img className='fav_red' src={fav_red} alt='Add to wishlist' />
          </button>
        </div>

        <p className='productdisplay-right-category'><span>Category : </span>Women , T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags : </span>Modern , Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
