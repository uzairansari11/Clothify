const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user_model');
const { sendError } = require('../utils/response');

const authorizedMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return sendError(res, 'Not authorized, no token provided', 401);
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
    const user = await UserModel.findById(decoded.userID);
    if (!user) {
      return sendError(res, 'Not authorized', 401);
    }
    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Not authorized, invalid token', 401);
  }
};

module.exports = { authorizedMiddleware };
