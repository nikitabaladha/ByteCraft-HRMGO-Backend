const User = require("../../models/User");
const EmailTemplate = require('../../models/NewUserTemplate'); 
const EmailSetting = require('../../models/EmailSetting'); 
const saltFunction = require("../../validators/saltFunction.js");
const signupValidationSchema = require("../../validators/signupValidationSchema.js");
const nodemailer = require("nodemailer");
const CompanySettings = require("../../models/CompanySetting.js")

async function signup(req, res) {
  try {
    const { name, email, password, role, newUserToggle } = req.body;

    const { error } = signupValidationSchema.validate(req.body);
    if (error?.details?.length) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({
        hasError: true,
        message: "User already exists",
      });
    }

    let hashedPassword = null;
    let salt = null;
    if (password) {
      const passwordData = saltFunction.hashPassword(password);
      hashedPassword = passwordData.hashedPassword;
      salt = passwordData.salt;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword || undefined,
      passwordSwitch: !!password,
      role,
      salt: salt || "",
      profileImage: "/Images/profileImage/default_avatar.png",
    });

    if (newUserToggle) {

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
        .replace("{app_name}", name)
        .replace("{email}", email)
        .replace("{password}", password)
        .replace("{app_name}", name)
        .replace("{company_name}", companySettings.company_name);

      const mailOptions = {
        from: `"${emailSetting.mailFromName}" <${emailSetting.mailFromAddress}>`,
        to: email,
        subject: emailTemplate.subject || "Welcome to Our Platform",
        html: emailContent, 
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
    
    return res.status(200).json({
      hasError: false,
      message: "Signup successful",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = signup;