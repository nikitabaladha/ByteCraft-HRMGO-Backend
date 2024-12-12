// const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");
// const Employee = require("../../../models/Employee");

// async function create(req, res) {
//   try {
//     const { error } = EmployeeValidator.validate(req.body);

//     if (error?.details?.length) {
//       const errorMessages = error.details.map((err) => err.message).join(", ");
//       return res.status(400).json({ message: errorMessages });
//     }

//     const { name, email, branchId, departmentId, designationId, joiningDate } =
//       req.body;

//     // Manually generate the employee ID before saving
//     const lastEmployee = await Employee.findOne().sort({ id: -1 }).limit(1);
//     const lastEmployeeId = lastEmployee ? lastEmployee.id : "EMP0000000";
//     const nextEmployeeIdNumber =
//       parseInt(lastEmployeeId.replace("EMP", "")) + 1;
//     const nextEmployeeId = `EMP${nextEmployeeIdNumber
//       .toString()
//       .padStart(7, "0")}`;

//     // Create a new employee instance
//     const newEmployee = new Employee({
//       id: nextEmployeeId,
//       name,
//       email,
//       branchId,
//       departmentId,
//       designationId,
//       joiningDate,
//     });

//     // Save the employee to the database
//     await newEmployee.save();

//     return res.status(201).json({
//       message: "Employee created successfully!",
//       employee: newEmployee,
//       hasError: false,
//     });
//   } catch (error) {
//     console.error("Error creating employee:", error);
//     return res.status(500).json({
//       message: "Failed to create employee.",
//       error: error.message,
//     });
//   }
// }

// module.exports = create;

// const Employee = require("../../../models/Employee");
// const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");
// const path = require("path");

// async function create(req, res) {
//   try {
//     // Validate the request body using Joi validator
//     const { error } = EmployeeValidator.EmployeeCreateValidator.validate(
//       req.body
//     );
//     if (error?.details?.length) {
//       const errorMessages = error.details.map((err) => err.message).join(", ");
//       return res.status(400).json({ message: errorMessages });
//     }

//     const {
//       name,
//       phone,
//       dateOfBirth,
//       gender,
//       email,
//       password,
//       address,
//       branchId,
//       departmentId,
//       designationId,
//       dateOfJoining,
//       employeeCertificateUrl,
//       employeeResumeUrl,
//       employeePhotoUrl,
//       accountHolderName,
//       accountNumber,
//       bankName,
//       bankIdentifierCode,
//       branchLocation,
//       taxPayerId,
//     } = req.body;

//     // Generate the next employee ID
//     const lastEmployee = await Employee.findOne().sort({ id: -1 }).limit(1);
//     const lastEmployeeId = lastEmployee ? lastEmployee.id : "EMP0000000";
//     const nextEmployeeIdNumber =
//       parseInt(lastEmployeeId.replace("EMP", "")) + 1;
//     const nextEmployeeId = `EMP${nextEmployeeIdNumber
//       .toString()
//       .padStart(7, "0")}`;

//     // Create a new employee instance
//     const newEmployee = new Employee({
//       id: nextEmployeeId,
//       name,
//       phone,
//       dateOfBirth,
//       gender,
//       email,
//       password,
//       address,
//       branchId,
//       departmentId,
//       designationId,
//       dateOfJoining,
//       employeeCertificateUrl,
//       employeeResumeUrl,
//       employeePhotoUrl,
//       accountHolderName,
//       accountNumber,
//       bankName,
//       bankIdentifierCode,
//       branchLocation,
//       taxPayerId,
//     });

//     // Save the employee to the database
//     await newEmployee.save();

//     return res.status(201).json({
//       message: "Employee created successfully!",
//       employee: newEmployee,
//       hasError: false,
//     });
//   } catch (error) {
//     console.error("Error creating employee:", error);
//     return res.status(500).json({
//       message: "Failed to create employee.",
//       error: error.message,
//     });
//   }
// }

// module.exports = create;

const Employee = require("../../../models/Employee");
const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");
const path = require("path");

async function create(req, res) {
  console.log("Received files:", req.files); // Debug uploaded files
  console.log("Request body:", req.body);
  try {
    // Validate the request body using Joi validator
    const { error } = EmployeeValidator.EmployeeCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Ensure files are available
    if (!req.files || !req.files.employeePhotoUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Employee Photo is required.",
      });
    }

    // Path to match your desired format
    const employeeImagePath = "/Images/employeePhoto";

    const employeePhotoUrl = `${employeeImagePath}/${req.files.employeePhotoUrl[0].filename}`; // Build the URL

    const employeeCertificatePath = "/Documents/employeeCertificates";

    const employeeCertificateUrl = `${employeeCertificatePath}/${req.files.employeeCertificateUrl[0].filename}`;

    const employeeResumePath = "/Documents/employeeResume";

    const employeeResumeUrl = `${employeeResumePath}/${req.files.employeeResumeUrl[0].filename}`;
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

    // Generate the next employee ID
    const lastEmployee = await Employee.findOne().sort({ id: -1 }).limit(1);
    const lastEmployeeId = lastEmployee ? lastEmployee.id : "EMP0000000";
    const nextEmployeeIdNumber =
      parseInt(lastEmployeeId.replace("EMP", "")) + 1;
    const nextEmployeeId = `EMP${nextEmployeeIdNumber
      .toString()
      .padStart(7, "0")}`;

    // Create a new employee instance
    const newEmployee = new Employee({
      id: nextEmployeeId,
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

    // Save the employee to the database
    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully!",
      employee: newEmployee,
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
