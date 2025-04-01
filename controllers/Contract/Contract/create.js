const Contract = require("../../../models/Contract");
const ContractValidator = require("../../../validators/ContractValidators/ContractValidator");
const getAll = require("./getAll");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/ContractTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Employee = require("../../../models/Employee.js")

async function create(req, res) {
  try {
    const { error } = ContractValidator.ContractCreateValidator.validate(
      req.body
    );

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        hasError: true,
        message: errorMessages,
      });
    }

    const {
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
      description,
      contractToggle,
    } = req.body;

    const lastContract = await Contract.findOne().sort({ id: -1 }).limit(1);
    const lastContractId = lastContract ? lastContract.id : "CON0000000";
    const nextContractIdNumber =
      parseInt(lastContractId.replace("CON", "")) + 1;
    const nextContractId = `CON${nextContractIdNumber
      .toString()
      .padStart(7, "0")}`;

    const newContract = new Contract({
      id: nextContractId,
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
      description,
      contractToggle,
    });

    await newContract.save();

      if (contractToggle) {
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
                .replace("{contract_employee}", employee.name)
                .replace("{contract_subject}", subject)
                .replace("{contract_start_date}", startDate)
                .replace("{contract_end_date}", endDate)
        
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

    return getAll(req, res);
  } catch (error) {
    console.error("Error during creating Contract:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
