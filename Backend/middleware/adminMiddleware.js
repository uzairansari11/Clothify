const jwt = require('jsonwebtoken');
const { AdminModel } = require('../model/admin_mode');
const { sendError } = require('../utils/response');

const adminMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return sendError(res, 'Not authorized, no token provided', 401);
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    const admin = await AdminModel.findById(decoded.adminID);
    if (!admin) {
      return sendError(res, 'Not authorized', 401);
    }
    req.admin = admin;
    next();
  } catch (error) {
    return sendError(res, 'Not authorized, invalid token', 401);
  }
};

module.exports = { adminMiddleware };
