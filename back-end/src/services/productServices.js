import Product from "../models/productModel.js"

export const getProductsDetails = async () => {
    let products = await Product.find({isSold: false})
    return products;
}

export const addNewProduct = async (inputDetails) => {
    try {
        const {data,userId} = inputDetails;
        let payload = {
            userId,
            name:data.productName,
            description:data.productDescription,
            price:data.productPrice,
            image:data.imageUrl,
            isSold:false
        }
        await Product.insertOne(payload);
        return true;
    } catch (error) {
        return fasle
    }
}

export const getUserListedProducts = async (userId) => {
    let products = await Product.find({userId})
    return products
}