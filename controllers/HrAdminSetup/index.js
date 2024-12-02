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

const createComplaint = require("./Complaint/create");
const getAllComplaint = require("./Complaint/getAll");
const updateComplaintById = require("./Complaint/updateById");
const deleteComplaintById = require("./Complaint/deleteById");

const createWarning = require("./Warning/create");
const getAllWarning = require("./Warning/getAll");
const updateWarningById = require("./Warning/updateById");
const deleteWarningById = require("./Warning/deleteById");

const createTermination = require("./Termination/create");
const getAllTermination = require("./Termination/getAll");
const updateTerminationById = require("./Termination/updateById");
const deleteTerminationById = require("./Termination/deleteById");

const createAnnouncement = require("./Announcement/create");
const getAllAnnouncement = require("./Announcement/getAll");
const updateAnnouncementById = require("./Announcement/updateById");
const deleteAnnouncementById = require("./Announcement/deleteById");

const createHoliday = require("./Holiday/create");
const getAllHoliday = require("./Holiday/getAll");
const updateHolidayById = require("./Holiday/updateById");
const deleteHolidayById = require("./Holiday/deleteById");

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

  createComplaint,
  getAllComplaint,
  updateComplaintById,
  deleteComplaintById,

  createWarning,
  getAllWarning,
  updateWarningById,
  deleteWarningById,

  createTermination,
  getAllTermination,
  updateTerminationById,
  deleteTerminationById,

  createAnnouncement,
  getAllAnnouncement,
  updateAnnouncementById,
  deleteAnnouncementById,

  createHoliday,
  getAllHoliday,
  updateHolidayById,
  deleteHolidayById,
};
