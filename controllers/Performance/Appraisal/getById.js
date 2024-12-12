const Appraisal = require("../../../models/Appraisal");

async function getById(req, res) {
  try {
    const { id } = req.params;

    const appraisal = await Appraisal.findById(id)
      .populate("branchId", "branchName")
      .populate("employeeId", "name")
      .populate({
        path: "indicatorId",
        select: "competencies",
      })
      .select("-__v");

    if (!appraisal) {
      return res.status(404).json({ message: "Appraisal not found" });
    }

    const appraisalData = {
      id: appraisal._id,
      branch: appraisal.branchId?.branchName,
      employee: appraisal.employeeId?.name,
      appraisalDate: appraisal.appraisalDate,
      appraisalCompetencies: appraisal.appraisalCompetencies,
      indicatorCompetencies: appraisal.indicatorId?.competencies,
    };

    return res.status(200).json({
      message: "Appraisal retrieved successfully!",
      data: appraisalData,
    });
  } catch (error) {
    console.error("Error retrieving appraisal:", error);
    return res.status(500).json({
      message: "Failed to retrieve appraisal.",
      error: error.message,
    });
  }
}

module.exports = getById;
