const AwardType = require("../../../models/AwardType");

async function getAll(req, res) {
  try {
    const awardTypes = await AwardType.find();

    if (awardTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Award Types found",
      });
    }
    return res.status(200).json({
      hasError: false,
      message: "Award Types fetched successfully",
      data: awardTypes,
    });
  } catch (error) {
    console.error("Error fetching award types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
