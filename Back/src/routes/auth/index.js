const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/sign_in", require("./sign_in"));

module.exports = router;