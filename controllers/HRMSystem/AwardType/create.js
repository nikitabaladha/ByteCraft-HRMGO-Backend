const AwardType = require("../../../models/AwardType");
const Employee = require("../../../models/Employee");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/NewEmployeeTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")

async function create(req, res) {
  try {
    const { awardName, newAwardToggle } = req.body;

    if (!awardName) {
      return res.status(400).json({ message: "Award Type Name is required." });
    }

    const newAwardType = new AwardType({
      awardName, newAwardToggle
    });

    await newAwardType.save();

     if (newTicketToggle) {
          // Fetch employee email using employee_name (which is actually the name field in Employee model)
          const employee = await Employee.findOne({ name: employee_name });
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
            // .replace("{ticket_title}", title)
            .replace("{award_name}", employee_name)
            // .replace("{ticket_code}", newTicket.ticket_code) // Use newTicket.ticket_code here
            .replace("{ticket_description}", description);
    
          const mailOptions = {
            from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress}>`,
            to: employee.email, // Use employee's email here
            subject: emailTemplate.subject || "Welcome to Our Platform",
            html: emailContent,
          };
    
          // Send email with detailed error handling
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
      message: "Award Type created successfully!",
      awardType: newAwardType,
    });
  } catch (error) {
    console.error("Error creating award type:", error);
    return res.status(500).json({
      message: "Failed to create award type.",
      error: error.message,
    });
  }
}

module.exports = create;
