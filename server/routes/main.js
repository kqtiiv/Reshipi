const express = require("express");
const router = express.Router();
const axios = require('axios');

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

router.get("/", (req, res) => {
    const data = {
        title: "Home",
    }
    res.render("index", data);
});

router.post("/search", async (req, res) => {
  try {
      const title = "Search";

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
      let slug = req.params.id; // grab the id
      const response = await axios.get(edamamAPI_URL + "/" + slug, config);
      const data = response.data.recipe;
      const title = data.label;
      const type = data.cuisineType[0].replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      res.render("recipe", {title, data, type});
  } catch (error) {
      console.log(error);
  }
});

router.get("/explore", (req, res) => {
  const data = {
    title: "Explore",
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

module.exports = router;