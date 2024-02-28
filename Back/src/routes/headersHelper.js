const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

dotenv.config();

const publicKey = process.env.API_KEY;
const privateKey = process.env.SECRET;

if (!publicKey || !privateKey) {
  throw new Error("Please provide a public and a private key");
}

const utcDate = Math.floor(Date.now() / 1000);
const assemble = publicKey + privateKey + utcDate;
const hash = CryptoJS.SHA256(assemble).toString();
const encryption = hash.toString(CryptoJS.enc.Hex);

const headers = {
  Accept: "application/json",
  "Accept-enconding": "gzip",
  "Content-Type": "application/json",
  "Api-Key": publicKey,
  "X-Signature": encryption,
};

module.exports = headers;