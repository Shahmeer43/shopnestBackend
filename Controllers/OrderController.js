const Order = require("../Models/order.js");
const Cart = require("../Models/cart.js");
const Product = require("../Models/product.js");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

exports.postOrders = async (req, res, next) => {
  //   console.log(req.body);

  const cartProducts = await Cart.find();
  if (!cartProducts) {
    return;
  }
  for (let item of cartProducts) {
    let order = new Order({
      productId: item._id,
      qty: item.qty,
      price: item.price,
      title: item.title,
    });

    await order.save();
  }

  //   const cartProducts = await Cart.find();

  //   await Order.insertMany(cartProducts);
  //   for (let product of cartProducts) {
  //     let orders = new Order({
  //       _id: product._id,
  //       qty: product.qty,
  //       price: product.price,
  //       title: product.title,
  //     });

  //   }

  //   const cartProduct = await Cart.findOne({ _id: new ObjectId(req.body.id) });
  //   const product = await Product.findOne({ _id: new ObjectId(req.body.id) });

  //   console.log(product);
  //   let orders = new Order({
  //     _id: new ObjectId(req.body.id),
  //     qty: cartProduct !== null ? cartProduct.qty : 1,
  //     price: product.price,
  //     title: product.title,
  //   });

  //   await orders.save();
};

exports.getAllOrders = async (req, res, next) => {
  const allOrders = await Order.find();
  res.status(200).json(allOrders);
};
