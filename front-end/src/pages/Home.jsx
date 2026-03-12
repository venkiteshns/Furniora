import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/dashboard.css";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../services/product";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await getProducts();
        setProducts(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-header-section">
          <h1 className="dashboard-title">Featured Collections</h1>
          <p className="dashboard-subtitle">
            Discover our premium range of modern furniture.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm my-8 text-center max-w-3xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-full shadow-sm mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.999 2.999 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.999 2.999 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">No Products Available</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md">
              There are currently no products listed in the marketplace. Be the first to add an item and start selling.
            </p>
            <NavLink to={'/sell'} >
              <button
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                List a Product
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
