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

    const url= `https://api.test.hotelbeds.com/transfer-cache-api/1.0/hotels?fields=${fields}&language=${language}&countryCodes=${countryCodes}&destinationCodes=${destinationCodes}&codes=${codes}&giataCodes=${giataCodes}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    if(countryCodes !== ""){
        // https://api.test.hotelbeds.com/transfer-cache-api/1.0/hotels?fields=&language=en&countryCodes=AR
        // https://api.test.hotelbeds.com/transfer-cache-api/1.0/hotels?fields=&language=en&limit=1&countryCodes=AR&destinationCodes=&codes=&giataCodes=
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    throw new Error("Empty response received");
                }
                const modifiedData = data.map(obj => {
                    if (!obj.hasOwnProperty('type')) {
                        return { ...obj, type: 'ATLAS' };
                    }
                    return obj;
                });
                res.send(modifiedData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                res.status(500).send("Internal Server Error");
            });
    }
});

module.exports = router;