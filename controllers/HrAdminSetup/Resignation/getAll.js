const Resignation = require("../../../models/Resignation");

async function getAll(req, res) {
  try {
    // Fetch resignations with employee name populated
    const resignations = await Resignation.find().populate(
      "employeeId",
      "name"
    );

    // If no resignations found, return a 404 response
    if (!resignations.length) {
      return res.status(404).json({
        hasError: false,
        message: "No resignations found.",
        data: [],
      });
    }

    // Transform the results for the response
    const formattedResignations = resignations.map((resignation) => ({
      id: resignation._id,
      employeeName: resignation.employeeId?.name || "Unknown",
      resignationDate: resignation.resignationDate,
      lastWorkingDay: resignation.lastWorkingDay,
      reason: resignation.reason,
    }));

    // Return the transformed data
    return res.status(200).json({
      hasError: false,
      message: "Resignations retrieved successfully.",
      data: formattedResignations,
    });
  } catch (error) {
    console.error("Error retrieving resignations:", error.message);

    // Return a 500 response in case of server error
    return res.status(500).json({
      hasError: true,
      message: "Server error occurred while retrieving resignations.",
      error: error.message, // Include error details for debugging
    });
  }
}

module.exports = getAll;
