// Use require instead of import
const createAward = require("./Award/create");
const getAllAward = require("./Award/getAll");
const updateAwardById = require("./Award/updateById");
const deleteAwardById = require("./Award/deleteById");

module.exports = {
  createAward,
  getAllAward,
  updateAwardById,
  deleteAwardById,
};
