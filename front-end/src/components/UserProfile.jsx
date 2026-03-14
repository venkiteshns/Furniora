import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/userprofile.css";
import { logout } from "../store/authSlice";
import { handleLogoutProfile } from "../services/user";
import { getUserProducts, setProductAsSold } from "../services/product";
import EditProductModal from "./EditProductModal";
import { AlertCircle } from "lucide-react";
import { markItemAsSold, setUserProducts, clearProducts} from "../store/userProductSlice";
import { showSuccess, showConfirm } from "../utils/alertService";
import { clearCartItems } from "../store/cartSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { userProducts } = useSelector((state) => state.userProducts);

  useEffect(() => {
    if (userProducts.length > 0) {
      setStatus("success")
      return
    };
    const getProducts = async () => {
      try {
        let productList = await getUserProducts(userInfo.id);
        dispatch(setUserProducts(productList));
        setStatus("success");
      } catch (error) {
        setError(error || "Failed to fetch products");
        setStatus("failed");
      }
    };
    getProducts()
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const markAsSold = async (product) => {
    const confirmed = await showConfirm("Are you sure to mark this product as sold ?");
    if (confirmed) {
      let status = await setProductAsSold(product._id);
      dispatch(markItemAsSold(product._id));
      showSuccess("Product marked as sold");
    }
    return;
  };

  const handleLogout = async () => {
    await handleLogoutProfile();
    dispatch(clearProducts())
    dispatch(clearCartItems())
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="user-profile-container">
      {/* User Information Section */}
      <div className="user-info-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="user-avatar">{userInfo?.name?.charAt(0)}</div>
          <div className="user-details">
            <h2 className="user-name">{userInfo.name}</h2>
            <p className="user-email">{userInfo.email}</p>
          </div>
        </div>
        <button
          className="ml-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
          onClick={async () => {
            if (await showConfirm("Are you sure to logout ?")) {
              handleLogout()
            }
          }
          }
        >
          Logout
        </button>
      </div>
      Listed Products Section
      <div className="listed-products-section">
        <h3 className="section-title">Products Listed for Sale</h3>

        {status === "loading" && (
          <div className="products-grid">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="profile-product-card bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full aspect-[4/3] bg-gray-200"></div>
                {/* Content Skeleton */}
                <div className="p-5 flex flex-col gap-4">
                  {/* Title & Price Skeletons */}
                  <div className="space-y-3">
                    <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
                  </div>
                  {/* Buttons Skeletons */}
                  <div className="flex gap-3 mt-2 pt-4 border-t border-gray-50">
                    <div className="h-9 flex-1 bg-gray-200 rounded-lg"></div>
                    <div className="h-9 flex-1 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "failed" && (
          <div className="flex justify-center items-center py-16 px-4 w-full">
            <div className="max-w-md w-full bg-red-50/50 border border-red-100/80 rounded-2xl shadow-[0_2px_10px_-3px_rgba(239,68,68,0.1)] p-8 text-center">
              {/* Icon Container */}
              <div className="w-14 h-14 bg-red-100/50 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-red-50/50">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              {/* Error Typography */}
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load Products
              </h2>
              <p className="text-sm text-red-600/90 mb-8 leading-relaxed">
                {error ||
                  "We encountered an issue while retrieving your listed products. Please verify your connection and try again."}
              </p>
              {/* Retry Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleRefresh}
                  className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-sm font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50"
                >
                  Try Again
                </button>
                <NavLink to={"/"} className="w-full">
                  <button className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 text-gray-700 text-sm font-medium transition-all duration-200 shadow-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                    Back to Home
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="products-grid">
            {userProducts.length > 0 ? (
              userProducts.map((product) => (
                <div
                  key={product._id}
                  className={`profile-product-card relative ${product.isSold ? "opacity-60 grayscale" : ""}`}
                >
                  {product.isSold && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold z-10">
                      Sold
                    </span>
                  )}
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
                      ₹{product.price}
                    </p>

                    <div className="profile-product-actions">
                      <button
                        className={`action-btn ${product.isSold ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "edit-btn"}`}
                        onClick={() => {
                          if (product.isSold) return;
                          setSelectedProduct(product);
                        }}
                        disabled={product.isSold}
                      >
                        Edit
                      </button>

                      <button
                        className={`action-btn ${product.isSold ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "sold-btn"}`}
                        onClick={() => {
                          if (product.isSold) return;
                          markAsSold(product);
                        }}
                        disabled={product.isSold}
                      >
                        Mark as Sold
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-10 md:p-14 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-center">
                <div className="bg-white p-5 rounded-full shadow-sm mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-gray-400"
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
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                  No Products Listed Yet
                </h3>
                <p className="text-gray-500 mb-8 max-w-md">
                  You haven't listed any products for sale. Start by adding your
                  first item and make it available to buyers.
                </p>
                <NavLink to={"/sell"}>
                  <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300">
                    List Your First Product
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        )}
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
