const adminValidate = (req, res, next) => {
  if (req.query.role === "admin") {
    next();
  } else {
    next({
      message: "invalid credential",
      status: 401,
    });
  }
};

module.exports = adminValidate;
