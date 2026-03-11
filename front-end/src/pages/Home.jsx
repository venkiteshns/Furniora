import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/dashboard.css";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../services/product";

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

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
