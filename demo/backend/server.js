const express = require("express");
const connectDB = require("./config/db");
const colors = require('colors');
const dotenv = require("dotenv").config();

const port = process.env.port || 5000;

connectDB();

const app = express();

// create application/json parser
app.use(express.json());
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: false }));

app.get ("/", (_, res) => {
    res.send(`Demo API for Login with NEAR`)
})

app.use("/api", require("./routes/authRoutes"));

app.get("/health", (_, res) => {
    res.status(200).send('Ok');
});

app.listen(port, () => console.log(`server started on port ${port}. Current env is ${process.env.NODE_ENV}`));