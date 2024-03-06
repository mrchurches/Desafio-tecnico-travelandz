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
                    return { ...obj, type: 'IATA' };
                }
                return obj;
            });
            res.send(modifiedData);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            res.status(500).send("Internal Server Error");
        });
});

module.exports = router;