// const createPayroll = require('./SetSalary/create');
const createSetSalary =require('./SetSalary/create');
const getSingleSetSalary = require('./SetSalary/getsingle');
const getAllSetSalary = require('./SetSalary/getall');
const createPayslip =require('./Payslip/create');
const getAllPayslip =require('./Payslip/paygetall');
const payslipupdatestatus=require('./Payslip/paystatusupdate');
const updatestatusinactive=require('./Payslip/updatestatusinactive');
const createpayrolltype = require('./EmployeeSetSalary/create');
const getemployeedatabyid=require('./EmployeeSetSalary/getadatafromid')
module.exports = {
   createSetSalary, 
   getSingleSetSalary, 
   getAllSetSalary,
   createPayslip,
   getAllPayslip,
   payslipupdatestatus,
   updatestatusinactive,
   createpayrolltype,
   getemployeedatabyid

};

