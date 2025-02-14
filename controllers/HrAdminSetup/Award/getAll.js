const Award = require("../../../models/Award");

async function getAll(req, res) {
  try {
    const awards = await Award.find().populate("employeeId", "name", "id");

    if (!awards.length) {
      return res.status(404).json({
        hasError: false,
        message: "No Awards found.",
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
      employeeId: award.employeeId?._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Awards retrieved successfully.",
      data: formedAwards,
    });
  } catch (error) {
    console.error("Error retrieving Awards:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Server error occurred while retrieving Awards.",
      error: error.message,
    });
  }
}

module.exports = getAll;
