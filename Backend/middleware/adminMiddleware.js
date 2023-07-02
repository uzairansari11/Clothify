const jwt = require("jsonwebtoken");
const { AdminModel } = require('../model/admin_mode');
require("dotenv").config();

// Middleware to verify and authenticate admin
const adminMiddleware = async (req, res, next) => {
    var token;

    // Check if Authorization header is present
    if (req.headers.authorization) {
        try {
            // Extract token from Authorization header
            token = req.headers.authorization.split(" ")[1];
            // Verify and decode the token using the admin secret key
            var decoded = await jwt.verify(token, process.env.ADMIN_SECRET_KEY);
            if (decoded) {
                // Find the admin based on the decoded admin ID
                const admin = await AdminModel.findById(decoded.adminID);
                // Attach the admin object to the request for further use
                req.admin = admin;
                next(); // Proceed to the next middleware or route handler
            } else {
                // Token verification failed
                return res.status(401).json({ message: "Not Authorized" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        // Authorization header is missing
        return res.status(401).json({ message: "Not Authorized, no token provided" });
    }
};

module.exports = { adminMiddleware };
