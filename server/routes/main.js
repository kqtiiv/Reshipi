const express = require("express");
const router = express.Router();
const axios = require('axios');

const edamamAPI_URL = "https://api.edamam.com/api/recipes/v2";
const edamamAppKey = process.env.EDAMAM_APP_KEY;
const edamamAppID = process.env.EDAMAM_APP_ID;

router.get("/", (req, res) => {
    const data = {
        title: "Home",
    }
    res.render("index", data);
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