const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createCommission,
    getCommission,
    deleteCommission,
    updateCommission
} = require("../controllers/Payroll/index.js");


router.post("/create_commission", Middleware, createCommission);              
router.get("/getcommissionbyid/:employeeId", Middleware, getCommission);       
router.delete("/deletecommission/:id", Middleware, deleteCommission);  
router.put("/updatecommission/:commissionId", Middleware, updateCommission);  

module.exports = router;
