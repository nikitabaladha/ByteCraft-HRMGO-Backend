// const Award = require("../../../models/Award");
// const AwardValidator = require("../../../validators/HrAdminSetupValidators/Award.js");
// const nodemailer = require("nodemailer");
// const EmailTemplate = require('../../../models/NewTicketTemplate.js'); 
// const EmailSetting = require('../../../models/EmailSetting.js'); 
// const CompanySettings = require("../../../models/CompanySetting.js")
// const Employee = require("../../../models/Employee.js")

// async function create(req, res) {
//   try {
//     const { error } = AwardValidator.AwardCreateValidator.validate(req.body);

//     if (error?.details?.length) {
//       const errorMessages = error.details.map((err) => err.message).join(", ");
//       return res.status(400).json({ message: errorMessages });
//     }

//     const { employeeId, awardTypeId, date, gift, description, newAwardToggle } = req.body;

//     const newAward = new Award({
//       employeeId,
//       awardTypeId,
//       date,
//       gift,
//       description,
//       newAwardToggle,
//     });

//     await newAward.save();

//       if (newTicketToggle) {
         
//           const employee = await Employee.findOne({ name: employee_name });
//           if (!employee) {
//             console.error("Employee not found in the database");
//             return res.status(404).json({ message: "Employee not found" });
//           }
    
//           const companySettings = await CompanySettings.findOne({});
//           if (!companySettings) {
//             console.error("Company settings not found in the database");
//             return res.status(500).json({ message: "Company settings not found" });
//           }
    
//           const emailSetting = await EmailSetting.findOne({});
//           if (!emailSetting) {
//             console.error("Email settings not found in the database");
//             return res.status(500).json({ message: "Email settings not found" });
//           }
    
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: emailSetting.mailUsername,
//               pass: emailSetting.mailPassword,
//             },
//           });
    
//           const emailTemplate = await EmailTemplate.findOne({});
//           if (!emailTemplate) {
//             console.error("Email template not found in the database");
//             return res.status(500).json({ message: "Email template not found" });
//           }
    
//           const emailContent = emailTemplate.content
//             .replace("{app_name}", "HRMSync")
//             .replace("{company_name}", companySettings.company_name)
//             // .replace("{ticket_title}", title)
//             .replace("{award_name}", employee_name)
//             // .replace("{ticket_code}", newTicket.ticket_code) // Use newTicket.ticket_code here
//             // .replace("{ticket_description}", description);
    
//           const mailOptions = {
//             from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress}>`,
//             to: employee.email, // Use employee's email here
//             subject: emailTemplate.subject || "Welcome to Our Platform",
//             html: emailContent,
//           };
    
//           // Send email with detailed error handling
//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error("Error sending email:", error);
//               console.error("Error details:", {
//                 code: error.code,
//                 response: error.response,
//                 responseCode: error.responseCode,
//               });
//             } else {
//               console.log("Email sent:", info.response);
//             }
//           });
//         }

//     return res.status(201).json({
//       hasError: false,
//       message: "Award created successfully",
//       data: newAward,
//     });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// }

// module.exports = create;

const Award = require("../../../models/Award");
const AwardValidator = require("../../../validators/HrAdminSetupValidators/Award.js");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/NewAwardTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Employee = require("../../../models/Employee.js")

async function create(req, res) {
  try {
    const { error } = AwardValidator.AwardCreateValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { employeeId, awardTypeId, date, gift, description, newAwardToggle } = req.body;

    const newAward = new Award({
      employeeId,
      awardTypeId,
      date,
      gift,
      description,
      newAwardToggle,
    });

    await newAward.save();

    if (newAwardToggle) {
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
        .replace("{award_name}", employee.name)
        .replace("{award_name}", employee.name);

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
      message: "Award created successfully",
      data: newAward,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
