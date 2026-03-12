import React, { use } from 'react';
import '../styles/product.css';
import {useSelector} from 'react-redux'
import { addToCart } from '../services/product';

const ProductCard = ({ product }) => {

  const {userInfo} = useSelector((state) => state.auth);

  const handleCart = async (item) => {
    let status = await addToCart(item,userInfo.id)
    if(status?.error){
      return alert("item is already in cart")
    }
    alert("item added to cart")
  }
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <button className="product-add-button" type="button" onClick={() => handleCart(product)} >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
