import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/userprofile.css";
import { logout } from "../store/authSlice";
import { handleLogoutProfile } from "../services/user";
import { getUserProducts } from "../services/product";

const UserProfile = () => {
  // Dummy user data
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

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
                    <button className="action-btn edit-btn">Edit</button>
                    <button className="action-btn sold-btn">
                      Mark as Sold
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products-message">
              You have not listed any products for sale yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
