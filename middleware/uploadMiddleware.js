const multer = require('multer');
const path = require('path');

// Configure where and how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save in "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

// Filter file types if needed
const fileFilter = (req, file, cb) => {
  cb(null, true); // Accept all files
};

module.exports = multer({ storage, fileFilter });
