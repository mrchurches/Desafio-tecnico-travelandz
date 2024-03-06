const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/sign_in", require("./sign_in"));
router.use("/user_details", require("./user_details"));
module.exports = router;
