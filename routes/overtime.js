const express = require("express");
const router = express.Router();

const Middleware = require("../middleware/index.js");

const {
    createOvertime,
    getOvertime,
    deleteOvertime,
    updateOvertime
} = require("../controllers/Payroll/index.js");

router.post("/create_overtime", Middleware, createOvertime);                
router.get("/getovertimebyid/:employeeId", Middleware, getOvertime);      
router.delete("/deleteovertime/:id", Middleware, deleteOvertime);             
router.put("/updateovertime/:overtimeId", Middleware, updateOvertime);           

module.exports = router;
