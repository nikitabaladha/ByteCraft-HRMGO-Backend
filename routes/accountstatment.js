const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  getAllAccountname,
  getAccountBydate,
} = require("../controllers/Dashboard");

router.get("/acoountname-get-all", Middleware, getAllAccountname);
router.get("/getaccount-by-date", Middleware, getAccountBydate);

module.exports = router;
