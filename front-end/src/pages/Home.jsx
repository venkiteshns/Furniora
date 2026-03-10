import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/dashboard.css';

// Hardcoded Dummy Product Data
const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: 'Wooden Lounge Chair',
    price: 249.99,
    description: 'Minimalist wooden chair with ergonomic design for utmost comfort in any reading corner.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Modern Gray Sofa',
    price: 899.00,
    description: 'Premium plush fabric sofa featuring clean lines and deep seating for modern living rooms.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Oak Dining Table',
    price: 599.50,
    description: 'Solid oak dining table seating up to 6 people. Perfect for family gatherings and dinners.',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Marble Coffee Table',
    price: 349.00,
    description: 'Elegant round coffee table with a genuine marble top and matte black metal legs.',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Minimalist Wardrobe',
    price: 749.00,
    description: 'Spacious wardrobe with sliding doors, built-in mirror, and versatile storage compartments.',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Ergonomic Office Desk',
    price: 299.99,
    description: 'Sturdy office desk with built-in cable management and a smooth wood-grain finish.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop',
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      
      <main className="dashboard-main">
        <div className="dashboard-header-section">
          <h1 className="dashboard-title">Featured Collections</h1>
          <p className="dashboard-subtitle">Discover our premium range of modern furniture.</p>
        </div>

        <div className="product-grid">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
