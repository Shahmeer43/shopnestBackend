const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/shopnest";

const db = (cb) => {
  return mongoose
    .connect(connectionString)
    .then((res) => {
      console.log("Connected to Database Successfully");
      cb(res);
    })
    .catch((err) => {
      console.log("Not Conneceted there is an error", err);
    });
};

module.exports = db;
