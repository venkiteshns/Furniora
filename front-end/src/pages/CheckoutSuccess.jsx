import React from "react";
import { NavLink } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 md:p-10 text-center transform transition-all">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Checkout Successful
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Your purchase has been completed successfully. The products have been marked as sold.
        </p>

        <NavLink to="/">
          <button
            type="button"
            className="w-full px-8 py-3.5 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Back to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
