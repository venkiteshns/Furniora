import Product from "../models/productModel.js";
import Cart from "../models/cartModels.js";

export const getProductsDetails = async () => {
  let products = await Product.find({ isSold: false });
  return products;
};

export const addNewProduct = async (inputDetails) => {
  try {
    const { data, userId } = inputDetails;
    let payload = {
      sellerId: userId,
      name: data.productName,
      description: data.productDescription,
      price: data.productPrice,
      image: data.imageUrl,
      category: data.category,
      isSold: false,
    };
    let product = await Product.insertOne(payload);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserListedProducts = async (sellerId) => {
  let products = await Product.find({ sellerId });
  return products;
};

export const addProductToCart = async (product, userId) => {
  product.productId = product._id;
  delete product._id;
  let payload = { ...product, userId };
  let insertedProduct = await Cart.insertOne(payload);
  console.log(insertedProduct);
  return insertedProduct;
};

export const getUserCart = async (userId) => {
  let products = await Cart.find({ userId, isSold: false });
  return products;
};

export const editProduct = async (productDetails) => {
  try {
    let status = await Product.updateOne(
      { _id: productDetails.productId },
      {
        $set: {
          name: productDetails.productName,
          description: productDetails.productDescription,
          image: productDetails.imageUrl,
          price: productDetails.productPrice,
        },
      },
    );
    return status;
  } catch (error) {
    throw new Error("Product update error");
  }
};

export const deleteProduct = async ({ _id, userId }) => {
  try {
    let status = await Cart.deleteOne({ _id, userId });
    return status;
  } catch (error) {
    return error.message;
  }
};

export const markProductAsSold = async (_id) => {
  let response = await Product.updateOne({ _id }, { $set: { isSold: true } });
  return response;
};

export const markCheckout = async ({ product, userId }) => {
  try {
    let res = await Promise.all(
      product.map(async (item) => {
        console.log(item);

        const productUpdate = await Product.updateOne(
          { _id: item, isSold: false },
          { $set: { boughtBy: userId, isSold: true } },
        );

        if (productUpdate.matchedCount === 0) {
          throw new Error(
            `Sorry for the inconvenience , Product has already sold !!`,
          );
        }

        const cartUpdate = await Cart.updateOne(
          { productId: item, userId, isSold: false },
          { $set: { isSold: true, boughtBy: userId } },
        );

        console.log("prod : ", cartUpdate.matchedCount);

        if (cartUpdate.matchedCount === 0) {
          console.warn(
            `Sorry for the inconvenience , Product has already sold !!`,
          );
        }

        return true;
      }),
    );

    return true;
  } catch (error) {
    console.log("errrr.............. cart check out :", error.message);
    throw error.message;
  }
};
