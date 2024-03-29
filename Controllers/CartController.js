const Cart = require("../Models/cart.js");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

exports.postCartProducts = async (req, res, next) => {
  let findDuplicate = await Cart.findOne({ _id: new ObjectId(req.body.id) });

  // console.log(req.body.price);

  if (!findDuplicate) {
    const AddToCart = new Cart({
      _id: new ObjectId(req.body.id),
      qty: 1,
      price: req.body.price,
      title: req.body.title,
      url: req.body.url,
    });

    await AddToCart.save()
      .then((res) => {
        console.log("product added");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await Cart.findOneAndUpdate(
      { _id: new ObjectId(findDuplicate.id) },
      {
        $inc: { qty: 1 },
        price: (findDuplicate.price + req.body.price).toFixed(2),
      },
      { new: true }
    );
  }

  res.status(200).json({ message: "Cart Updated" });
};

exports.getCartProducts = async (req, res, next) => {
  let cartProducts = await Cart.find();
  res.json(cartProducts);
};

exports.deleteCartProduct = async (req, res, next) => {
  console.log(req.body);
  await Cart.deleteOne({ _id: new ObjectId(req.body.productId) })
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });

  res.status(200).json({ message: "Cart product deleted successfully" });
};

exports.updateCartQuantities = async (req, res, next) => {
  console.log(req.body);
  for (const cartItem of req.body) {
    await Cart.findOneAndUpdate(
      { _id: new ObjectId(cartItem.itemId) },
      { $set: { qty: cartItem.quantity, price: cartItem.price } },
      { new: true }
    );
  }
  res.status(200).json({ message: "Cart updated successfully" });
};
