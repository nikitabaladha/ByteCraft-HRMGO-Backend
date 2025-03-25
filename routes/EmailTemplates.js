const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createOrUpdateNewUser,
  getContent,
  NewEmployeeCreate,
  getNewEmployee,
  NewPayrollCreate,
  getNewPayroll,
  NewTicketCreate,
  getNewTicketContent,
  NewAwardCreate,
  getNewAward,
  EmployeeTransferCreate,
  getEmployeeTransfer,
} = require("../controllers/Templates/index.js");

// Define routes
router.post("/new-user-content", Middleware, createOrUpdateNewUser);
router.get("/get-new-user-content", Middleware, getContent)
router.post("/new-employee-content", Middleware, NewEmployeeCreate)
router.get("/get-new-employee-content", Middleware, getNewEmployee)
router.post("/new-payroll-content", Middleware, NewPayrollCreate)
router.get("/get-new-payroll-content", Middleware, getNewPayroll)
router.post("/new-ticket-content", Middleware, NewTicketCreate)
router.get("/get-new-ticket-content", Middleware, getNewTicketContent)
router.post("/new-award-content", Middleware, NewAwardCreate)
router.get("/get-new-award-content", Middleware, getNewAward)
router.post("/employee-transfer-content", Middleware, NewAwardCreate)
router.get("/get-employee-transfer-content", Middleware, getNewAward)

module.exports = router;
