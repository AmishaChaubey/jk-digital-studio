const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Video = require('../models/Video');

router.get('/', async (req, res) => {
  try {
    const videos = await Video.findAll({ order: [['createdAt', 'DESC']] });
    res.json(videos);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/upload', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, service } = req.body;
    const videoUrl = `/uploads/videos/${req.files['video'][0].filename}`;
    const thumbnail = req.files['thumbnail']
      ? `/uploads/photos/${req.files['thumbnail'][0].filename}`
      : null;
    const video = await Video.create({ title, videoUrl, thumbnail, service });
    res.json({ success: true, video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Video.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;