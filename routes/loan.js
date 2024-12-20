const express = require("express");
const router = express.Router();


const Middleware = require("../middleware/index.js");

const {
    createLoan,
    getLoan,
    deleteLoan,
    updateLoan
} = require("../controllers/Payroll/index.js");


router.post("/create_loan", Middleware, createLoan);                
router.get("/getloanbyid/:employeeId", Middleware, getLoan);      
router.delete("/deleteloan/:id", Middleware, deleteLoan);             
router.put("/updateloan/:loanId", Middleware, updateLoan);           

module.exports = router;
