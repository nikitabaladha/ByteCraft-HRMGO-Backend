// routes/index.js
// const express = require("express");
const signup = require("../controllers/User/signup");
const login = require("../controllers/User/login");

const dashboardRoutes = require("./dashboard");
const meetingRoutes = require("./meeting");
const attendanceRoutes = require("./attendance");
const announcementRoutes = require("./announcement");
const calendarRoutes = require("./calendar");
const incomeExpenseChartRoutes = require("./incomeExpenseChart");

const branchRoutes = require("./branch");
const departmentRoutes = require("./department");
const designationRoutes = require("./designation");

const employeeRoutes = require("./employee");
const setSalaryRoutes  = require("./setSalary");
const payslipRoutes    = require("./payslip");
const employeeSetSalaryRoutes=require("./EmployeeSetSalary")

const manageLeaveRoutes = require("./manageLeave");
const timeSheetRoutes = require("./timeSheet");
const MarkedAttendance = require("./markedAttendance");

const accountListRoutes=require("./accountList");
const accountBalanceRoutes=require("./accountBalance");
const payeeRoutes=require("./Payee");
const payerRoutes=require("./Payer");
const depositeRoutes=require("./Deposit");
const expenseRoutes=require("./Expense");
const transferBalanceRoutes=require("./TransferBalance");

const ticketRoutes=require("./Ticket");
const ticketReplyRoutes=require("./TicketReply");

const meetingsRoutes=require("./Meetings");

const zoommeeting=require("./zoommeeting");

const companyPolicy=require("./companypolicy");

const allowanceRoutes=require("./allowance");
const commissionRoutes=require("./commission");
const loanRoutes=require("./loan");
const OtherpaymentRoutes=require("./otherpayment");
const taxRoutes=require("./tax");
const overtimeRoutes=require("./overtime");

const leaveTypeRoutes=require("./LeaveType");
const payslipTypeRoutes=require("./paysliptype");
const documentTypeRoutes=require("./documenttype");
const allowanceOptionRoutes=require("./allowanceoption");
const loanOptionRoutes=require("./loanoption");
const deductionOptionRoutes=require("./deductionoption");
const trainingtypeRoutes=require("./trainingtype");
const awardtypeRoutes=require("./awardtype");
const jobStageRoutes=require("./jobstage");
const terminationTypeRoutes=require("./termination");
const performanceTypeRoutes=require("./performancetype");
const expenseTypeRoutes=require("./expensetype");
const incomeTypeRoutes=require("./incometype");
const paymentTypeRoutes=require("./paymenttype");
const contractTypeRoutes=require("./contracttype");
const jobCategoryRoutes=require("./jobcategory");




module.exports = (app) => {
  app.post("/api/signup", signup);
  app.post("/api/login", login);

  app.use("/api", dashboardRoutes); // This mounts the dashboard routes

  app.use("/api", meetingRoutes); // This mounts the meeting routes

  app.use("/api", attendanceRoutes); // This mounts the attendanceRoutes routes

  app.use("/api", announcementRoutes); // This mounts the announcementRoutes routes

  app.use("/api", calendarRoutes); // This mounts the calendarRoutes routes

  app.use("/api", incomeExpenseChartRoutes); // This mounts the incomeExpenseChartRoutes routes

  app.use("/api", branchRoutes); // This mounts the branchRoutes routes

  app.use("/api", departmentRoutes); // This mounts the departmentRoutes routes

  app.use("/api", designationRoutes); // This mounts the  DesignationRoutes routes

  app.use("/api", employeeRoutes); // This mounts the employeeRoutes routes

  app.use("/api", setSalaryRoutes); // This mounts the SetSalaryRoutes routes

  app.use("/api", payslipRoutes); // This mounts the SetSalaryRoutes routes

  app.use("/api", manageLeaveRoutes); // This mounts the manageLeaveRoutes routes

  app.use("/api", timeSheetRoutes); // This mounts the timeSheetRoutes routes

  app.use("/api", MarkedAttendance); // This mounts the MarkedAttendance routes

  app.use("/api", accountListRoutes); // This mounts the AccountList routes

  app.use("/api", accountBalanceRoutes); // This mounts the AccountBalance routes

  app.use("/api", payeeRoutes); // This mounts the Payee routes

  app.use("/api", payerRoutes); // This mounts the Payer routes

  app.use("/api", depositeRoutes); // This mounts the Deposit routes

  app.use("/api", expenseRoutes); // This mounts the Expense routes

  app.use("/api", transferBalanceRoutes); // This mounts the TransferBalance routes

  app.use("/api", ticketRoutes); // This mounts the Ticket routes

  app.use("/api", ticketReplyRoutes); // This mounts the TicketReply routes

  app.use("/api", meetingsRoutes); // This mounts the Meetings routes

  app.use("/api", zoommeeting); // This mounts the Zoom Meetings routes
  
  app.use("/api", companyPolicy); // This mounts the ComapnayPolicy routes

  app.use("/api", employeeSetSalaryRoutes); // This mounts employeeSetSalary the  routes

  app.use("/api", allowanceRoutes); // This mounts allowance Routes the  routes

  app.use("/api", commissionRoutes); // This mounts Commission Routes the  routes

  app.use("/api", loanRoutes); // This mounts Loan Routes the  routes

  app.use("/api", OtherpaymentRoutes); // This mounts Other Payment Routes the  routes

  app.use("/api", taxRoutes); // This mounts Tax Routes the  routes
  
  app.use("/api", overtimeRoutes); // This mounts Overtime Routes the  routes

  app.use("/api", leaveTypeRoutes); // This mounts LeaveTypes Routes the  routes

  app.use("/api", payslipTypeRoutes); // This mounts PayslipTypes Routes the  routes

  app.use("/api", documentTypeRoutes); // This mounts DocumentTypes Routes the  routes

  app.use("/api", allowanceOptionRoutes); // This mounts Allowance Option Routes the  routes

  app.use("/api", loanOptionRoutes); // This mounts Loan Option Routes the  routes

  app.use("/api", deductionOptionRoutes); // This mounts deduction Option Routes the  routes

  app.use("/api", trainingtypeRoutes); // This mounts TrainingType Routes the  routes

  app.use("/api", awardtypeRoutes); // This mounts AwardType Routes the  routes

  app.use("/api", jobStageRoutes); // This mounts jobstage Routes the  routes

  app.use("/api", terminationTypeRoutes); // This mounts Termination Type Routes the  routes

  app.use("/api", performanceTypeRoutes); // This mounts Performance Type Routes the  routes

  app.use("/api", expenseTypeRoutes); // This mounts Expense Type Routes the  routes

  app.use("/api", incomeTypeRoutes); // This mounts Income Type Routes the  routes

  app.use("/api", paymentTypeRoutes); // This mounts Payment Type Routes the  routes

  app.use("/api", contractTypeRoutes); // This mounts Contract Type Routes the  routes

  app.use("/api", jobCategoryRoutes); // This mounts Job Category Routes the  routes
 
};
