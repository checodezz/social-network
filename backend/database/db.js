const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        if (connect) {
            console.log("Connected successfully.");
        }
    } catch (error) {
        console.log("Database connection error:", error);
    }
};

module.exports = connectDB;
