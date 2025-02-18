const multer = require("multer");
const path = require("path");
const fs = require("fs");

const messageFilePDFDir = "./Documents/MessageFile";
const messageFileImageDir = "./Images/MessageFile";

if (!fs.existsSync(messageFilePDFDir)) {
  fs.mkdirSync(messageFilePDFDir, { recursive: true });
}

if (!fs.existsSync(messageFileImageDir)) {
  fs.mkdirSync(messageFileImageDir, { recursive: true });
}

const messageFilesUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "messageFile") {
        if (file.mimetype.startsWith("image/")) {
          cb(null, messageFileImageDir);
        } else if (file.mimetype === "application/pdf") {
          cb(null, messageFilePDFDir);
        } else {
          cb(new Error("Invalid file type for messageFile"));
        }
      } else {
        cb(new Error("Invalid fieldname"));
      }
    },

    filename: (req, file, cb) => {
      try {
        // Use the original filename, sanitize to avoid issues with special characters
        const sanitizedFilename = file.originalname
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, "_");
        cb(
          null,
          `${sanitizedFilename}` // Save with the original filename
        );
      } catch (error) {
        cb(new Error("Failed to generate filename"));
      }
    },
  }),

  limits: { fileSize: 2 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    if (file.fieldname === "messageFile") {
      const allowedImageTypes = /jpeg|jpg|png/;
      const allowedPdfType = /application\/pdf/;

      if (
        allowedImageTypes.test(file.mimetype) ||
        allowedPdfType.test(file.mimetype)
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPEG, JPG, PNG, or PDF files are allowed for Message File"
          )
        );
      }
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
});

module.exports = messageFilesUpload;
