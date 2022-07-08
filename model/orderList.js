const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    total_cost: {
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

const OrderList = mongoose.model("OrderList", orderSchema);

module.exports = OrderList;
