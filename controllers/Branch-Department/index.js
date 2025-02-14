// Use require instead of import
const createBranch = require("./Branch/create");
const getAllBranch = require("./Branch/getAll");
const updatebranch = require("./Branch/updatebranch");
const deletebranch = require("./Branch/deletebranch");

const createDepartment = require("./Department/create");
const getAllDepartment = require("./Department/getAll");
const getAllDepartmentByBranchId = require("./Department/getAllByBranchId");
const updateDepartment = require("./Department/update");
const deleteDepartment = require("./Department/delete");

const createDesignation = require("./Designation/create");
const getAllDesignation = require("./Designation/getAll");
const updatedDesignation = require("./Designation/update");
const deleteDesignation = require("./Designation/delete");
const designationbyid = require("./Designation/getdesignationbyid");

module.exports = {
  createBranch,
  getAllBranch,
  updatebranch,
  deletebranch,

  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,
  updateDepartment,
  deleteDepartment,

  createDesignation,
  getAllDesignation,
  updatedDesignation,
  deleteDesignation,
  designationbyid,
};
