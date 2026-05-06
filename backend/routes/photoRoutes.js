const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Photo = require('../models/Photo');

// Upload folder banao
if (!fs.existsSync('uploads/photos')) {
  fs.mkdirSync('uploads/photos', { recursive: true });
}

// Multer directly yahan define karo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/photos'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.findAll({ order: [['createdAt', 'DESC']] });
    res.json(photos);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/service/:slug', async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const photos = await Photo.findAll({
      where: { service: req.params.slug, pageType: { [Op.in]: ['service', 'both'] } },
      order: [['createdAt', 'DESC']]
    });
    res.json(photos);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/gallery/:slug', async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const photos = await Photo.findAll({
      where: { service: req.params.slug, pageType: { [Op.in]: ['gallery', 'both'] } },
      order: [['createdAt', 'DESC']]
    });
    res.json(photos);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File nahi mili' });
    const { title, service, pageType } = req.body;
    const photo = await Photo.create({
      title: title || '',
      service,
      pageType,
      imageUrl: `/uploads/photos/${req.file.filename}`
    });
    res.status(201).json(photo);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Photo.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;