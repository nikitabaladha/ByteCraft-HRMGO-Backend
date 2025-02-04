const express = require("express");
const router = express.Router();

const Middleware = require("../middleware/index.js");

const {
    createTax,
    getTax,
    deleteTax,
    updateTax
} = require("../controllers/Payroll/index.js");

router.post("/create_tax", Middleware, createTax);                
router.get("/gettaxbyid/:employeeId", Middleware, getTax);      
router.delete("/deletetax/:id", Middleware, deleteTax);             
router.put("/updatetax/:taxId", Middleware, updateTax);           

module.exports = router;
