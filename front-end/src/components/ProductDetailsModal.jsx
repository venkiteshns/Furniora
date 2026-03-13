import React from 'react';

const ProductDetailsModal = ({ product, isOpen, onClose, onCart}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 p-4">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-xl w-full relative z-10 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="w-full mb-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-80 object-cover rounded-lg bg-gray-100"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
          
          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
              {product.description}
            </p>
          </div>

          {/* Footer Action Area */}
          <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium">Price</span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
            
            <button 
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 flex-shrink-0"
              onClick={() => { onCart(product) }}
              
              id="modal-add-to-cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
