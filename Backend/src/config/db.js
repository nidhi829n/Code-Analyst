const mongoose = require('mongoose');

const connectDB = async () => {
       try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("Database connected successfully");
       }
       catch{
            console.log("Database connection failed");
       }
}

module.exports = connectDB;