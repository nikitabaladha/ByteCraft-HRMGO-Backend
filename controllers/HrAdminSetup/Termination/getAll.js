const Termination = require("../../../models/Termination");

async function getAll(req, res) {
  try {
    const terminations = await Termination.find().populate(
      "employeeId",
      "name"
    );

    if (!terminations.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Terminations found",
        data: [],
      });
    }

    const formedTerminations = terminations.map((termination) => ({
      employeeName: termination.employeeId?.name || "Unknown",
      terminationType: termination.terminationType,
      noticeDate: termination.noticeDate,
      terminationDate: termination.terminationDate,
      description: termination.description,
      id: termination._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Terminations retrieved successfully",
      data: formedTerminations,
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
