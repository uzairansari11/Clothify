const jwt = require("jsonwebtoken");
const { AdminModel } = require('../model/admin_mode');
require("dotenv").config();
const adminMiddleware = async (req, res, next) => {
    var token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization.split(" ")[1];
            var decoded = await jwt.verify(token, process.env.ADMIN_SECRET_KEY);
            if (decoded) {
                const admin = await AdminModel.findById(decoded.adminID);
                req.admin = admin;
                next();
            } else {
                return res.status(401).json({ message: "Not Authorized" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        return res
            .status(401)
            .json({ message: "Not Authorized , no token provided" });
    }
};

module.exports = { adminMiddleware };
