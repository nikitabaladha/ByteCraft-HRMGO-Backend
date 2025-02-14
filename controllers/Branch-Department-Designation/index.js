// Use require instead of import

const createBranch = require("./Branch/create");
const getAllBranch = require("./Branch/getAll");
const getBranchById = require("./Branch/getByid");
const updatebranch = require("./Branch/updatebranch");
const deletebranch = require("./Branch/deletebranch");

const createDepartment = require("./Department/create");
const getAllDepartment = require("./Department/getAll");
const getAllDepartmentByBranchId = require("./Department/getAllByBranchId");
const getDepartmentById = require("./Department/getByid");
const updateDepartment = require("./Department/update");
const deleteDepartment = require("./Department/delete");

const getAllDesignationByDepartmentId = require("./Designation/getAllByDepartmentId");
const createDesignation = require("./Designation/create");
const getAllDesignation = require("./Designation/getAll");
const updatedDesignation = require("./Designation/update");
const deleteDesignation = require("./Designation/delete");
const designationbyid = require("./Designation/getdesignationbyid");

module.exports = {
  createBranch,
  getAllBranch,
  getBranchById,
  updatebranch,
  deletebranch,

  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,

  createDesignation,
  getAllDesignation,
  getAllDesignationByDepartmentId,
  updatedDesignation,
  deleteDesignation,
  designationbyid,
};
