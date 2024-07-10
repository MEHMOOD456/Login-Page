const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRouter");
const port = process.env.port || 8080;

const app = express();

// db con

mongoose
  .connect(
    "mongodb+srv://masoo0d456789ali:D5BWSUlDGLpEr19f@nodejs.1fgyi2c.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDb Connected Successfully"))
  .catch((err) =>
    console.error("Error occurred during MongoDB connection", err)
  );
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", homeRouter);

app.listen(port);
