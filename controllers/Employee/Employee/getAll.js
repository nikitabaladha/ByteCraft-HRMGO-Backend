// // HRMGO-Backend\controllers\Employee\Employee\getAll.js

// const Employee = require("../../../models/Employee");

// async function getAll(req, res) {
//   try {
//     const employees = await Employee.find()
//       .populate("branchId", "branchName")
//       .populate("departmentId", "departmentName")
//       .populate("designationId", "designationName");

//     // Map the employees to the desired format
//     const employeeData = employees.map((employee) => {
//       return {
//         _id: employee._id,
//         id: employee.id,
//         name: employee.name,
//         email: employee.email,
//         branchName: employee.branchId?.branchName, // Extract branchName from populated branchId
//         departmentName: employee.departmentId?.departmentName, // Extract departmentName from populated departmentId
//         designationName: employee.designationId?.designationName,
//         joiningDate: employee.joiningDate,
//         __v: employee.__v,
//       };
//     });

//     return res.status(200).json({
//       message: "Employees retrieved successfully!",
//       data: employeeData,
//       hasError: false,
//     });
//   } catch (error) {
//     console.error("Error retrieving employees:", error);
//     return res.status(500).json({
//       message: "Failed to retrieve employees.",
//       error: error.message,
//     });
//   }
// }

// module.exports = getAll;

const Employee = require("../../../models/Employee");

async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find()
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("designationId", "designationName");

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No employees found.",
      });
    }

    const formattedEmployees = employees.map((emp) => ({
      _id: emp._id,
      id: emp.id,
      name: emp.name,
      phone: emp.phone,
      dateOfBirth: emp.dateOfBirth,
      gender: emp.gender,
      email: emp.email,
      password: emp.password,
      address: emp.address,
      branchName: emp.branchId?.branchName || "N/A",
      departmentName: emp.departmentId?.departmentName || "N/A",
      designationName: emp.designationId?.designationName || "N/A",
      branchId: emp.branchId?._id,
      departmentId: emp.departmentId?._id,
      designationId: emp.designationId?._id,
      dateOfJoining: emp.dateOfJoining,
      employeePhotoUrl: emp.employeePhotoUrl,
      employeeCertificateUrl: emp.employeeCertificateUrl,
      employeeResumeUrl: emp.employeeResumeUrl,
      accountHolderName: emp.accountHolderName,
      accountNumber: emp.accountNumber,
      bankName: emp.bankName,
      bankIdentifierCode: emp.bankIdentifierCode,
      branchLocation: emp.branchLocation,
      taxPayerId: emp.taxPayerId,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Employees fetched successfully.",
      employees: formattedEmployees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch employees.",
      error: error.message,
    });
  }
}

module.exports = getAllEmployees;
