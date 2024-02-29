const express = require("express");
const router = express.Router();
const headers = require("../headersHelper.js");

router.get("/", (req, res) => {
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const countryCodes = req.query.countryCodes || "";
    const url= `https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/terminals?fields=${fields}&language=${language}&countryCodes=${countryCodes}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => res.send(data));
});

module.exports = router;