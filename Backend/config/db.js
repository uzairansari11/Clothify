const mongoose = require("mongoose");

const connection = async () => {
	try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected TO MongoDB')
	} catch (error) {
    console.log(error)
  }
};

module.exports={connection}