import React from "react";
import { NavLink } from "react-router-dom";

const CheckoutError = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 md:p-10 text-center transform transition-all border-t-4 border-red-500">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Checkout Failed
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Sorry for the inconvenience  <br/>
          Product has been sold out !!
        </p>

        <NavLink to="/">
          <button
            type="button"
            className="w-full px-8 py-3.5 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Return to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default CheckoutError;
