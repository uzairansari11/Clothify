const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user_model");
require("dotenv").config();
const authorizedMiddleware = async (req, res, next) => {
	var token;

	if (req.headers.authorization) {
		try {
			token = req.headers.authorization.split(" ")[1];

			var decoded = await jwt.verify(token, process.env.SECRET_KEY);
			console.log("decode ", decoded);
			if (decoded) {
				console.log("token from middleware", token);
				const user = await UserModel.findById(decoded.userID);
				console.log("user before", user);
				console.log(req, "before");
				req.user = user;
				console.log("req after", req);
				next();
			} else {
				return res.status(401).json({ message: "Not Authorized" });
			}
		} catch (error) {
			console.log("error from middleware");
			res.status(500).json({ message: "Something Went Wrong" });
		}
	} else {
		return res
			.status(401)
			.json({ message: "Not Authorized , no token provided" });
	}
};

module.exports = { authorizedMiddleware };
