const Employee = require("../../../models/Employee");
const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");

async function update(req, res) {
  try {
    const { id } = req.params;

    const { error } = EmployeeValidator.EmployeeUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const existingEmployee = await Employee.findById(id);

    if (!existingEmployee) {
      return res.status(404).json({
        hasError: true,
        message: "Employee not found.",
      });
    }

    const {
      name,
      phone,
      dateOfBirth,
      gender,
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

    if (req.files) {
      if (req.files.employeePhotoUrl) {
        existingEmployee.employeePhotoUrl = `/Images/employeePhoto/${req.files.employeePhotoUrl[0].filename}`;
      }
      if (req.files.employeeCertificateUrl) {
        existingEmployee.employeeCertificateUrl = `/Documents/employeeCertificates/${req.files.employeeCertificateUrl[0].filename}`;
      }
      if (req.files.employeeResumeUrl) {
        existingEmployee.employeeResumeUrl = `/Documents/employeeResume/${req.files.employeeResumeUrl[0].filename}`;
      }
    }

    existingEmployee.name = name || existingEmployee.name;
    existingEmployee.phone = phone || existingEmployee.phone;
    existingEmployee.dateOfBirth = dateOfBirth || existingEmployee.dateOfBirth;
    existingEmployee.gender = gender || existingEmployee.gender;
    existingEmployee.address = address || existingEmployee.address;
    existingEmployee.branchId = branchId || existingEmployee.branchId;
    existingEmployee.departmentId =
      departmentId || existingEmployee.departmentId;
    existingEmployee.designationId =
      designationId || existingEmployee.designationId;
    existingEmployee.dateOfJoining =
      dateOfJoining || existingEmployee.dateOfJoining;
    existingEmployee.accountHolderName =
      accountHolderName || existingEmployee.accountHolderName;
    existingEmployee.accountNumber =
      accountNumber || existingEmployee.accountNumber;
    existingEmployee.bankName = bankName || existingEmployee.bankName;
    existingEmployee.bankIdentifierCode =
      bankIdentifierCode || existingEmployee.bankIdentifierCode;
    existingEmployee.branchLocation =
      branchLocation || existingEmployee.branchLocation;
    existingEmployee.taxPayerId = taxPayerId || existingEmployee.taxPayerId;

    await existingEmployee.save();

    return res.status(200).json({
      hasError: false,
      message: "Employee updated successfully!",
      data: existingEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to update employee.",
      error: error.message,
    });
  }
}

module.exports = update;