const Employee = require("../../../models/Employee");
const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");
const path = require("path");
const saltFunction = require("../../../validators/saltFunction.js");
async function create(req, res) {
  try {
    const { error } = EmployeeValidator.EmployeeCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const {
      name,
      phone,
      dateOfBirth,
      gender,
      email,
      password,
      address,
      branchId,
      departmentId,
      designationId,
      dateOfJoining,
      accountHolderName,
      accountNumber,
      bankName,
      bankIdentifierCode,
      branchLocation,
      taxPayerId,
    } = req.body;

    const existingEmployee = await Employee.findOne({
      email,
      branchId,
      departmentId,
      designationId,
    });

    if (existingEmployee) {
      return res.status(400).json({
        hasError: true,
        message:
          "Employee already exists with the same email, branch, department, and designation.",
      });
    }

    if (!req.files || !req.files.employeePhotoUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Employee Photo is required.",
      });
    }

    if (!req.files || !req.files.employeeCertificateUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Employee Certificate is required.",
      });
    }

    if (!req.files || !req.files.employeeResumeUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Employee Resume is required.",
      });
    }

    const employeeImagePath = "/Images/employeePhoto";
    const employeePhotoUrl = `${employeeImagePath}/${req.files.employeePhotoUrl[0].filename}`;

    const employeeCertificatePath = "/Documents/employeeCertificates";
    const employeeCertificateUrl = `${employeeCertificatePath}/${req.files.employeeCertificateUrl[0].filename}`;

    const employeeResumePath = "/Documents/employeeResume";
    const employeeResumeUrl = `${employeeResumePath}/${req.files.employeeResumeUrl[0].filename}`;

    const { hashedPassword, salt } = saltFunction.hashPassword(password);

    const lastEmployee = await Employee.findOne().sort({ id: -1 }).limit(1);
    const lastEmployeeId = lastEmployee ? lastEmployee.id : "EMP0000000";
    const nextEmployeeIdNumber =
      parseInt(lastEmployeeId.replace("EMP", "")) + 1;
    const nextEmployeeId = `EMP${nextEmployeeIdNumber
      .toString()
      .padStart(7, "0")}`;

    const newEmployee = new Employee({
      id: nextEmployeeId,
      name,
      phone,
      dateOfBirth,
      gender,
      email,
      password: hashedPassword,
      salt,
      address,
      branchId,
      departmentId,
      designationId,
      dateOfJoining,
      employeePhotoUrl,
      employeeCertificateUrl,
      employeeResumeUrl,
      accountHolderName,
      accountNumber,
      bankName,
      bankIdentifierCode,
      branchLocation,
      taxPayerId,
    });

    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully!",
      data: newEmployee,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      message: "Failed to create employee.",
      error: error.message,
    });
  }
}

module.exports = create;
