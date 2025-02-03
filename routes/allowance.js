const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createAllowance,
    getAllowance,
    deleteAllowance,
    updateAllowance
  
   
} = require("../controllers/Payroll/index.js");

// Define routes
router.post("/create_allowance", Middleware, createAllowance);              
router.get("/getallowancebyid/:employeeId", Middleware, getAllowance);       
router.delete("/deleteallowance/:id", Middleware, deleteAllowance);  
router.put("/updateallowance/:allowanceId", Middleware, updateAllowance);  

module.exports = router;

