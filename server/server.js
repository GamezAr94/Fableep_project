const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

// setting Routes
const authRoutes = require("./routes/authentication");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api_version = "/api/v1";

app.use(api_version, authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
