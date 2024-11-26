// const Designation = require("../../../models/Designation");
// const Department = require("../../../models/Department");
// const Branch = require("../../../models/Branch");

// async function getAll(req, res) {
//   try {
//     // Fetch all designations and populate the departmentId and branchId
//     const designations = await Designation.find()
//       .populate({
//         path: "departmentId", // Populate the departmentId
//         select: "departmentName branchId", // Only select relevant fields
//         populate: {
//           path: "branchId", // Populate the branchId inside the department
//           select: "branchName", // Select the branchName field
//         },
//       })
//       .select("designationName departmentId"); // Select only the required fields for designation

//     // Return the populated designations with department and branch names, including the designation id
//     return res.status(200).json({
//       message: "Designations fetched successfully!",
//       designations: designations.map((designation) => ({
//         id: designation._id, // Include the designation id
//         designationName: designation.designationName,
//         department: designation.departmentId.departmentName,
//         branch: designation.departmentId.branchId.branchName,
//       })),
//     });
//   } catch (error) {
//     console.error("Error fetching designations:", error);
//     return res.status(500).json({
//       message: "Failed to fetch designations.",
//       error: error.message,
//     });
//   }
// }

// module.exports = getAll;

const Designation = require("../../../models/Designation");
const Department = require("../../../models/Department");
const Branch = require("../../../models/Branch");

async function getAll(req, res) {
  try {
    // Fetch all designations and populate the departmentId and branchId
    const designations = await Designation.find()
      .populate({
        path: "departmentId", // Populate the departmentId
        select: "departmentName branchId", // Only select relevant fields
        populate: {
          path: "branchId", // Populate the branchId inside the department
          select: "branchName", // Select the branchName field
        },
      })
      .select("designationName departmentId"); // Select only the required fields for designation

    // Return the populated designations with department and branch names, including the designation id, department id, and branch id
    return res.status(200).json({
      message: "Designations fetched successfully!",
      designations: designations.map((designation) => ({
        id: designation._id, // Include the designation id
        designationName: designation.designationName,
        departmentId: designation.departmentId._id, // Include the department id
        departmentName: designation.departmentId.departmentName,
        branchId: designation.departmentId.branchId._id, // Include the branch id
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
