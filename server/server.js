const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config/config");
const app = express();

// setting Routes
const authRoutes = require("./routes/authRoutes");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database connection
mongoose
    .connect(config.dbconnection)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(config.api_version, authRoutes);

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});
