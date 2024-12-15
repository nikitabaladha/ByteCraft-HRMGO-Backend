const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createpayrolltype,
    getemployeedatabyid,
    // getAllSetSalary,
} = require("../controllers/Payroll/index.js");

// Define routes
router.post("/create_payrolltype", Middleware, createpayrolltype);              
router.get("/getemployeedatabyid/:employeeId", Middleware, getemployeedatabyid);       
// router.get("/setsalary-get/:id", Middleware, getSingleSetSalary);    

module.exports = router;

