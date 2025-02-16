const multer = require("multer");
const path = require("path");
const fs = require("fs");

const contractAttachmentDir = "./Images/contractAttachmentImages";

if (!fs.existsSync(contractAttachmentDir)) {
  fs.mkdirSync(contractAttachmentDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, contractAttachmentDir);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const originalName = path
        .parse(file.originalname)
        .name.replace(/[^a-zA-Z0-9]/g, "_");
      const extension = path.extname(file.originalname);
      cb(null, `${originalName}_${timestamp}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimeType = allowedFileTypes.test(file.mimetype);
    const extName = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, or PNG files are allowed"));
    }
  },
});

module.exports = upload;
