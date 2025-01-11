// Use require instead of import
const createBranch = require("./Branch/create");
const getAllBranch = require("./Branch/getAll");
const getBranchById =require("./Branch/getByid");

const createDepartment = require("./Department/create");
const getAllDepartment = require("./Department/getAll");
const getAllDepartmentByBranchId = require("./Department/getAllByBranchId");
const getDepartmentById = require("./Department/getByid");


const createDesignation = require("./Designation/create");
const getAllDesignation = require("./Designation/getAll");
const getAllDesignationByDepartmentId = require("./Designation/getAllByDepartmentId");

module.exports = {
  createBranch,
  getAllBranch,
  getBranchById,

  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,
  getDepartmentById,

  createDesignation,
  getAllDesignation,
  getAllDesignationByDepartmentId,
 
};
