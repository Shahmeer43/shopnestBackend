const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

let Schema = mongoose.Schema;

let orderSchema = new Schema({
  productId: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model("Orders", orderSchema);
