const router = require("express").Router();
const bakery = require("../model/bakery");
const OrderList = require("../model/orderList");
router.get("/products", (req, res, next) => {
  const productItem = bakery.find((err, foundProducts) => {
    if (foundProducts) {
      res.send(foundProducts);
      next();
    } else {
      next({
        message: err,
      });
    }
  });
});

router.get("/products/buyItem/:id", (req, res, next) => {
  bakery.findOne({ _id: req.params.id }, (err, found) => {
    const purchase = new OrderList({
      name: found.name,
      quantity: found.quantity,
      selling_price: found.selling_price,
      total_cost: found.quantity * found.selling_price,
    });

    purchase.save((err) => {
      if (!err) {
        res.send("successfully purchased");
        next();
      }
    });
  });
});

router.get("/products/order/", (req, res, next) => {
  OrderList.find((err, foundOrder) => {
    if (foundOrder) {
      res.json({
        message: "your oders",
        order: foundOrder,
      });
      next();
    } else {
      next({
        message: err,
      });
    }
  });
});
module.exports = router;
