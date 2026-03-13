import React, { useState } from 'react';
import '../styles/product.css';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../services/product';
import ProductDetailsModal from './ProductDetailsModal';
import { addItemToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {

  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const handleCart = async (item) => {
    let status = await addToCart(item, userInfo.id)
    dispatch(addItemToCart(item))
    if (status?.error) {
      return alert("item is already in cart")
    }
    alert("item added to cart")
  }
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="product-card bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden flex flex-col h-full cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
        onClick={handleCardClick}
      >
        <div className="product-image-container w-full h-56">
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="product-content p-4 flex flex-col flex-grow">
          <h3 className="product-title text-lg font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <p className="product-description text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>
          
          <div className="mt-4 space-y-3 pt-4 border-t border-gray-50 mt-auto">
            <span className="text-lg font-semibold text-gray-900 block">
              ₹{product.price.toFixed(2)}
            </span>
            <button 
              className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors" 
              type="button" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening modal
                handleCart(product);
              }} 
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        onCart = {handleCart}
      />
    </>
  );
};

export default ProductCard;
