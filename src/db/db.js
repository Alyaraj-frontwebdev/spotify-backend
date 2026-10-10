const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully!")
    } catch (error) {
        console.error("Database not connected! Error: ", error);

    }
}

module.exports = connectDB;