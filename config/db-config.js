const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// connection method
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`db connected at port ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = { connectDB };
