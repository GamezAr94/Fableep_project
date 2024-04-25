const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const config = require("./config/config");
const app = express();

// setting Routes
const authRoutes = require("./routes/authRoutes");

// enabling CORS for specific origins only
let corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// database connection
mongoose
    .connect(config.dbconnection)
    .then((result) => app.listen(config.port))
    .catch((err) => console.log(err));

// routes
app.use(config.api_version, authRoutes);
