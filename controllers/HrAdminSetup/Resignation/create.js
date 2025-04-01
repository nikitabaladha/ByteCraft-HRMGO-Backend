const Resignation = require("../../../models/Resignation");
const ResignationValidator = require("../../../validators/HrAdminSetupValidators/Resignation");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/EmployeeResignationTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Employee = require("../../../models/Employee.js")

async function create(req, res) {
  try {
    const { error } = ResignationValidator.ResignationCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const { employeeId, resignationDate, lastWorkingDay, reason, EmpResignationToggle } = req.body;

    const newResignation = new Resignation({
      employeeId,
      resignationDate,
      lastWorkingDay,
      reason,
      EmpResignationToggle
    });

    await newResignation.save();

     if (EmpResignationToggle) {
          // Fetch employee details using employeeId
          const employee = await Employee.findById(employeeId);
          if (!employee) {
            console.error("Employee not found in the database");
            return res.status(404).json({ message: "Employee not found" });
          }
    
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
            .replace("{assign_user}", employee.name)
            .replace("{resignation_date}", lastWorkingDay)
            .replace("{notice_date}", resignationDate);
    
          const mailOptions = {
            from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress}>`,
            to: employee.email, 
            subject: emailTemplate.subject || "Award Notification",
            html: emailContent,
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              console.error("Error details:", {
                code: error.code,
                response: error.response,
                responseCode: error.responseCode,
              });
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }

    return res.status(201).json({
      hasError: false,
      message: "Resignation created successfully",
      data: newResignation,
    });
  } catch (error) {
    console.error("Error creating resignation:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message:
          "Resignation for this employee on the same date already exists.",
      });
    }

    return res.status(500).json({
      hasError: true,
      message: "Server error. Please try again later.",
    });
  }
}

module.exports = create;
