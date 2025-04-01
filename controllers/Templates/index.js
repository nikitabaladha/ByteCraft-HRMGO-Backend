const createOrUpdateNewUser = require("./New User/NewUserSaveOrUpdate");
const getContent = require("./New User/getContent")
const NewEmployeeCreate = require("./New Employee/NewEmployeeSaveOrUpdate")
const getNewEmployee = require("./New Employee/getNewEmployee")
const NewPayrollCreate = require("./NewPayroll/NewPayrollSaveOrUpdate")
const getNewPayroll = require("./NewPayroll/getPayrollContent")
const NewTicketCreate = require("./New Ticket/NewTicketSaveOrUpdate")
const getNewTicketContent = require("./New Ticket/getNewTicket")
const NewAwardCreate = require("./New Award/newAwardTempCreate")
const getNewAward = require("./New Award/getNewAward")
const EmployeeResignationCreate = require("./Employee Resignation/EmployeeResignationCreate")
const getEmployeeResignation = require("./Employee Resignation/getEmployeeResignation")
const EmplPromotionCreate = require("./Employee Promotion/EmpPromotionCreate")
const getEmpPromotion = require("./Employee Promotion/getEmpPromotion")
const EmplComplaintCreate = require("./Employee Complaint/EmpComplainCreate")
const getEmpComplaint = require("./Employee Complaint/getEmployeeComplaint")
const EmplTerminationCreate = require("./Employee termination/EmpTerminationCreate")
const getEmpTermination = require("./Employee termination/getEmpTermination")
const EmplWarningCreate = require("./Employee Warning/EmpWarningCreate")
const getEmpWarning = require("./Employee Warning/getEmpWarning")
const LeaveStatusCreate = require("./Leave Status/LeaveStatusCreate")
const getLeaveStatus = require("./Leave Status/getLeaveStatus")
const contractCreateContent = require("./Contract/ContractCreateContent")
const getContractContent = require("./Contract/getContractContent")

module.exports = {
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
  getContractContent
};
