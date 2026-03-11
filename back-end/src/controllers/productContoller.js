import { addNewProduct, getProductsDetails, getUserListedProducts } from "../services/productServices.js";

const getProducts = async (req,res) => {
    let products = await getProductsDetails();
    res.send(products)
}

const getUserProducts = async (req,res) => {
    let products = await getUserListedProducts(req.params.id)
    res.send(products)
    
}

const addProduct  =async (req,res) => {
    let response = await addNewProduct(req.body)
    res.send(response)
}

const addToCart = async (req,res) => {
    console.log(req.body,"user : ",req.params.id);
    
}

export {
    getProducts,
    addProduct,
    getUserProducts,
    addToCart
}