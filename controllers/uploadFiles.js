const multer = require("multer");
const path = require("path");
const fs = require("fs");
const employeePhotoDir = "./Images/employeePhoto";
const employeeCertificateDir = "./Documents/employeeCertificates";
const employeeResumeDir = "./Documents/employeeResume";
const logoDarkDir = "./Images/logoDark";
const logoLightDir = "./Images/logoLight";
const faviconDir = "./Images/favicon";
const profilePhotoDir = "./Images/profile";
const resumeCertificateDir = "./Documents/resume";
const profileImageDir = "./Images/profileImage";

if (!fs.existsSync(employeePhotoDir)) {
  fs.mkdirSync(employeePhotoDir, { recursive: true });
}
if (!fs.existsSync(employeeCertificateDir)) {
  fs.mkdirSync(employeeCertificateDir, { recursive: true });
}
if (!fs.existsSync(employeeResumeDir)) {
  fs.mkdirSync(employeeResumeDir, { recursive: true });
}
if (!fs.existsSync(logoDarkDir)) {
  fs.mkdirSync(logoDarkDir, { recursive: true });
}
if (!fs.existsSync(logoLightDir)) {
  fs.mkdirSync(logoLightDir, { recursive: true });
}
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}
if (!fs.existsSync(profilePhotoDir)) {
  fs.mkdirSync(profilePhotoDir, { recursive: true });
}
if (!fs.existsSync(resumeCertificateDir)) {
  fs.mkdirSync(resumeCertificateDir, { recursive: true });
}
if (!fs.existsSync(profileImageDir)) {
  fs.mkdirSync(profileImageDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "employeePhotoUrl") {
        cb(null, employeePhotoDir);
      } else if (file.fieldname === "employeeCertificateUrl") {
        cb(null, employeeCertificateDir);
      } else if (file.fieldname === "employeeResumeUrl") {
        cb(null, employeeResumeDir);
      } else if (file.fieldname === "logoDark") {
        cb(null, logoDarkDir);
      } else if (file.fieldname === "logoLight") {
        cb(null, logoLightDir);
      } else if (file.fieldname === "favicon") {
        cb(null, faviconDir);
      } else if (file.fieldname === "profile") {
        cb(null, profilePhotoDir);
      } else if (file.fieldname === "resume") {
        cb(null, resumeCertificateDir);
      } else if (file.fieldname === "profileImage") {
        cb(null, profileImageDir);
      } else {
        cb(new Error("Invalid file fieldname"));
      }
    },
    filename: (req, file, cb) => {
      try {
        const sanitizedFilename = file.originalname
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "_")
          .split(".")[0];
        cb(
          null,
          `${sanitizedFilename}_${Date.now()}${path.extname(file.originalname)}`
        );
      } catch (error) {
        console.error("Error generating filename:", error);
        cb(new Error("Failed to generate filename"));
      }
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "employeePhotoUrl") {
      const allowedFileTypes = /jpeg|jpg|png/;
      const mimeType = allowedFileTypes.test(file.mimetype);
      const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, or PNG files are allowed for employee photos"
          )
        );
      }
    } else if (file.fieldname === "employeeCertificateUrl") {
      const allowedFileTypes = /application\/pdf/;
      const mimeType = allowedFileTypes.test(file.mimetype);

      console.log("PDF upload - MIME Type:", file.mimetype);

      if (mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only PDF files are allowed for employee certificates"));
      }
    } else if (file.fieldname === "employeeResumeUrl") {
      const allowedFileTypes =
        /application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/;
      const mimeType = allowedFileTypes.test(file.mimetype);

      console.log("Resume upload - MIME Type:", file.mimetype);

      if (mimeType) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only PDF, DOC, or DOCX files are allowed for employee resumes"
          )
        );
      }
    } else if (file.fieldname === "logoDark") {
      const allowedFileTypes = /jpeg|jpg|png/;
      const mimeType = allowedFileTypes.test(file.mimetype);
      const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, or PNG files are allowed for employee photos"
          )
        );
      }
    } else if (file.fieldname === "logoLight") {
      const allowedFileTypes = /jpeg|jpg|png/;
      const mimeType = allowedFileTypes.test(file.mimetype);
      const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, or PNG files are allowed for employee photos"
          )
        );
      }
    } else if (file.fieldname === "favicon") {
      const allowedFileTypes = /jpeg|jpg|png/;
      const mimeType = allowedFileTypes.test(file.mimetype);
      const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, or PNG files are allowed for favico  photos"
          )
        );
      }
    } else if (file.fieldname === "profile") {
      const allowedFileTypes = /jpeg|jpg|png/;
      const mimeType = allowedFileTypes.test(file.mimetype);
      const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, or PNG files are allowed for employee photos"
          )
        );
      }
    } else if (file.fieldname === "resume") {
      const allowedFileTypes = /application\/pdf/;
      const mimeType = allowedFileTypes.test(file.mimetype);

      console.log("PDF upload - MIME Type:", file.mimetype);

      if (mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only PDF files are allowed for employee certificates"));
      }
    } else if (file.fieldname === "profileImage") {
      const allowedFileTypes = /jpeg|jpg|png/;
      const mimeType = allowedFileTypes.test(file.mimetype);
      const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, or PNG files are allowed for employee photos"
          )
        );
      }
    } else {
      cb(new Error("Invalid file fieldname"));
    }
  },
});

module.exports = upload;
