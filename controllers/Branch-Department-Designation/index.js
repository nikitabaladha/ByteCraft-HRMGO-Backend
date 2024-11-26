// Use require instead of import
const createBranch = require("./Branch/create");
const getAllBranch = require("./Branch/getAll");

const createDepartment = require("./Department/create");
const getAllDepartment = require("./Department/getAll");
const getAllDepartmentByBranchId = require("./Department/getAllByBranchId");

const createDesignation = require("./Designation/create");
const getAllDesignation = require("./Designation/getAll");
const getAllDesignationByDepartmentId = require("./Designation/getAllByDepartmentId");

module.exports = {
  createBranch,
  getAllBranch,

  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,

  createDesignation,
  getAllDesignation,
  getAllDesignationByDepartmentId,
};
