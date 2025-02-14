const Designation = require("../../../models/Designation");

async function getAll(req, res) {
  try {
    const designations = await Designation.find()
      .populate("branchId", "branchName branchId")
      .populate("departmentId", "departmentName departmentId");

    return res.status(200).json({
      message: "Designations fetched successfully!",
      data: designations,
    });
  } catch (error) {
    console.error("Error fetching designations:", error);

    return res.status(500).json({
      message: "Failed to fetch designations.",
      error: error.message,
    });
  }
}

module.exports = getAll;
