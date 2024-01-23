const express = require("express");
const router = express.Router();
const axios = require('axios');

const options = {
    method: 'POST',
    url: 'https://zestful.p.rapidapi.com/parseIngredients',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '6fda833675mshfaca7ba105d3a3cp13d275jsnd9f1899318c3',
      'X-RapidAPI-Host': 'zestful.p.rapidapi.com'
    },
    data: {
      ingredients: [
        '2 1/2 tablespoons finely chopped parsley',
        '3 tablespoons extra-virgin olive oil, or more to taste',
        '1 1/2 tbsp cinnamon'
      ]
    }
  };

router.get("/", (req, res) => {
    const data = {
        title: "Home",
    }
    res.render("index", data);
});

module.exports = router;