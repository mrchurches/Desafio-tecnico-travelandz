// const dotenv = require("dotenv");
// dotenv.config();
const express = require("express");
const router = express.Router();
const search = require("./search/index.js");
const auth = require("./auth/index.js");
const booking = require("./booking/index.js");
const headers = require("./headersHelper.js");

router.get("/", (req, res) => {
  res.send("Hello Travelandz!");
});

router.get("/test", (req, res) => {
  let url="https://api.test.hotelbeds.com/transfer-api/1.0/availability/en/from/ATLAS/265/to/IATA/PMI/2024-03-02T12:15:00/2/0/0";
  let options = {
    method: "GET",
    headers: headers,
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => res.send(data));
});

//i need to be able to search for transfers for ubication,date and type of vehicle
router.use("/search", search);
router.use("/auth", auth);
router.use("/booking", booking);

//i need to be able to  see details of the available transfers

//i need to be able to select and book a transfer

module.exports = router;
