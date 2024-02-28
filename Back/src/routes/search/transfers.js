const express = require("express");
const router = express.Router();
const headers = require("../headersHelper.js");
const urlBase= `https://api.test.hotelbeds.com/transfer-cache-api/1.0/masters/`;

router.get("/", (req, res) => {
    // const fields = req.query.fields || "";
    // const language = req.query.language || "en";
    // const url= `https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/countries?fields=${fields}&language=${language}`;
    // let options = {
    //     method: "GET",
    //     headers: headers,
    // };
    // fetch(url, options)
    //     .then((response) => response.json())
    //     .then((data) => res.send(data));
});

router.get('/categories', (req, res) => {
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const url = `${urlBase}categories?fields=${fields}&language=${language}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => res.send(data));
});

router.get('/types', (req, res) => {
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const url = `${urlBase}transferTypes?fields=${fields}&language=${language}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => res.send(data));
});

router.get('/vehicles', (req, res) => {
    const fields = req.query.fields || "";
    const language = req.query.language || "en";
    const url = `${urlBase}vehicles?fields=${fields}&language=${language}`;
    let options = {
        method: "GET",
        headers: headers,
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => res.send(data));
});

module.exports = router;