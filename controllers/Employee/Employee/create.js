const Employee = require("../../../models/Employee");
const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");
const path = require("path");
const saltFunction = require("../../../validators/saltFunction.js");
const SystemSettings = require("../../../models/SystemSettings.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/NewEmployeeTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Branch = require("../../../models/Branch.js"); 
const Department = require("../../../models/Department.js"); 
const Designation = require("../../../models/Designation.js");

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
      newEmployeeToggle,
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

    const systemSettings = await SystemSettings.findOne();
    const employeePrefix = systemSettings?.employeePrefix;

    const lastEmployee = await Employee.findOne().sort({ id: -1 }).limit(1);
    const lastEmployeeId = lastEmployee
      ? parseInt(lastEmployee.id.replace(employeePrefix, "")) || 0
      : 0;
    const nextEmployeeId = lastEmployeeId + 1;

    const fullEmployeeId = `${employeePrefix}${nextEmployeeId}`;

    const newEmployee = new Employee({
      id: fullEmployeeId,
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
      newEmployeeToggle,
    });

    await newEmployee.save();

      if ( newEmployeeToggle) {
    
          const companySettings = await CompanySettings.findOne({});
          if (!companySettings) {
            console.error("Company settings not found in the database");
            return res.status(500).json({ message: "Company settings not found" });
          }
    
          const emailSetting = await EmailSetting.findOne({});
          if (!emailSetting) {
            console.error("Email settings not found in the database");
            return res.status(500).json({ message: "Email settings not found" });
          }

          const branch = await Branch.findById(branchId);
          const department = await Department.findById(departmentId);
          const designation = await Designation.findById(designationId);
    
          if (!branch || !department || !designation) {
            console.error("Branch, Department, or Designation not found");
            return res.status(500).json({ message: "Branch, Department, or Designation not found" });
          }
    
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailSetting.mailUsername,
              pass: emailSetting.mailPassword,
            },
          });
    
          const emailTemplate = await EmailTemplate.findOne({});
          if (!emailTemplate) {
            console.error("Email template not found in the database");
            return res.status(500).json({ message: "Email template not found" });
          }
    
          const emailContent = emailTemplate.content
            .replace("{app_name}", "HRMSync")
            .replace("{company_name}", companySettings.company_name)
            .replace("{employee_name}", name)
            .replace("{employee_email}", email)
            .replace("{employee_password}", password)
            .replace("{employee_branch}", branch.branchName) 
        .replace("{employee_department}", department.departmentName) 
        .replace("{employee_designation}", designation.designationName);
            // .replace("{app_name}", name)
            // .replace("{company_name}", companySettings.company_name);
    
          const mailOptions = {
            from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress}>`,
            to: email,
            subject: emailTemplate.subject || "Welcome to Our Platform",
            html: emailContent, 
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }

    return res.status(201).json({
      message: "Employee created successfully!",
      data: newEmployee,
      hasError: false,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: `An employee with the email "${email}" already exists in the specified branch, department, and designation.`,
      });
    }

    console.error("Error creating employee:", error);
    return res.status(500).json({
      message: "Failed to create employee.",
      error: error.message,
    });
  }
}

module.exports = create;
