const Appraisal = require("../../../models/Appraisal");
const Employee = require("../../../models/Employee");
const Branch = require("../../../models/Branch");
const Designation = require("../../../models/Designation");
const Department = require("../../../models/Department");
const Indicator = require("../../../models/Indicator");

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
      .populate({
        path: "indicatorId",
        select: "overAllRating competencies",
      });

    const formattedResponse = appraisals.map((appraisal) => ({
      id: appraisal._id,
      branch: appraisal.employeeId?.branchId?.branchName || "N/A",
      department: appraisal.employeeId?.departmentId?.departmentName || "N/A",
      designation:
        appraisal.employeeId?.designationId?.designationName || "N/A",
      employee: appraisal.employeeId?.name || "N/A",
      indicatorId: appraisal.indicatorId?._id || null,
      targetRating: appraisal.indicatorId?.overAllRating || null,
      overAllRating: appraisal.overAllRating || null,
      appraisalDate: appraisal.appraisalDate || null,
      remarks: appraisal.remarks || null,
      createdAt: appraisal.createdAt || null,
      updatedAt: appraisal.updatedAt || null,
      appraisalCompetencies: appraisal.appraisalCompetencies || null,
      indicatorCompetencies: appraisal.indicatorId?.competencies || null,
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
