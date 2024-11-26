// const Department = require("../../../models/Department");

// async function getAll(req, res) {
//   try {
//     // Fetch all departments
//     const departments = await Department.find();

//     if (departments.length === 0) {
//       return res.status(404).json({
//         hasError: true,
//         message: "No Department found",
//       });
//     }

//     return res.status(200).json({
//       hasError: false,
//       message: "Departments fetched successfully",
//       data: departments,
//     });
//   } catch (error) {
//     console.error("Error fetching departments:", error.message);
//     return res.status(500).json({
//       hasError: true,
//       message: "Server error",
//     });
//   }
// }

// module.exports = getAll;

const Department = require("../../../models/Department");

async function getAll(req, res) {
  try {
    // Fetch all departments and populate the branchId to include branchName
    const departments = await Department.find()
      .populate({
        path: "branchId", // Populate the branchId
        select: "branchName", // Select only the branchName field
      })
      .select("departmentName branchId"); // Select only the required fields for department

    if (departments.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No departments found",
      });
    }

    // Return the departments with the departmentName and branchName
    return res.status(200).json({
      hasError: false,
      message: "Departments fetched successfully",
      data: departments.map((department) => ({
        id: department._id,
        departmentName: department.departmentName,
        branchId: department.branchId._id,
        branchName: department.branchId.branchName,
      })),
    });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
