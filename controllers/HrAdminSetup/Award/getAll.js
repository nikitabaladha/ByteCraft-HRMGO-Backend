// controllers/Award/getAll.js
const Award = require("../../../models/Award");

async function getAll(req, res) {
  try {
    const awards = await Award.find().populate("employeeId", "name");

    if (!awards.length) {
      return res.status(404).json({
        hasError: true,
        message: "No awards found",
        data: [],
      });
    }

    const formedAwards = awards.map((award) => ({
      employeeName: award.employeeId?.name || "Unknown",
      awardType: award.awardType,
      date: award.date,
      gift: award.gift,
      description: award.description,
      id: award._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Awards retrieved successfully",
      data: formedAwards,
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
