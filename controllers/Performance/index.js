const createIndicator = require("./Indicator/create");
const getAllIndicator = require("./Indicator/getAll");
const getById = require("./Indicator/getById");
const deleteById = require("./Indicator/deleteById");
const updateIndicator = require("./Indicator/update");
const getByQuery = require("./Indicator/getByQuery");

const createAppraisal = require("./Appraisal/create");
const getAllAppraisal = require("./Appraisal/getAll");
const appraisalGetById = require("./Appraisal/getById");
const appraisalDeleteById = require("./Appraisal/deleteById");
const updatedAppraisal = require("./Appraisal/update");

module.exports = {
  createIndicator,
  getAllIndicator,
  getById,
  deleteById,
  updateIndicator,
  getByQuery,

  createAppraisal,
  getAllAppraisal,
  appraisalGetById,
  appraisalDeleteById,
  updatedAppraisal,
};
