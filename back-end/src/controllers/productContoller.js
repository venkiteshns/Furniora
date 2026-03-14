import {
  addNewProduct,
  addProductToCart,
  deleteProduct,
  editProduct,
  getProductsDetails,
  getUserCart,
  getUserListedProducts,
  markCheckout,
  markProductAsSold,
} from "../services/productServices.js";

const getProducts = async (req, res) => {
  let products = await getProductsDetails();
  res.send(products);
};

const getUserProducts = async (req, res) => {
  let products = await getUserListedProducts(req.params.id);
  res.send(products);
};

const addProduct = async (req, res) => {
  try {
    let response = await addNewProduct(req.body);
    res.send(response);
  } catch (error) {
    res.json({ error });
  }
};

const addToCart = async (req, res) => {
  try {
    let cartProduct = await addProductToCart(req.body, req.params.id);
    res.send(cartProduct);
  } catch (error) {
    console.log("cart add error : ", error.message);
    res.json({ error: error.message });
  }
};

const getCartProducts = async (req, res) => {
  try {
    let products = await getUserCart(req.params.id);
    res.send(products);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const handleEditProduct = async (req, res) => {
  try {
    let product = await editProduct(req.body);
    console.log(product);
    res.json({ ...product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    let response = await deleteProduct(req.body);
    if(response?.acknowledged && response?.deletedCount === 1){
        return res.send(response)
    }
    throw new Error("Selected product is not in the cart !! Please refresh the page")
  } catch (error) {
    res.json({error:error?.message || "unexpected error occoured, Please try after sometime!!"})
  }
};

const handleSoldProduct = async (req,res) => {
  let response = await markProductAsSold(req.params.id)
  res.send(response)
}

const handleCheckout = async (req,res) => {
  try {
    
    let response = await markCheckout(req.body)
    res.json({
      status:"success"
    })
  } catch (error) {
    res.json({
      status:"failed"
    })
  }
}

export {
  getProducts,
  addProduct,
  getUserProducts,
  addToCart,
  getCartProducts,
  handleEditProduct,
  handleDeleteProduct,
  handleSoldProduct,
  handleCheckout
};
