const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
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
  getByStartEndDate,
} = require("../controllers/HrAdminSetup");

// Define routes
router.post("/award", Middleware, createAward);
router.get("/award", Middleware, getAllAward);
router.put("/award/:id", Middleware, updateAwardById);
router.delete("/award/:id", Middleware, deleteAwardById);

router.post("/resignation", Middleware, createResignation);
router.get("/resignation", Middleware, getAllResignation);
router.put("/resignation/:id", Middleware, updateResignationById);
router.delete("/resignation/:id", Middleware, deleteResignationById);

router.post("/promotion", Middleware, createPromotion);
router.get("/promotion", Middleware, getAllPromotion);
router.put("/promotion/:id", Middleware, updatePromotionById);
router.delete("/promotion/:id", Middleware, deletePromotionById);

router.post("/complaint", Middleware, createComplaint);
router.get("/complaint", Middleware, getAllComplaint);
router.put("/complaint/:id", Middleware, updateComplaintById);
router.delete("/complaint/:id", Middleware, deleteComplaintById);

router.post("/warning", Middleware, createWarning);
router.get("/warning", Middleware, getAllWarning);
router.put("/warning/:id", Middleware, updateWarningById);
router.delete("/warning/:id", Middleware, deleteWarningById);

router.post("/termination", Middleware, createTermination);
router.get("/termination", Middleware, getAllTermination);
router.put("/termination/:id", Middleware, updateTerminationById);
router.delete("/termination/:id", Middleware, deleteTerminationById);

router.post("/announcement", Middleware, createAnnouncement);
router.get("/announcement", Middleware, getAllAnnouncement);
router.put("/announcement/:id", Middleware, updateAnnouncementById);
router.delete("/announcement/:id", Middleware, deleteAnnouncementById);

router.post("/holiday", Middleware, createHoliday);
router.get("/holiday", Middleware, getAllHoliday);
router.put("/holiday/:id", Middleware, updateHolidayById);
router.delete("/holiday/:id", Middleware, deleteHolidayById);
router.get("/holiday-get-by-date", Middleware, getByStartEndDate);
module.exports = router;
