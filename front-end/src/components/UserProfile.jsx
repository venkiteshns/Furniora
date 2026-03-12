import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/userprofile.css";
import { logout } from "../store/authSlice";
import { handleLogoutProfile } from "../services/user";
import { getUserProducts } from "../services/product";
import EditProductModal from "./EditProductModal";

const UserProfile = () => {
  // Dummy user data
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");

    const getProducts = async () => {
      if (userData) {
        setUser(JSON.parse(userData));
      }
      let productList = await getUserProducts(JSON.parse(userData).id);
      setProducts(productList)
    };

    getProducts();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await handleLogoutProfile();
    dispatch(logout());
    navigate("/login");
  };
  
  return (
    <div className="user-profile-container">
      {/* User Information Section */}
      <div className="user-info-card">
        <div className="user-avatar">{user?.name?.charAt(0)}</div>
        <div className="user-details">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
        </div>
        <button className="logout-btn" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>

      {/* Listed Products Section */}
      <div className="listed-products-section">
        <h3 className="section-title">Products Listed for Sale</h3>

        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="profile-product-card">
                <div className="profile-product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="profile-product-image"
                  />
                </div>
                <div className="profile-product-content">
                  <h4 className="profile-product-title">{product.name}</h4>
                  <p className="profile-product-price">
                    ₹{product.price.toFixed(2)}
                  </p>

                  <div className="profile-product-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Edit
                    </button>
                    <button className="action-btn sold-btn">
                      Mark as Sold
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-10 md:p-14 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-center">
              <div className="bg-white p-5 rounded-full shadow-sm mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.999 2.999 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.999 2.999 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">No Products Listed Yet</h3>
              <p className="text-gray-500 mb-8 max-w-md">
                You haven't listed any products for sale. Start by adding your first item and make it available to buyers.
              </p>
            <NavLink to={'/sell'} >
              <button 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                List Your First Product
              </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default UserProfile;
