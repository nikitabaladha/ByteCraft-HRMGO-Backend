const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");
const upload = require("../controllers/uploadFiles");

const uploadFiles = (req, res, next) => {
  upload.fields([
    { name: "logoDark", maxCount: 1 },
    { name: "logoLight", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

const {
  createCompanySetting,
  getCompanySetting,
  createSystemSettings,
  createZoomSettings,
  updateCompanySetting,
  updateSystemSettings,
  getSystemSettings,
  updateZoomSettings,
  getZoomSettings,
  createBusinessSetting,
  getBusinessSetting,
  updateBusinessSetting,
 
} = require("../controllers/System-Setting/index.js");
const { skipMiddlewareFunction } = require("mongoose");

router.post("/company-setting", Middleware, createCompanySetting);
router.get("/get-company-setting", Middleware, getCompanySetting);
router.put("/update-company-setting", Middleware, updateCompanySetting)
router.post("/system-settings", Middleware, createSystemSettings)
router.put("/update-system-setting", Middleware, updateSystemSettings)
router.post("/zoom-meeting-setting", Middleware, createZoomSettings)
router.get("/get-system-setting", Middleware, getSystemSettings)
router.put("/update-zoom-setting", Middleware, updateZoomSettings)
router.get("/get-zoom-setting", Middleware, getZoomSettings)
router.post("/create-business-setting", uploadFiles, Middleware, createBusinessSetting)
router.get("/get-business-setting", Middleware, getBusinessSetting)
router.put("/update-business-setting", uploadFiles, Middleware, updateBusinessSetting)

module.exports = router;
