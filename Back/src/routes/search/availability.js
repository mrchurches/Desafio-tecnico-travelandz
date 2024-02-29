const express = require("express");
const router = express.Router();

const baseUrl =
  "https://api.test.hotelbeds.com/transfer-api/1.0/availability/en";
  
router.get("/", (req, res) => {
  const { origin, destination, startDate, endDate, adults, children } =
    req.query;

  if (
    !origin ||
    !destination ||
    !startDate ||
    !endDate ||
    !adults ||
    !children
  ) {
    res.status(400).send("Invalid or missing parameters");
    return;
  }

  const url = `${baseUrl}/from/${origin}/to/${destination}/${startDate}/${endDate}/${adults}/${children}/0`;

  res.send({ url });
});

router.get("/one_way", (req, res) => {
  const { from, to, date, adults, children, babies } = req.query;

  if (!origin || !destination || !date || !adults || !children) {
    res.status(400).send("Invalid or missing parameters");
    return;
  }

  const url = `${baseUrl}/from/${origin}/to/${destination}/${date}/${adults}/${children}/${babies}`;
  
  res.send({ url });
});

router.get("/round_trip", (req, res) => {
  const { origin, destination, startDate, endDate, adults, children } =
    req.query;

  if (
    !origin ||
    !destination ||
    !startDate ||
    !endDate ||
    !adults ||
    !children
  ) {
    res.status(400).send("Invalid or missing parameters");
    return;
  }

  const url = `${baseUrl}/from/${origin}/to/${destination}/${startDate}/${endDate}/${adults}/${children}/1`;

  res.send({ url });
});

module.exports = router;