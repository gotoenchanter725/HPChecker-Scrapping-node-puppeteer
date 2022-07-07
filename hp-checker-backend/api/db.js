const { allData, GetTempData } = require("../controllers/db.controllers.js");
var router = require("express").Router();

router.post("/get-all", allData);
router.post("/getdata", GetTempData);

module.exports = router;