// const Payroll = require("../../../models/EmployeeSetSalary");


// const updatePayDateForAllEmployees = async (req, res) => {
//   try {
//     const payrolls = await Payroll.find({ payDate: { $exists: false } });

//     if (payrolls.length === 0) {
//       return res.status(400).json({
//         message: "No employees found whose pay date needs to be generated.",
//       });
//     }

//     const updatedPayrolls = await Promise.all(
//       payrolls.map(async (payroll) => {
//         payroll.payDate = new Date();
//         await payroll.save();
//         return payroll;
//       })
//     );

//     res.status(200).json({
//       message: "Pay dates generated successfully for all employees.",
//       data: updatedPayrolls,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// module.exports = updatePayDateForAllEmployees;

const Payroll = require("../../../models/EmployeeSetSalary");
const Employee = require("../../../models/Employee");
const nodemailer = require("nodemailer");
const EmailTemplate = require("../../../models/NewPayrollTemplate.js");
const EmailSetting = require("../../../models/EmailSetting.js");
const CompanySettings = require("../../../models/CompanySetting.js");

const updatePayDateForAllEmployees = async (req, res) => {
  try {
    const { newPayrollToggle, payDate } = req.body;
    console.log('Request received with:', { newPayrollToggle, payDate });

    if (!payDate) {
      return res.status(400).json({ 
        success: false,
        message: "Pay date is required" 
      });
    }

    const payrolls = await Payroll.find({ payDate: { $exists: false } });
    console.log(`Found ${payrolls.length} payrolls needing update`);

    if (payrolls.length === 0) {
      return res.status(200).json({
        success: true,
        message: "All employees already have pay dates assigned.",
        data: []
      });
    }

    const updatedPayrolls = await Promise.all(
      payrolls.map(async (payroll) => {
        payroll.payDate = new Date(payDate);
        await payroll.save();
        return payroll;
      })
    );

    if (newPayrollToggle) {
      try {
        console.log('Fetching email settings...');
        const [companySettings, emailSetting, emailTemplate] = await Promise.all([
          CompanySettings.findOne({}),
          EmailSetting.findOne({}),
          EmailTemplate.findOne({})
        ]);

        // Log settings for debugging
        console.log('Company Settings:', companySettings);
        console.log('Email Settings:', {
          mailUsername: emailSetting?.mailUsername,
          mailFromName: emailSetting?.mailFromName,
          hasPassword: !!emailSetting?.mailPassword
        });
        console.log('Email Template:', {
          hasContent: !!emailTemplate?.content,
          subject: emailTemplate?.subject
        });

        if (!companySettings?.company_name) {
          throw new Error("Company settings not found or incomplete");
        }
        if (!emailSetting?.mailUsername || !emailSetting?.mailPassword) {
          throw new Error("Email settings not found or incomplete");
        }
        if (!emailTemplate?.content) {
          throw new Error("Email template not found or incomplete");
        }

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailSetting.mailUsername,
            pass: emailSetting.mailPassword,
          },
        });

        // Verify connection configuration
        try {
          console.log('Verifying SMTP connection...');
          await transporter.verify();
          console.log('SMTP connection verified successfully');
        } catch (verifyError) {
          console.error('SMTP verification failed:', verifyError);
          throw new Error('SMTP configuration is invalid');
        }

        const month = new Date().toLocaleString('default', { month: 'long' });
        const year = new Date().getFullYear();

        let emailCount = 0;
        let emailErrors = 0;

        await Promise.all(
          updatedPayrolls.map(async (payroll) => {
            try {
              const employee = await Employee.findById(payroll.employeeId);
              if (!employee?.email) {
                console.error(`No email for employee ${employee?._id || payroll.employeeId}`);
                return;
              }

              const emailContent = emailTemplate.content
                .replace("{app_name}", "HRMSync")
                .replace("{company_name}", companySettings.company_name)
                .replace("{name}", employee.name || "Employee")
                .replace("{payslip_email}", employee.email)
                .replace("{salary_month}", `${month} ${year}`);

              const mailOptions = {
                from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress || emailSetting.mailUsername}>`,
                to: employee.email,
                subject: emailTemplate.subject || "Your Payslip is Ready",
                html: emailContent,
              };

              console.log(`Attempting to send email to ${employee.email}`);
              await transporter.sendMail(mailOptions);
              console.log(`Email sent to ${employee.email}`);
              emailCount++;
            } catch (emailError) {
              console.error(`Error sending to ${employee?.email}:`, emailError);
              emailErrors++;
            }
          })
        );

        console.log(`Email sending complete. Success: ${emailCount}, Failures: ${emailErrors}`);

      } catch (emailConfigError) {
        console.error("Email configuration error:", emailConfigError);
        // Include this in the response
        return res.status(200).json({
          success: true,
          message: `Payslip generated but email sending failed: ${emailConfigError.message}`,
          data: updatedPayrolls
        });
      }
    }

    res.status(200).json({
      success: true,
      message: newPayrollToggle 
        ? "Payslip generated and notifications sent successfully." 
        : "Payslip generated successfully (no emails sent).",
      data: updatedPayrolls
    });

  } catch (error) {
    console.error("Error in updatePayDateForAllEmployees:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
};

module.exports = updatePayDateForAllEmployees;