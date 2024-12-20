const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createpayrolltype,
    getemployeedatabyid,
    UpdatenetSalary,
    updatestatus
} = require("../controllers/Payroll/index.js");

// Define routes
router.post("/create_payrolltype", Middleware, createpayrolltype);              
router.get("/getemployeedatabyid/:employeeId", Middleware, getemployeedatabyid);       
router.put("/updatenetsalary", Middleware, UpdatenetSalary);  
router.put("/updatestatus/:employeeId", Middleware, updatestatus);    

module.exports = router;

