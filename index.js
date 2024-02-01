require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts")
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// templating engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// static file

app.use(express.static("public"));

// render webpages

app.use("/", require("./server/routes/main"));



app.listen(port, () => {
    console.log("Listening in port " + port);
});