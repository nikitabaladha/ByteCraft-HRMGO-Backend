// const ManageLeave = require("../../../models/ManageLeave");

// async function updateStatus(req, res) {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const validStatuses = ["Approved", "Rejected", "Pending"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         message:
//           "Invalid status. Status must be one of: Approved, Rejected, Pending.",
//         hasError: true,
//       });
//     }

//     const updatedLeave = await ManageLeave.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!updatedLeave) {
//       return res.status(404).json({
//         message: "Leave application not found.",
//         hasError: true,
//       });
//     }

//     return res.status(200).json({
//       message: "Status updated successfully.",
//       data: updatedLeave,
//       hasError: false,
//     });
//   } catch (error) {
//     console.error("Error updating leave status:", error);
//     return res.status(500).json({
//       message: "Failed to update leave status.",
//       error: error.message,
//     });
//   }
// }

// module.exports = updateStatus;

const ManageLeave = require("../../../models/ManageLeave");
const nodemailer = require("nodemailer");
const EmailTemplate = require('../../../models/LeaveStatusTemplate.js'); 
const EmailSetting = require('../../../models/EmailSetting.js'); 
const CompanySettings = require("../../../models/CompanySetting.js")
const Employee = require("../../../models/Employee.js")
const LeaveType = require("../../../models/LeaveType.js")

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, LeaveStatusToggle = true } = req.body;

    const validStatuses = ["Approved", "Rejected", "Pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Status must be one of: Approved, Rejected, Pending.",
        hasError: true,
      });
    }

    const updatedLeave = await ManageLeave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('employeeId').populate('leaveTypeId');

    if (!updatedLeave) {
      return res.status(404).json({
        message: "Leave application not found.",
        hasError: true,
      });
    }

    // Send email notification only for Pending or Approved status
    if (LeaveStatusToggle && (status === "Rejected" || status === "Approved")) {
      const employee = updatedLeave.employeeId;
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
        .replace("{leave_email}", employee.email)
        .replace("{leave_status}", status)
        .replace("{leave_status}", status)
        .replace("{leave_status}", status)
        .replace("{leave_status_name}", employee.name)
        .replace("{leave_reason}", updatedLeave.reason)
        .replace("{leave_reason}", updatedLeave.reason)
        .replace("{leave_start_date}", updatedLeave.startDate.toISOString().split('T')[0])
        .replace("{leave_end_date}", updatedLeave.endDate.toISOString().split('T')[0])
        .replace("{total_leave_days}", updatedLeave.totalDays)
        .replace("{leave_type}", updatedLeave.leaveTypeId?.name || "");

      const mailOptions = {
        from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress}>`,
        to: employee.email,
        subject: emailTemplate.subject || `Your Leave Application has been ${status}`,
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

    return res.status(200).json({
      message: "Status updated successfully.",
      data: updatedLeave,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    return res.status(500).json({
      message: "Failed to update leave status.",
      error: error.message,
    });
  }
}

module.exports = updateStatus;