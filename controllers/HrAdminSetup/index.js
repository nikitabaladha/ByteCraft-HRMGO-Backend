// Use require instead of import
const createAward = require("./Award/create");
const getAllAward = require("./Award/getAll");
const updateAwardById = require("./Award/updateById");
const deleteAwardById = require("./Award/deleteById");

const createResignation = require("./Resignation/create");
const getAllResignation = require("./Resignation/getAll");
const updateResignationById = require("./Resignation/updateById");
const deleteResignationById = require("./Resignation/deleteById");

const createPromotion = require("./Promotion/create");
const getAllPromotion = require("./Promotion/getAll");
const updatePromotionById = require("./Promotion/updateById");
const deletePromotionById = require("./Promotion/deleteById");

module.exports = {
  createAward,
  getAllAward,
  updateAwardById,
  deleteAwardById,

  createResignation,
  getAllResignation,
  updateResignationById,
  deleteResignationById,

  createPromotion,
  getAllPromotion,
  updatePromotionById,
  deletePromotionById,
};
