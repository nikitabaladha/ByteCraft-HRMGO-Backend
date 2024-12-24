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
      email: emp.email,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Employees fetched successfully.",
      data: formattedEmployees,
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