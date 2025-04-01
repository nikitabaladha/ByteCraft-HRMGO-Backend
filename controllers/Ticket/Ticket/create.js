const TicketValidator = require("../../../validators/Ticket/TicketValidators");
const Ticket = require("../../../models/Ticket");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/NewTicketTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Employee = require("../../../models/Employee.js")

const createTicket = async (req, res) => {
  try {
    const { error } = TicketValidator(req.body);
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }
    const { title, employee_name, priority, description, status, end_date, newTicketToggle } =
      req.body;

    let attachment = null;

    if (req.files && req.files.attachment) {
      const TicketImagePath = "/Images/ticketAttachmentImages";
      attachment = `${TicketImagePath}/${req.files.attachment[0].filename}`;
    }

    const newTicket = new Ticket({
      title,
      employee_name,
      priority,
      description,
      attachment,
      status: status || "close",
      end_date: end_date || Date.now(),
      newTicketToggle,
    });

    // Save to the database
    await newTicket.save();

    if (newTicketToggle) {
     
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
        .replace("{ticket_title}", title)
        .replace("{ticket_name}", employee_name)
        .replace("{ticket_code}", newTicket.ticket_code) // Use newTicket.ticket_code here
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
      message: "Ticket created successfully!",
      ticket: newTicket,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({
      message: "Failed to create ticket.",
      error: error.message,
    });
  }
};

module.exports = createTicket;

