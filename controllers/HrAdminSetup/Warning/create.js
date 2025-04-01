const Warning = require("../../../models/Warning");
const WarningValidator = require("../../../validators/HrAdminSetupValidators/Warning.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/EmpWarning.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Employee = require("../../../models/Employee.js")

async function create(req, res) {
  try {
    const { error } = WarningValidator.WarningCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const { warningById, warningToId, subject, warningDate, description, EmpWarningToggle } =
      req.body;

    const existingWarning = await Warning.findOne({
      warningById,
      warningToId,
      warningDate,
    });

    if (existingWarning) {
      return res.status(400).json({
        hasError: true,
        message: "Warning already exists for this employee",
      });
    }

    const newWarning = new Warning({
      warningById,
      warningToId,
      subject,
      warningDate,
      description,
      EmpWarningToggle
    });

    await newWarning.save();

     if (EmpWarningToggle) {
          // Fetch employee details using employeeId
          const employee = await Employee.findById(warningToId);
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
            .replace("{employee_warning_name}", employee.name)
            .replace("{warning_subject}", subject)
            .replace("{warning_description}", description)
    
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
      message: "Warning created successfully",
      data: newWarning,
    });
  } catch (error) {
    console.error("Error creating Warning:", error);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = create;
