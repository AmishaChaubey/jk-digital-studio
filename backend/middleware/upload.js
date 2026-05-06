const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
['uploads/photos', 'uploads/videos'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith('video') ? 'uploads/videos' : 'uploads/photos';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
});

module.exports = upload;