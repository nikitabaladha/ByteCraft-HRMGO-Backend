// Use require instead of import
const createEmployee = require("./Employee/create");
const getAllEmployee = require("./Employee/getAll");
const getAllName = require("./Employee/getAllName");
const getFilteredEmployees = require("./Employee/getFilteredEmployees");
const getByBranchDepartment = require("./Employee/getByBranchDepartment");

module.exports = {
  createEmployee,
  getAllEmployee,
  getAllName,
  getFilteredEmployees,
  getByBranchDepartment,
};
