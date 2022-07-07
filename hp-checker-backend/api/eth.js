const { honey_check, rugpull_check, detail_check, transfer_check, get_source } = require("../controllers/eth.controllers.js");
var router = require("express").Router();

// ************* MakeBid ***************************
router.post("/check-honeypot", honey_check);
router.post("/check-rugpull", rugpull_check);
router.post("/check-detail", detail_check);
router.post("/check-transfer", transfer_check);
router.post("/get-sourcecode", get_source);

module.exports = router;