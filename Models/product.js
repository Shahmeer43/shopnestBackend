const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  detail: { type: String, required: true },
  url: { type: String, required: true },
  favourite: { type: Boolean, required: true, default: false },
  features: { type: [String], required: true },
});

module.exports = mongoose.model("Product", productSchema);
