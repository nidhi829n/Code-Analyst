const express = require('express');
const aiRoutes = require("./routes/ai.routes");
const reviewRoutes = require("./routes/review.route");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("hello world");
})

app.use("/ai", aiRoutes);
app.use("/reviews", reviewRoutes);
app.use("/auth", authRoutes);

module.exports = app