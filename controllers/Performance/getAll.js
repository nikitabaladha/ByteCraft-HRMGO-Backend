const Performance = require("../../models/Performance");
const Employee = require("../../models/Employee");
const User = require("../../models/User");
const Branch = require("../../models/Branch"); // Assuming Branch model is defined
const Department = require("../../models/Department"); // Assuming Department model is defined

async function getAll(req, res) {
  try {
    const performances = await Performance.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails",
      },
      {
        $lookup: {
          from: "branches",
          localField: "employeeDetails.branchId",
          foreignField: "_id",
          as: "branchDetails",
        },
      },
      {
        $unwind: "$branchDetails",
      },
      {
        $lookup: {
          from: "departments",
          localField: "employeeDetails.departmentId",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $unwind: "$departmentDetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "addedById",
          foreignField: "_id",
          as: "addedByDetails",
        },
      },
      {
        $unwind: "$addedByDetails",
      },
      {
        $project: {
          BranchName: "$branchDetails.branchName",
          DepartmentName: "$departmentDetails.departmentName",
          Designation: "$employeeDetails.designation",
          OverAllRating: "$overAllRating",
          AddedByName: {
            $concat: [
              "$addedByDetails.firstName",
              " ",
              "$addedByDetails.lastName",
            ],
          },
          CreatedAt: "$createdAt",
          EmployeeName: "$employeeDetails.name",
          TargetRating: "$targetRating",
          AppraisalDate: "$appraisalDate",
        },
      },
    ]);

    return res.status(200).json({
      message: "Performance records fetched successfully!",
      data: performances,
      hasError: false,
    });
  } catch (error) {
    console.error("Error fetching performance records:", error);
    return res.status(500).json({
      message: "Failed to fetch performance records.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = getAll;
