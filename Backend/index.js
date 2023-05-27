require("dotenv").config();
const cors = require('cors')
const express = require("express");

const { userRouter } = require("./routes/user_routes");
const { connection } = require("./config/db");
const { productRouter } = require("./routes/product_routes");
const { cartRouter } = require("./routes/cart_routes");
const { authorizedMiddleware } = require("./middleware/authorizedMiddleware");

const app = express();
app.use(cors())
app.use(express.json());

app.use("/user", userRouter);

app.use('/product',productRouter)

app.use("/cart",authorizedMiddleware,cartRouter)

app.listen(process.env.PORT, async () => {
	try {
		await connection();
	} catch (error) {
		console.log(error);
	}
	console.log(`Server is Running At ${process.env.PORT}`);
});
