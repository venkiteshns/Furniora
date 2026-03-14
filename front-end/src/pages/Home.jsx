import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/dashboard.css";
import { getProducts } from "../services/product";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setProductList } from "../store/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products, status, error } = useSelector((state) => state.product);

  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;

    const priceMatch =
      !priceFilter || product.price <= Number(priceFilter);

    return categoryMatch && priceMatch;
  });

  useEffect(() => {

    dispatch(setLoading());

    const fetchProducts = async () => {
      try {
        let response = await getProducts();
        dispatch(setProductList(response));
      } catch (error) {
        dispatch(setError(error || "Failed to fetch products"));
      }
    };

    setTimeout(() => {
      fetchProducts();
    }, 300);

  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="dashboard-container">
        <main className="dashboard-main">
          <div className="dashboard-header-section animate-pulse">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mb-2"></div>
            <div className="h-5 w-96 bg-gray-100 rounded-md"></div>
          </div>

          <div className="product-grid">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden flex flex-col h-full animate-pulse"
              >
                {/* Image Placeholder */}
                <div className="w-full h-56 bg-gray-200"></div>

                {/* Content Placeholder */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Title */}
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  {/* Description Lines */}
                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                  </div>

                  {/* Price & Button Section */}
                  <div className="mt-auto pt-4 border-t border-gray-50 space-y-3">
                    <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="dashboard-container">
        <main className="dashboard-main flex items-center justify-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg w-full text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-3">Unable to Load Products</h2>
            <p className="text-red-700 mb-8 leading-relaxed">
              We encountered a technical issue while fetching the furniture collection.
              {error ? ` Details: ${error}` : " Please check your internet connection and try again."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                Retry Loading
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="dashboard-header-section" style={{ marginBottom: 0 }}>
            <h1 className="dashboard-title">Featured Collections</h1>
            <p className="dashboard-subtitle">
              Discover our premium range of modern furniture.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 outline-none text-gray-700 bg-white"
            >
              <option value="All Categories">All Categories</option>
              <option value="Sofas & Couches">Sofas & Couches</option>
              <option value="Beds & Mattresses">Beds & Mattresses</option>
              <option value="Tables">Tables</option>
              <option value="Chairs">Chairs</option>
              <option value="Dining Sets">Dining Sets</option>
              <option value="Wardrobes & Cabinets">Wardrobes & Cabinets</option>
              <option value="TV Units & Entertainment Centers">TV Units & Entertainment Centers</option>
              <option value="Desks & Office Furniture">Desks & Office Furniture</option>
              <option value="Shelves & Bookcases">Shelves & Bookcases</option>
              <option value="Outdoor & Garden Furniture">Outdoor & Garden Furniture</option>
            </select>
            
            <input
              type="number"
              placeholder="Max price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 outline-none w-32 text-gray-700 bg-white"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm my-8 text-center max-w-3xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-full shadow-sm mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.999 2.999 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.999 2.999 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              No Products Available
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md">
              There are currently no products listed in the marketplace. Be the
              first to add an item and start selling.
            </p>
            <NavLink to={"/sell"}>
              <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300">
                List a Product
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
