const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  _id: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
