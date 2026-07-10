const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");
const reviewRoutes = require("./routes/review.route");
const authRoutes = require("./routes/auth.route");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/ai", aiRoutes);
app.use("/reviews", reviewRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;