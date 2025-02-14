const express = require("express");
const router = express.Router();


const Middleware = require("../middleware/index.js");

const {
    createOtherpayment,
    getOtherpayment,
    deletedOtherpayment,
    updateOtherPayment
} = require("../controllers/Payroll/index.js");


router.post("/create_otherpayment", Middleware, createOtherpayment);                
router.get("/getotherpaymentbyid/:employeeId", Middleware, getOtherpayment);      
router.delete("/deleteotherpayment/:id", Middleware, deletedOtherpayment);             
router.put("/updateotherpayment/:otherPaymentId", Middleware,updateOtherPayment);           

module.exports = router;
