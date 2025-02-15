const multer = require("multer");
const path = require("path");
const fs = require("fs");
const employeePhotoDir = "./Images/employeePhoto";
const employeeCertificateDir = "./Documents/employeeCertificates";
const employeeResumeDir = "./Documents/employeeResume";

if (!fs.existsSync(employeePhotoDir)) {
  fs.mkdirSync(employeePhotoDir, { recursive: true });
}
if (!fs.existsSync(employeeCertificateDir)) {
  fs.mkdirSync(employeeCertificateDir, { recursive: true });
}
if (!fs.existsSync(employeeResumeDir)) {
  fs.mkdirSync(employeeResumeDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("filesize", file.size);
      if (file.fieldname === "employeePhotoUrl") {
        cb(null, employeePhotoDir);
      } else if (file.fieldname === "employeeCertificateUrl") {
        cb(null, employeeCertificateDir);
      } else if (file.fieldname === "employeeResumeUrl") {
        cb(null, employeeResumeDir);
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
  limits: {
    fileSize: function (req, file, cb) {
      if (file.fieldname === "employeePhotoUrl") {
        cb(null, 2 * 1024 * 1024); // 2 MB
      } else if (file.fieldname === "employeeCertificateUrl") {
        cb(null, 3 * 1024 * 1024); // 3 MB
      } else if (file.fieldname === "employeeResumeUrl") {
        cb(null, 3 * 1024 * 1024); // 3 MB
      } else {
        cb(new Error("Invalid file fieldname"));
      }
    },
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

module.exports = upload;
