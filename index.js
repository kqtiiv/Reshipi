const express = require("express");
const expressLayout = require("express-ejs-layouts")

const app = express();
const port = 3000;

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