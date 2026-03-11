import React, { useState } from 'react';

const Cart = () => {
  // Dummy product data as state
  const [dummyItems, setDummyItems] = useState([
    {
      id: 1,
      name: 'Modern Gray Sofa',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Oak Coffee Table',
      price: 149.50,
      image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      name: 'Ergonomic Desk Chair',
      price: 199.00,
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  const handleRemove = (id) => {
    setDummyItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = dummyItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-xl mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Shopping Cart</h2>

      {/* List of Cart Items */}
      <div className="flex flex-col space-y-6">
        {dummyItems.map((item) => (
          <div key={item.id} className="relative flex flex-col sm:flex-row items-center justify-between p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50">
            {/* Delete Icon */}
            <button 
              onClick={() => handleRemove(item.id)}
              className="absolute top-3 right-3 p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors duration-200 focus:outline-none"
              title="Remove Item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* Product Image and Name */}
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 w-full sm:w-auto mt-4 sm:mt-0 ml-0 sm:ml-8">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm mb-4 sm:mb-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-500 font-medium mt-1">₹{item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Quantity and Item Total */}
            <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0 sm:space-x-8">
              <div className="flex flex-col items-end space-y-3">
                <p className="font-bold text-xl text-gray-800 min-w-[100px] text-right">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Header and Checkout */}
      <div className="mt-10 border-t-2 border-gray-100 pt-8 flex flex-col items-end">
        <div className="flex justify-between w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mb-6 bg-gray-50 p-4 rounded-lg">
          <span className="text-xl font-bold text-gray-700">Total Price:</span>
          <span className="text-2xl font-black text-blue-600">₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
