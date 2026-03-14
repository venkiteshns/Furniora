import api from "./api.js";

export const getProducts = async () => {
  try {
    let response = await api.get("/user/products");
    return response.data;
  } catch (error) {
    throw ("Failed to fetch products, please try after sometime !!")
  }
};

export const handleSell = async (data, userId) => {
  let response = await api.post("/user/add_product", { data, userId });
  console.log(response.data);
};

export const getUserProducts = async (userId) => {
    try {
        let response = await api.get(`/user/products/${userId}`);        
        return response.data;
    } catch (error) {
        throw ("Failed to fetch products, please try after sometime !!")
    }
};

export const addToCart = async (item, userId) => {
  let response = await api.post(`/user/add_to_cart/${userId}`, item);
  return response.data;
};

export const getCartProducts = async (userId) => {
  let response = await api.get(`/user/cart_products/${userId}`);
  return response.data;
};

export const handleEditProduct = async (data, productId) => {
  let payload = { ...data, productId };
  let response = await api.post("/user/edit_product", payload);
  return response.data;
};

export const removeProduct = async (productId, userId) => {
  let response = await api.post("/user/delete_product", {
    _id: productId,
    userId,
  });
  return response.data;
};


export const setProductAsSold = async (id) => {
  let response = await api.get(`/user/sold/${id}`);
  return response.data;
};

export const handleCheckout = async (payload) => {
  let response = await api.post("/user/checkout", payload);
  return response.data.status === 'success' ? "success" :'failed';
};
