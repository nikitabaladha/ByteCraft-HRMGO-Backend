const createCompanySetting = require("./CompanySetting/create");
const getCompanySetting = require("./CompanySetting/getCompanySetting");
const updateCompanySetting = require("./CompanySetting/update");
const createSystemSettings = require("./SystemSettings/create");
const getSystemSettings = require("./SystemSettings/getSystemSetting");
const updateSystemSettings = require("./SystemSettings/update");
const createZoomSettings = require("./ZoomMeetingSetting/create");
const updateZoomSettings = require("./ZoomMeetingSetting/update");
const getZoomSettings = require("./ZoomMeetingSetting/getZoomMetting");
const createBusinessSetting = require("./BusinessSetting/create");
const getBusinessSetting = require("./BusinessSetting/getBusinessSetting");
const updateBusinessSetting = require("./BusinessSetting/update");

module.exports = {
  createCompanySetting,
  getCompanySetting,
  createSystemSettings,
  updateCompanySetting,
  updateSystemSettings,
  getSystemSettings,
  createZoomSettings,
  updateZoomSettings,
  getZoomSettings,
  createBusinessSetting,
  getBusinessSetting,
  updateBusinessSetting,
};
