const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/", (req, res) => {
    const data = {
        title: "Home",
    }
    res.render("index", data);
});

module.exports = router;