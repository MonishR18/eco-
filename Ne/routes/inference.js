const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const inferenceController = require('../controllers/inferenceController');

// Configure multer storage to save files to uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST /inference/infer - upload image and perform inference
router.post('/infer', upload.single('image'), inferenceController.infer);

module.exports = router;
