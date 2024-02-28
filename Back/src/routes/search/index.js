const express = require("express");
const router = express.Router();

router.use("/availability", require("./availability"));
router.use("/countries", require("./countries"));
router.use("/destinations", require("./destinations"));
router.use("/hotels", require("./hotels"));
router.use("/transfers", require("./transfers"));
router.use("/pickups", require("./pickups"));
router.use("/terminals", require("./terminals"));

module.exports = router;