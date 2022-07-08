const authenticate = (req, res, next) => {
  if (req.query.token === "random") {
    next();
  } else {
    next({
      message: "invalid credential",
      status: 401,
    });
  }
};

module.exports = authenticate;
