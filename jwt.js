var jwt = require("jsonwebtoken");
const SECRET_KEY = "BJDFBSOIJSLKNSJNFK";
const createTokens = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    SECRET_KEY,
    { expiresIn: "2h" }
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-Token"];
  if (!accessToken) {
    next({
      message: "user not authenticated",
      status: 401,
    });
  }
  try {
    const validToken = jwt.verify(accessToken, SECRET_KEY);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    next({
      message: err,
      status: 401,
    });
  }
};

module.exports = { createTokens, validateToken };
