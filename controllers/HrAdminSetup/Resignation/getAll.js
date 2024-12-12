const Resignation = require("../../../models/Resignation");

async function getAll(req, res) {
  try {
    const resignations = await Resignation.find().populate(
      "employeeId",
      "name"
    );

    if (!resignations.length) {
      return res.status(404).json({
        hasError: false,
        message: "No resignations found.",
        data: [],
      });
    }

    const formattedResignations = resignations.map((resignation) => ({
      id: resignation._id,
      employeeName: resignation.employeeId?.name || "Unknown",
      resignationDate: resignation.resignationDate,
      lastWorkingDay: resignation.lastWorkingDay,
      reason: resignation.reason,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Resignations retrieved successfully.",
      data: formattedResignations,
    });
  } catch (error) {
    console.error("Error retrieving resignations:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Server error occurred while retrieving resignations.",
      error: error.message,
    });
  }
}

module.exports = getAll;
