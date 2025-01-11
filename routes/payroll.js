const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {

  getAllByDatetype

} = require("../controllers/Dashboard");


router.get("/payroll-get-all",Middleware,getAllByDatetype);


module.exports = router;
