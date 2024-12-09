const createContract = require("./Contract/create");
const getAllContract = require("./Contract/getAll");
const deleteContractById = require("./Contract/deleteById");
const updateContractById = require("./Contract/updateById");

const createContractComment = require("./ContractComment/create");
const getAllContractComment = require("./ContractComment/getAll");
const deleteById = require("./ContractComment/deleteById");

module.exports = {
  createContract,
  getAllContract,
  deleteContractById,
  updateContractById,

  createContractComment,
  getAllContractComment,
  deleteById,
};
