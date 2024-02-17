const express = require("express");
const router = express.Router();
const axios = require('axios');
const pg = require("pg");

const edamamAPI_URL = "https://api.edamam.com/api/recipes/v2";
const edamamAppKey = process.env.EDAMAM_APP_KEY;
const edamamAppID = process.env.EDAMAM_APP_ID;
const config = {
  params: {
    type: "public",
    app_id: edamamAppID,
    app_key: edamamAppKey
  }
}

const pgPassword = process.env.PG_PASSWORD;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "reshipi",
  password: pgPassword,
  port: 5432,
});

db.connect();

let currentId = "";
let currentTitle = "";
let currentType = "";
let currentImage = "";

router.get("/", (req, res) => {
    const data = {
        title: "Home",
    }
    currentId = "";
    currentTitle = "";
    currentType = "";
    currentImage = "";
    res.render("index", data);
});

router.post("/search", async (req, res) => {
  try {
      const title = "Search";

      currentId = "";
      currentTitle = "";
      currentType = "";
      currentImage = "";

      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

      const response = await axios.get(edamamAPI_URL + "?q=" + searchNoSpecialChar, config);
      const data = response.data.hits;

      res.render("search", {
          data,
          title,
          searchNoSpecialChar
      });
  } catch (error) {
      console.log(error);
      res.render("search", { content: JSON.stringify(error.response.status), title: "Error"});
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
      currentId = req.params.id; // grab the id
      const response = await axios.get(edamamAPI_URL + "/" + currentId, config);
      const data = response.data.recipe;
      currentImage = data.image;
      currentTitle = data.label;
      currentType = data.cuisineType[0].replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      
      res.render("recipe", {
        title: currentTitle, data: data, type: currentType, image: currentImage
      });
  } catch (error) {
      console.log(error);
  }
});

router.get("/explore", async (req, res) => {
  currentId = "";
  currentTitle = "";
  currentType = "";

  const result = await db.query("SELECT * FROM recipes");
  const recipes = result.rows;

  const data = {
    title: "Explore",
    recipes: recipes
  }
  res.render("explore", data);
});

router.get("/about", (req, res) => {
  const data = {
    title: "About",
  }
  res.render("about", data);
});

router.get("/contact", (req, res) => {
  const data = {
    title: "Contact",
  }
  res.render("contact", data);
});

router.post("/save", async (req, res) => {
  try {
    await db.query(
      "INSERT INTO recipes VALUES ($1, $2, $3, $4)", 
      [currentTitle, currentType, currentId, currentImage]
    );
    res.redirect("/explore");
  } catch (err) {
    res.redirect("/explore");
  }
});

module.exports = router;