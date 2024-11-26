const Designation = require("../../../models/Designation");
const Department = require("../../../models/Department");
const Branch = require("../../../models/Branch");

async function getAll(req, res) {
  try {
    const designations = await Designation.find()
      .populate({
        path: "departmentId",
        select: "departmentName branchId",
        populate: {
          path: "branchId",
          select: "branchName",
        },
      })
      .select("designationName departmentId");

    return res.status(200).json({
      message: "Designations fetched successfully!",
      designations: designations.map((designation) => ({
        id: designation._id,
        designationName: designation.designationName,
        departmentId: designation.departmentId._id,
        departmentName: designation.departmentId.departmentName,
        branchId: designation.departmentId.branchId._id,
        branchName: designation.departmentId.branchId.branchName,
      })),
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
