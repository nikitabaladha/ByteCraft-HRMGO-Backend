const CompetencyList = require("../../../models/CompetencyList");

async function getAll(req, res) {
  try {
    // Fetch all competency lists from the database
    const competencyLists = await CompetencyList.find().populate(
      "competencyId",
      "competencyListName"
    );

    if (!competencyLists.length) {
      return res.status(404).json({
        message: "No competency lists found.",
      });
    }

    return res.status(200).json({
      message: "Competency lists retrieved successfully.",
      data: competencyLists,
    });
  } catch (error) {
    console.error("Error retrieving competency lists:", error);
    return res.status(500).json({
      message: "Failed to retrieve competency lists.",
      error: error.message,
    });
  }
}

module.exports = getAll;
