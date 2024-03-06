const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index.js");
const bodyParser = require("body-parser");

const { URL_ALLOWED } = process.env;

const server = express();


server.use(express.urlencoded({ extended: true, limit: "50mb" }));
// server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", URL_ALLOWED);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error({ err });
  res.status(status).send({ message });
});

module.exports = server;
