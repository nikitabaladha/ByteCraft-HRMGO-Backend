const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ticketAttachmentDir = "./Images/ticketAttachmentImages";

if (!fs.existsSync(ticketAttachmentDir)) {
  fs.mkdirSync(ticketAttachmentDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.body.type === 'attachment') {
        cb(null, ticketReplyAttachmentDir);
      } else {
        cb(null, ticketAttachmentDir);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueSuffix);
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
