const jwt = require("jsonwebtoken");
const {User, Token} = require("../models/index");

authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }
  
  const isTokenFound = await Token.findOne({where:{token}});
  if (!isTokenFound) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.sendStatus(401); // Unauthorized
    }

    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403); // Forbidden
  }
}

module.exports = {authenticateToken}