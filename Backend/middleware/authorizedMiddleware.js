const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user_model");
require("dotenv").config();
const authorizedMiddleware = async (req, res, next) => {
	var token;

	if (req.headers.authorization) {
		try {
			token = req.headers.authorization.split(" ")[1];
			var decoded = await jwt.verify(token, process.env.USER_SECRET_KEY);
			if (decoded) {

				const user = await UserModel.findById(decoded.userID);
				req.user = user;
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

module.exports = { authorizedMiddleware };
