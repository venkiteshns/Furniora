import api from "./api.js";

export const getProducts = async () => {
    let response = await api.get('/user/products');
    return response.data
}

export const handleSell = async (data,userId) => {
    let response = await api.post('/user/add-product',{data,userId})
    console.log(response.data);
}

export const getUserProducts = async (userId) => {
    let response = await api.get(`/user/products/${userId}`)
    return response.data;
}

export const addToCart = async (item,userId) => {
    let response = await api.post(`/user/add_to_cart/${userId}`,item)
}