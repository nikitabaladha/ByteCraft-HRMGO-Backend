const createContract = require("./Contract/create");
const getAllContract = require("./Contract/getAll");
const deleteContractById = require("./Contract/deleteById");
const updateContractById = require("./Contract/updateById");

const createContractComment = require("./ContractComment/create");
const getByContractId = require("./ContractComment/getByContractId");
const deleteById = require("./ContractComment/deleteById");

const createContractNote = require("./ContractNote/create");
const getNoteByContractId = require("./ContractNote/getByContractId");
const deleteNoteById = require("./ContractNote/deleteById");

const getDescriptionByContractId = require("./ContractDescription/getDescriptionByContractId");
const updateDescriptionById = require("./ContractDescription/updateDescriptionById");

module.exports = {
  createContract,
  getAllContract,
  deleteContractById,
  updateContractById,

  createContractComment,
  getByContractId,
  deleteById,

  createContractNote,
  getNoteByContractId,
  deleteNoteById,

  getDescriptionByContractId,
  updateDescriptionById,
};
