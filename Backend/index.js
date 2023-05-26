require("dotenv").config();
const express = require("express");

const { userRouter } = require("./routes/user_routes");
const { connection } = require("./config/db");

const app = express();
app.use(express.json());

app.use("/", userRouter);

app.listen(process.env.PORT, async () => {
	try {
		await connection();
	} catch (error) {
		console.log(error);
	}
	console.log(`Server is Running At ${process.env.PORT}`);
});
