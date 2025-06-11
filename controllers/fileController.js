const File = require('../models/File');

// Upload a file
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const file = await File.create({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      user: req.user,
    });

    res.status(201).json({
      msg: 'File uploaded successfully',
      file,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get files uploaded by the current user
exports.getMyFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user }).sort({ createdAt: -1 });

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const fs = require('fs');
const path = require('path');

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    // Check if file exists and belongs to the user
    if (!file || file.user.toString() !== req.user) {
      return res.status(404).json({ msg: 'File not found or unauthorized' });
    }

    // Delete from disk
    fs.unlink(path.resolve(file.path), async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ msg: 'Failed to delete file from disk' });
      }

      // Delete from DB
      await file.deleteOne();

      res.status(200).json({ msg: 'File deleted successfully' });
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
