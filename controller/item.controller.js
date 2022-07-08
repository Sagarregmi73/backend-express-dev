const router = require("express").Router();
const bakery = require("../model/bakery");
router
  .route("/items")
  .get((req, res, next) => {
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
  })
  .post((req, res, next) => {
    const { name, quantity, cost_price, selling_price } = req.body;
    const product = new bakery({
      name,
      quantity,
      cost_price,
      selling_price,
    });
    product.save((err) => {
      if (!err) {
        res.send("items is added");
        next();
      } else {
        next({
          message: "items is not saved",
          status: "502",
        });
      }
    });
  })
  .delete((req, res, next) => {
    bakery.deleteMany(() => {
      res.send("all items is deleted");
      next();
    });
  });

//specific user id
router
  .route("/items/:id")
  .get((req, res, next) => {
    const productItem = bakery.findOne(
      { _id: req.params.id },
      (err, foundProduct) => {
        if (foundProduct) {
          res.send(foundProduct);
          next();
        } else {
          next({
            message: err,
          });
        }
      }
    );
  })

  .put((req, res, next) => {
    const updateItem = bakery.replaceOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        quantity: req.body.quantity,
        cost_price: req.body.cost_price,
        selling_price: req.body.selling_price,
      },
      { overwrite: true },
      (err) => {
        if (!err) {
          res.send("updated product item");
          next();
        }
      }
    );
  })
  .delete((req, res, next) => {
    bakery.deleteOne({ _id: req.params.id }, () => {
      res.send("specific items is deleted");
      next();
    });
  });

module.exports = router;
