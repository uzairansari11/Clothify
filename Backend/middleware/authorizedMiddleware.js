const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user_model");
require("dotenv").config();

// Middleware to verify and authenticate user
const authorizedMiddleware = async (req, res, next) => {
	var token;

	// Check if Authorization header is present
	if (req.headers.authorization) {
		try {
			// Extract token from Authorization header
			token = req.headers.authorization.split(" ")[1];
			// Verify and decode the token using the user secret key
			var decoded = await jwt.verify(token, process.env.USER_SECRET_KEY);
			if (decoded) {
				// Find the user based on the decoded user ID
				const user = await UserModel.findById(decoded.userID);
				// Attach the user object to the request for further use
				req.user = user;
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

module.exports = { authorizedMiddleware };
