require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;

const authController = require("./controller/auth.controller");
const userController = require("./controller/user.controller");
const itemController = require("./controller/item.controller");
const adminValidate = require("./middleware/admin.middleware");
const authenticate = require("./middleware/authenticate.middleware");
const { validateToken } = require("./jwt");
const cookieParser = require("cookie-parser");

require("./db/configDB");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authController);
app.use("/bakeryProduct", authenticate, adminValidate, itemController);
app.use("/user", validateToken, userController);

app.use((req, res, next) => {
  next({
    message: "not found",
    status: "404",
  });
});

app.use((err, req, res, next) => {
  res.json({
    text: "err handling middleware",
    message: err.message || err,
    status: err.status || 400,
  });
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log("succesfully connected port 4000");
  } else {
    console.log("something wrong, server down");
  }
});
