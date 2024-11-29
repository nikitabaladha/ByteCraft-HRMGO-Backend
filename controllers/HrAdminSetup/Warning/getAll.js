// controllers/Warning/getAll.js
const Warning = require("../../../models/Warning");

async function getAll(req, res) {
  try {
    const warnings = await Warning.find()
      .populate("warningById", "name")
      .populate("warningToId", "name");

    if (!warnings.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Warnings found",
        data: [],
      });
    }

    const formedWarnings = warnings.map((warning) => ({
      warningBy: warning.warningById?.name || "Unknown",
      warningById: warning.warningById._id,
      warningTo: warning.warningToId?.name || "Unknown",
      subject: warning.subject,
      warningDate: warning.warningDate,
      warningToId: warning.warningToId._id,
      description: warning.description,
      id: warning._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Warnings retrieved successfully",
      data: formedWarnings,
    });
  } catch (error) {
    console.error("Error in getAll API:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = getAll;
