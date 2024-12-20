// const createPayroll = require('./SetSalary/create');
const createSetSalary =require('./SetSalary/create');
const getSingleSetSalary = require('./SetSalary/getsingle');
const getAllSetSalary = require('./SetSalary/getall');
const createPayslip =require('./Payslip/create');
const getAllPayslip =require('./Payslip/paygetall');
const payslipupdatestatus=require('./Payslip/paystatusupdate');
const updatestatusinactive=require('./Payslip/updatestatusinactive');
const createpayrolltype = require('./EmployeeSetSalary/create');
const getemployeedatabyid=require('./EmployeeSetSalary/getadatafromid');
const UpdatenetSalary=require('./EmployeeSetSalary/updatenetsalary');
const createAllowance=require('./Allowance/create');
const getAllowance = require('./Allowance/getall');
const deleteAllowance=require('./Allowance/delete');
const updateAllowance=require('./Allowance/updateallowance');
const createCommission=require('./Commission/create');
const getCommission = require('./Commission/getall');
const deleteCommission=require('./Commission/delete');
const updateCommission=require('./Commission/updatecommission');
const createLoan=require('./Loan/create');
const getLoan = require('./Loan/getall');
const deleteLoan=require('./Loan/delete');
const updateLoan=require('./Loan/updateloan');
const createOtherpayment=require('./Otherpayment/create');
const getOtherpayment = require('./Otherpayment/getall');
const deletedOtherpayment=require('./Otherpayment/delete');
const updateOtherPayment=require('./Otherpayment/updateotherpayment');
const createTax = require('./Tax/create');
const getTax = require('./Tax/getall');
const deleteTax = require('./Tax/delete');
const updateTax = require('./Tax/updatetax');
const createOvertime = require('./Overtime/create');
const getOvertime = require('./Overtime/getall');
const deleteOvertime = require('./Overtime/delete');
const updateOvertime = require('./Overtime/updateovertime');
const updatestatus=require('./EmployeeSetSalary/updatestatus')

module.exports = {
   createSetSalary, 
   getSingleSetSalary, 
   getAllSetSalary,
   createPayslip,
   getAllPayslip,
   payslipupdatestatus,
   updatestatusinactive,
   createpayrolltype,
   getemployeedatabyid,
   createAllowance,
   getAllowance,
   deleteAllowance,
   updateAllowance,
   createCommission,
   getCommission,
   deleteCommission,
   updateCommission,
   createLoan,
   getLoan,
   deleteLoan,
   updateLoan,
   createOtherpayment,
   getOtherpayment,
   deletedOtherpayment,
   updateOtherPayment,
   createTax,
   getTax,
   deleteTax,
   updateTax,
   createOvertime,
   getOvertime,
   deleteOvertime,
   updateOvertime,
   UpdatenetSalary,
   updatestatus


};

