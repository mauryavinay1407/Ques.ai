const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// configuration setup for cloudinary to upload profile picture

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {cloudinary};