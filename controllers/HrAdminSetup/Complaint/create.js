// controllers/Complaint/create.js
const Complaint = require("../../../models/Complaint");
const ComplaintValidator = require("../../../validators/HrAdminSetupValidators/Complaint.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require("../../../models/EmpComplaints.js");
const EmailSetting = require("../../../models/EmailSetting.js");
const CompanySettings = require("../../../models/CompanySetting.js");
const Employee = require("../../../models/Employee.js");

async function create(req, res) {
  try {
    const { error } = ComplaintValidator.ComplaintCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const {
      complaintFromId,
      complaintAgainstId,
      title,
      complaintDate,
      description,
      EmployeeComplaintToggle,
    } = req.body;

    const existingComplaint = await Complaint.findOne({
      complaintFromId,
      complaintAgainstId,
      complaintDate,
    });

    if (existingComplaint) {
      return res.status(400).json({
        hasError: true,
        message: "Complaint already exists for this employee",
      });
    }

    const newComplaint = new Complaint({
      complaintFromId,
      complaintAgainstId,
      title,
      complaintDate,
      description,
      EmployeeComplaintToggle,
    });

    await newComplaint.save();

    if (EmployeeComplaintToggle) {
      // Fetch employee details using employeeId
      const employee = await Employee.findById(complaintAgainstId);
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
        .replace("{employee_complaints_name}", employee.name)

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
      message: "Complaint created successfully",
      data: newComplaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = create;
