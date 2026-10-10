const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const musicRouter = require("./routes/music.route");




const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    })
})

app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);





module.exports = app;