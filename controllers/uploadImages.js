const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");

// Directory to store uploaded contract attachment images
const contractAttachmentDir = "./Images/contractAttachmentImages";

// Ensure the directory exists, or create it
if (!fs.existsSync(contractAttachmentDir)) {
  fs.mkdirSync(contractAttachmentDir, { recursive: true });
}

// Configure multer with storage, limits, and file filter
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, contractAttachmentDir); // Directory to save files
    },
    filename: async (req, file, cb) => {
      try {
        const userId = req.user.id;

        let sanitizedUserName = "unknown_user";

        if (userId) {
          const user = await User.findById(userId); // Fetch user details
          if (user) {
            console.log(`User`, user);
            sanitizedUserName = `${user.firstName}_${user.lastName}`.replace(
              /[^a-zA-Z0-9]/g,
              "_"
            );
          }
        }

        // Generate the file name
        cb(
          null,
          `${sanitizedUserName}_${Date.now()}${path.extname(file.originalname)}`
        );
      } catch (error) {
        console.error("Error fetching user information:", error);
        cb(new Error("Failed to generate filename"));
      }
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/; // Allowed extensions
    const mimeType = allowedFileTypes.test(file.mimetype); // Validate MIME type
    const extName = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // Validate extension

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, or PNG files are allowed"));
    }
  },
});

module.exports = upload;
