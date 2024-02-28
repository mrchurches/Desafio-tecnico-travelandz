const express = require("express");
const router = express.Router();
const headers = require("../headersHelper.js");

router.get("/", (req, res) => {
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const url= `https://api.test.hotelbeds.com/transfer-cache-api/1.0/pickups?fields=${fields}&language=${language}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => res.send(data));
});

module.exports = router;