const Product = require("../Models/product");
const { ObjectId } = require("mongodb");

exports.getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Success", products });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  // console.log(req.params.productId);

  const product = await Product.findById({
    _id: new ObjectId(req.params.productId),
  });
  res.status(200).json(product);
};

exports.postFavouriteProducts = async (req, res, next) => {
  await Product.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { favourite: !req.body.favourite } },
    { new: true }
  );

  res.status(200).json({ message: "Cart updated successfully" });
};

exports.addProduct = async (req, res, next) => {
  console.log(req.body);
  let features = req.body.features.split(".");
  let correctedFeatures = features
    .map((item) => item.trim())
    .filter((item) => item !== "");

  let product = new Product({
    title: req.body.title,
    price: req.body.price,
    desc: req.body.description,
    detail: req.body.detail,
    url: req.body.url,
    favourite: false,
    features: correctedFeatures,
  });

  await product.save();

  res.status(200).json({ message: "Product Added Successfully" });
};

exports.editProducts = async (req, res, next) => {
  await Product.findOneAndUpdate(
    { _id: new ObjectId(req.params.productId) },
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        desc: req.body.description,
        detail: req.body.detail,
        url: req.body.url,
        features: req.body.features
          .split(".")
          .map((feature) => feature.trim())
          .filter((feature) => feature !== ""),
      },
    },
    { new: true }
  );

  res.status(200).json({ message: "Product Edit Successfully" });
};

exports.deleteProduct = async (req, res, next) => {
  await Product.deleteOne({ _id: new ObjectId(req.params.productId) });
  res.status(200).json({ message: "Product deleted successfully" });
};
