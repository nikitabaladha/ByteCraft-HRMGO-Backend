const TerminationType = require("../../../models/TerminationType");

async function getAll(req, res) {
  try {
    const terminationTypes = await TerminationType.find();

    if (terminationTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Termination Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Termination Types fetched successfully",
      data: terminationTypes,
    });
  } catch (error) {
    console.error("Error fetching termination types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
