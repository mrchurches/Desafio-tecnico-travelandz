const express = require("express");
const router = express.Router();

router.use('/confirm', require('./confirm'));
router.use('/list', require('./list'));
router.use('/cancel', require('./cancel'));

module.exports = router;