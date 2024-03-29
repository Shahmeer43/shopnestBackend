const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Util
const db = require("./Util/databaseConnection.js");
// Model
const Product = require("./Models/product.js");
//Controllers
const productController = require("./Controllers/productController");
const cartController = require("./Controllers/CartController.js");
const orderController = require("./Controllers/OrderController.js");

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

// Products

app.get("/products", productController.getAllProducts);

app.post("/favourites", productController.postFavouriteProducts);

app.get("/single-product/:productId", productController.getSingleProduct);

app.post("/form-submission", productController.addProduct);

app.post("/edit/:productId", productController.editProducts);

app.post("/delete/:productId", productController.deleteProduct);

// Carts

app.post("/product-add-to-cart", cartController.postCartProducts);

app.get("/cart-products", cartController.getCartProducts);

app.post("/delete-cart-product", cartController.deleteCartProduct);

app.post("/updateCartQuantities", cartController.updateCartQuantities);

// Orders

app.get("/orders", orderController.getAllOrders);

app.post("/product-order", orderController.postOrders);

db(() => {
  app.listen(8000);
});
