const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

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
  EmployeeResignationCreate,
  getEmployeeResignation,
  EmplPromotionCreate,
  getEmpPromotion,
  EmplComplaintCreate,
  getEmpComplaint,
  EmplTerminationCreate,
  getEmpTermination,
  EmplWarningCreate,
  getEmpWarning,
  LeaveStatusCreate,
  getLeaveStatus,
  contractCreateContent,
  getContractContent,
} = require("../controllers/Templates/index.js");

router.post("/new-user-content", Middleware, createOrUpdateNewUser);
router.get("/get-new-user-content", Middleware, getContent);
router.post("/new-employee-content", Middleware, NewEmployeeCreate);
router.get("/get-new-employee-content", Middleware, getNewEmployee);
router.post("/new-payroll-content", Middleware, NewPayrollCreate);
router.get("/get-new-payroll-content", Middleware, getNewPayroll);
router.post("/new-ticket-content", Middleware, NewTicketCreate);
router.get("/get-new-ticket-content", Middleware, getNewTicketContent);
router.post("/new-award-content", Middleware, NewAwardCreate);
router.get("/get-new-award-content", Middleware, getNewAward);
router.post(
  "/employee-resignation-content",
  Middleware,
  EmployeeResignationCreate
);
router.get(
  "/get-employee-resignation-content",
  Middleware,
  getEmployeeResignation
);
router.post("/employee-promotion-content", Middleware, EmplPromotionCreate);
router.get("/get-employee-promotion-content", Middleware, getEmpPromotion);
router.post("/employee-compaint-content", Middleware, EmplComplaintCreate);
router.get("/get-employee-complaint-content", Middleware, getEmpComplaint);
router.post("/employee-termination-content", Middleware, EmplTerminationCreate);
router.get("/get-employee-termination-content", Middleware, getEmpTermination);
router.post("/employee-warning-content", Middleware, EmplWarningCreate);
router.get("/get-employee-warning-content", Middleware, getEmpWarning);
router.post("/leave-status-content", Middleware, LeaveStatusCreate);
router.get("/get-leave-status-content", Middleware, getLeaveStatus);
router.post("/contract-content", Middleware, contractCreateContent);
router.get("/get-contract-content", Middleware, getContractContent);

module.exports = router;
