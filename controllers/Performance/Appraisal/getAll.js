const Appraisal = require("../../../models/Appraisal");
const Employee = require("../../../models/Employee");
const Branch = require("../../../models/Branch");
const Designation = require("../../../models/Designation");
const Department = require("../../../models/Department");

async function getAll(req, res) {
  try {
    const appraisals = await Appraisal.find()
      .populate({
        path: "employeeId",
        select: "name branchId departmentId designationId",
        populate: [
          {
            path: "branchId",
            select: "branchName",
          },
          {
            path: "departmentId",
            select: "departmentName",
          },
          {
            path: "designationId",
            select: "designationName",
          },
        ],
      })
      .populate("indicatorId", "overAllRating");

    const formattedResponse = appraisals.map((appraisal) => ({
      appraisalId: appraisal._id,
      branch: appraisal.employeeId.branchId.branchName,
      department: appraisal.employeeId.departmentId.departmentName,
      designation: appraisal.employeeId.designationId.designationName,
      employee: appraisal.employeeId.name,
      targetRating: appraisal.indicatorId.overAllRating,
      overallRating: appraisal.overAllRating,
      appraisalDate: appraisal.appraisalDate,
      remarks: appraisal.remarks,
      createdAt: appraisal.createdAt,
      updatedAt: appraisal.updatedAt,
    }));

    res.status(200).json({
      message: "Appraisals retrieved successfully",
      data: formattedResponse,
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = getAll;
