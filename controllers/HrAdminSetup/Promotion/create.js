// controllers/Promotion/create.js
const Promotion = require("../../../models/Promotion");

const PromotionValidator = require("../../../validators/HrAdminSetupValidators/Promotion.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require("../../../models/EmpPromotion.js");
const EmailSetting = require("../../../models/EmailSetting.js");
const CompanySettings = require("../../../models/CompanySetting.js");
const Employee = require("../../../models/Employee.js");
const Designation = require("../../../models/Designation.js");

async function create(req, res) {
  try {
    const { error } = PromotionValidator.PromotionCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const {
      employeeId,
      designationId,
      promotionTitle,
      promotionDate,
      description,
      EmpPromotionToggle,
    } = req.body;

    const existingPromotion = await Promotion.findOne({
      employeeId,
      designationId,
      promotionDate,
    });

    if (existingPromotion) {
      return res.status(400).json({
        hasError: true,
        message:
          "Promotion already exists for this employee and designation on this date.",
      });
    }

    const newPromotion = new Promotion({
      employeeId,
      designationId,
      promotionTitle,
      promotionDate,
      description,
      EmpPromotionToggle,
    });

    await newPromotion.save();

    if (EmpPromotionToggle) {
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

      const designation = await Designation.findById(designationId);

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
        .replace("{employee_promotion_name}", employee.name)
        .replace("{promotion_designation}", designation.designationName)
        .replace("{promotion_title}", promotionTitle)
        .replace("{promotion_date}", promotionDate)

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
      message: "Promotion created successfully",
      data: newPromotion,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
