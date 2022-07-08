const mongoose = require("mongoose");

const bakerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    cost_price: {
      type: String,
      require: true,
    },
    selling_price: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bakery = mongoose.model("Bakery", bakerySchema);

module.exports = Bakery;
