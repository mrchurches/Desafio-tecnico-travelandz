const express = require("express");
const router = express.Router();
const headers = require("../headersHelper.js");

router.get("/", (req, res) => {
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const url = `https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/countries?fields=${fields}&language=${language}`;

    let options = {
        method: "GET",
        headers: headers,
    };

    console.log("Fetching countries...");
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
            res.send(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            res.status(500).send("Internal Server Error");
        });
    // res.send({ok:"ok"})
});

module.exports = router;