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
const EmployeeTransferCreate = require("./Employee Transfer/EmployeeTransferCreate")
const getEmployeeTransfer = require("./Employee Transfer/getEmployeeTransfer")

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
  EmployeeTransferCreate,
  getEmployeeTransfer
};
