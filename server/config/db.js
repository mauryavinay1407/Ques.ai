const mongoose = require("mongoose");

// database connection 
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected...");
};

module.exports = connectDB;