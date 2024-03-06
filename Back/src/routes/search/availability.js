const express = require("express");
const headers = require("../headersHelper");
const router = express.Router();

const baseUrl =
  "https://api.test.hotelbeds.com/transfer-api/1.0/availability/en/";
  
// router.get("/", (req, res) => {
//   const { origin, destination, startDate, endDate, adults, children } =
//     req.query;

//   if (
//     !origin ||
//     !destination ||
//     !startDate ||
//     !endDate ||
//     !adults ||
//     !children
//   ) {
//     res.status(400).send("Invalid or missing parameters");
//     return;
//   }

//   const url = `${baseUrl}/from/${origin}/to/${destination}/${startDate}/${endDate}/${adults}/${children}/0`;

//   res.send({ url });
// });

router.get("/one_way", (req, res) => {
  const fields = req.query.fields || "";
  const language = req.query.language || "en";
  const { from, to, dateFrom, adults, children, babies } = req.query;

  if (!from || !to || !dateFrom || !adults || !children) {
    //show of the parameters are missing in the send of 400
    console.log(from, to, dateFrom, adults, children, babies)
    res.status(400).send("Invalid or missing parameters");
    return;
  }
  let options = {
    method: "GET",
    headers: headers,
};
  const url = `${baseUrl}from/${from}/to/${to}/${dateFrom}/${adults}/${children}/${babies}`;
  console.log(url)
  fetch(url, options)
  .then(async (data) => {
    if (data.status !== 200) {
      res.send({status: 'no content'})
  }else{
    let  dataJson = await data.json()
    res.send({status: 'ok', data: dataJson})
  }
  });
});

router.get("/round_trip", (req, res) => {
  const fields = req.query.fields || "";
  const language = req.query.language || "en";
  const { from, to, dateFrom, dateTo, adults, children, babies } = req.query;

  if (!from || !to || !dateFrom || !dateTo || !adults || !children) {
    res.status(400).send("Invalid or missing parameters");
    return;
  }

  const url = `${baseUrl}from/${from}/to/${to}/${dateFrom}/${dateTo}/${adults}/${children}/${babies}`;
  console.log(url)
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => res.send(data));
});

module.exports = router;