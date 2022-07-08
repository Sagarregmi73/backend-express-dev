const mongoose = require("mongoose");

const connectDB = mongoose.connect(
  "mongodb+srv://admin-sagar:admin123@cluster0.qbzg5.mongodb.net/backendDB?retryWrites=true&w=majority",
  (err) => {
    if (!err) {
      console.log("database connected successfully");
    } else {
      console.log("db not connected");
    }
  }
);

module.exports = connectDB;
