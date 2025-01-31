const Competency = require("../../../models/Competency");

// Get all competencies logic
async function getAll(req, res) {
  try {
    // Fetch all competencies from the database
    const competencies = await Competency.find();

    // If no competencies are found
    if (!competencies.length) {
      return res.status(404).json({
        message: "No competencies found.",
      });
    }

    // Return the list of competencies
    return res.status(200).json({
      message: "Competencies retrieved successfully!",
      data: competencies,
    });
  } catch (error) {
    console.error("Error fetching competencies:", error);
    return res.status(500).json({
      message: "Failed to fetch competencies.",
      error: error.message,
    });
  }
}

module.exports = getAll;
