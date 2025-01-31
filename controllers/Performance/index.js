// Use require instead of import
const createPerformance = require("./create");
const getPerformance = require("./getAll");
const deletePerformance = require("./deletePerformance");

module.exports = {
  createPerformance,
  getPerformance,
  deletePerformance,
};
