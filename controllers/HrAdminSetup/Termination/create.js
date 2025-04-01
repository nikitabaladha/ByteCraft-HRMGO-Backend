const Termination = require("../../../models/Termination");

const TerminationValidator = require("../../../validators/HrAdminSetupValidators/Termination.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require("../../../models/EmpTermination.js");
const EmailSetting = require("../../../models/EmailSetting.js");
const CompanySettings = require("../../../models/CompanySetting.js");
const Employee = require("../../../models/Employee.js");
const TerminationType = require("../../../models/TerminationType.js");

async function create(req, res) {
  try {
    const { error } = TerminationValidator.TerminationCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const {
      employeeId,
      terminationTypeId,
      noticeDate,
      terminationDate,
      description,
      EmpTerminationToggle,
    } = req.body;

    const newTermination = new Termination({
      employeeId,
      terminationTypeId,
      noticeDate,
      terminationDate,
      description,
      EmpTerminationToggle,
    });

    await newTermination.save();

    if (EmpTerminationToggle) {
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

      const termination = await TerminationType.findById(terminationTypeId);

      const emailContent = emailTemplate.content
        .replace("{app_name}", "HRMSync")
        .replace("{company_name}", companySettings.company_name)
        .replace("{employee_termination_name}", employee.name)
        .replace("{notice_date}", noticeDate)
        .replace("{termination_date}", terminationDate)
        .replace("{termination_type}", termination.terminationName);

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
      message: "Termination created successfully",
      data: newTermination,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
