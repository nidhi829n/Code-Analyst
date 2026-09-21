require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 10000;

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "Code Analyst API",
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on 0.0.0.0:${PORT}`);
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });