import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getCartProducts, handleCheckout, removeProduct } from '../services/product';
import { NavLink } from 'react-router-dom';

const Cart = () => {

  const [products, setProducts] = useState([])

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const listCartProducts = async () => {
      let products = await getCartProducts(userInfo.id)
      setProducts([...products])
    }

    listCartProducts();
  }, [])

  async function handleRemove(id) {
    try {
      let status = await removeProduct(id, userInfo.id)
      if (status?.acknowledged && status?.deletedCount === 1) {
        return alert("Product removed from cart")
      }
      throw new Error(status?.error)
    } catch (error) {
      return alert(error.message)
    }
  }

  const checkOut = async () => {
    let product = products.reduce((acc,item,index) => {
      acc[index] = item._id;
      return acc;
    },[])
    let payload = {
      product,
      userId:userInfo.id
    }
    console.log(payload);
    
    let response = await handleCheckout(payload)
  }

  // Calculate total price
    const totalPrice = products.reduce((total, item) => total + item.price, 0);

  return products.length > 0 ? (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-xl mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Shopping Cart</h2>

      {/* List of Cart Items */}
      <div className="flex flex-col space-y-6">
        {products.map((item) => (
          <div key={item._id} className="relative flex flex-col sm:flex-row items-center justify-between p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50">
            {/* Delete Icon */}
            <button
              onClick={() => confirm("areyousure") && handleRemove(item._id)}
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
          <span className="text-2xl font-black text-gray-900">₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
          onClick={checkOut}
        >
          Checkout Now
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-16 px-4 md:px-8 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10 mb-10">
      <div className="bg-gray-50 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Your Cart is Currently Empty</h2>
      <p className="text-gray-500 text-lg mb-8 max-w-md text-center">
        It looks like you haven't added any products to your cart yet. Browse our catalog to find items that suit your needs.
      </p>
      <NavLink to={'/'} >
        <button
          type="button"
          className="px-8 py-3 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Browse Products
        </button>
      </NavLink>
    </div>
  );
};

export default Cart;
