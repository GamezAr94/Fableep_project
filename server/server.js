const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.json({ message: "hello world!" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
