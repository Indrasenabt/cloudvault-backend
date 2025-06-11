const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadFile, getMyFiles, deleteFile } = require('../controllers/fileController');

// 🔹 Main Upload Route
router.post('/upload', auth, upload.single('file'), uploadFile);

// 🔹 Get all files for logged-in user
router.get('/mine', auth, getMyFiles);

router.delete('/:id', auth, deleteFile);

// 🔹 Optional: basic route check
router.get('/test', (req, res) => {
  res.send('File route is working');
});

module.exports = router;
