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

const corsOptions = {
  origin: ["https://ques-ai-r23g.onrender.com", "http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// using routes
app.use("/api/user",userRouter);
app.use("/api/project",projectRouter);

module.exports = app;