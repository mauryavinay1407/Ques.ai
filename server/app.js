const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const projectRouter = require("./routes/project.routes");

// database connection
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// using routes
app.use("/api/user",userRouter);
app.use("/api/project",projectRouter);

module.exports = app;