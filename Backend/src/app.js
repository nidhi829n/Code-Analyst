const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const aiRoutes = require("./routes/ai.routes");
const reviewRoutes = require("./routes/review.route");
const authRoutes = require("./routes/auth.route");
const chatRoutes = require("./routes/chat.routes");

const errorHandler = require("./middleware/error.middleware");
const morgan = require("morgan");
const logger = require("./config/logger");
const helmet = require("helmet");


const app = express();
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);

app.use(errorHandler);

module.exports = app;