const Payroll = require("../../../models/Payroll");
const Employee = require("../../../models/Employee");
const Payrollvalidators = require("../../../validators/Payrollvalidators/Payrollvalidators.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require("../../../models/Payroll.js");
const EmailSetting = require("../../../models/EmailSetting.js");
const CompanySettings = require("../../../models/CompanySetting.js");

async function create(req, res) {
  const { error } = Payrollvalidators.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  const {
    employeeId,
    payrollType,
    salary,
    netSalary,
    status,
    paydate,
    newPayrollToggle,
  } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const payMonth = new Date(paydate).getMonth() + 1;
    const payYear = new Date(paydate).getFullYear();

    const newPayroll = new Payroll({
      employeeId,
      payrollType,
      salary,
      netSalary,
      status,
      paydate,
      month: payMonth,
      year: payYear,
      newPayrollToggle,
    });

    await newPayroll.save();

    if (newPayrollToggle) {
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
        .replace("{name}", employee.name)
        .replace("{payslip_email}", employee.email)
        .replace("{salary_month}", month);

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

    res.status(201).json({
      message: "Payroll record created successfully",
      data: newPayroll,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payroll record" });
  }
}

module.exports = create;
