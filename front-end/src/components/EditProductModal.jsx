import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleEditProduct } from '../services/product';

const EditProductModal = ({ product, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      productName: product?.name || '',
      productDescription: product?.description || '',
      productPrice: product?.price || '',
      imageUrl: product?.image || '',
    }
  });

  const imageUrl = watch('imageUrl');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const onSubmit = async (data) => {
    try {
      let response = await handleEditProduct(data,product._id)
      if(response.acknowledged && response.modifiedCount === 1){
        alert("product updated successfully")
        onClose();
        return;
      }
      throw new Error("Failed to update product , Please try after sometime!!")
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              {...register('productName', {
                required: 'Product name is required',
                validate: (value) =>
                  !/^\d+$/.test(value) || "Product name cannot contain only numbers"
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g. Italian Luxury Sofa"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea
              rows="3"
              {...register('productDescription', {
                required: 'Product description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters'
                },
                validate: (value) =>
                  !/^\d+$/.test(value) || "Description cannot contain only numbers"
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Describe your product..."
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.productDescription.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
            <input
              type="number"
              {...register('productPrice', {
                required: 'Price is required',
                min: {
                  value: 1,
                  message: 'Price must be greater than 0'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g. 23000"
            />
            {errors.productPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.productPrice.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
            <input
              type="text"
              {...register('imageUrl', {
                required: 'Image URL is required',
                pattern: {
                  value: /^(https?:\/\/.+)|(data:image\/[a-zA-Z]+;base64,[^\s]+)$/i,
                  message: "Enter a valid image URL"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
            )}

            {imageUrl && (
              <div className="w-full aspect-square border rounded-lg mt-4 flex items-center justify-center overflow-hidden bg-gray-50">
                {imageError ? (
                  <span className="text-gray-500">Unable to load image preview</span>
                ) : (
                  <img
                    src={imageUrl}
                    alt="Product Preview"
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
