import React from "react";
import { useForm } from "react-hook-form";
import {useSelector} from 'react-redux'
import { handleSell } from "../services/product";

const SellProduct = () => {
  const {userInfo} = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    let response = await handleSell(data,userInfo.id)
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-2xl mt-10 mb-10 border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          List a Product for Sale
        </h2>
        <p className="text-gray-500">
          Fill out the form below to add your item to the marketplace.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name is required",
              validate: (value) =>
                !/^\d+$/.test(value) ||
                "Product name cannot contain only numbers",
            })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Vintage Leather Sofa"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            rows="5"
            {...register("productDescription", {
              required: "Product description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
              validate: (value) =>
                !/^\d+$/.test(value) ||
                "Description cannot contain only numbers",
            })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Describe your product..."
          />
          {errors.productDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productDescription.message}
            </p>
          )}
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Price
          </label>
          <input
            type="number"
            {...register("productPrice", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter price"
          />
          {errors.productPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productPrice.message}
            </p>
          )}
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Image URL
          </label>
          <input
            type="text"
            {...register("imageUrl", {
              required: "Image URL is required",
              pattern: {
                value:
                  /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))|(data:image\/[a-zA-Z]+;base64,[^\s]+)$/i,
                message: "Enter a valid image URL or base64 image data",
              },
            })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="https://example.com/product.jpg"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-lg font-bold text-white bg-blue-600 hover:bg-blue-700"
          >
            List Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellProduct;
