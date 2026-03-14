import React from "react";

const CheckoutConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  itemCount,
  totalPrice,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-4">
          Confirm Checkout
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-6 leading-relaxed">
            You are about to purchase all items currently in your cart. This
            action cannot be undone because products will be marked as sold.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Items:</span>
              <span className="font-semibold text-gray-800">{itemCount}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Total Price:</span>
              <span className="font-bold text-lg text-gray-900">
                ₹{totalPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing your order...
              </>
            ) : (
              "Confirm Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmModal;
