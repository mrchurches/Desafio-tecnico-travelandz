const express = require("express");
const router = express.Router();
const headers = require("../headersHelper.js");

router.get("/", (req, res) => {
    //we can use to filter the response:
    //offset: Number of records to skip
    //limit: Number of records to return
    //countryCodes
    //destinationCodes
    //codes: specific hotel codes
    //giata codes: giata hotel codes
    const limit = req.query.limit || 1;
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const countryCodes = req.query.countryCodes || "";
    const destinationCodes = req.query.destinationCodes || "";
    const codes = req.query.codes || "";
    const giataCodes = req.query.giataCodes || "";

    const url= `https://api.test.hotelbeds.com/transfer-cache-api/1.0/hotels?fields=${fields}&language=${language}&limit=${limit}countryCodes=${countryCodes}&destinationCodes=${destinationCodes}&codes=${codes}&giataCodes=${giataCodes}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => res.send(data));
});

module.exports = router;