const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Service = require('../models/Service');

// GET - Saari services lao
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['createdAt', 'DESC']] });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Single service by slug (jaise /api/services/wedding)
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ where: { slug: req.params.slug } });
    if (!service) return res.status(404).json({ error: 'Service nahi mili' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Admin nayi service add kare
router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const { name, description} = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, ''); // "Baby Shoot" → "babyshoot"
    const coverImage = req.file ? `/uploads/photos/${req.file.filename}` : null;

    const service = await Service.create({ name, slug, description,coverImage });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Service update karo
router.put('/:id', upload.single('coverImage'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.file) {
      updateData.coverImage = `/uploads/photos/${req.file.filename}`;
    }

    await Service.update(updateData, { where: { id: req.params.id } });
    const updated = await Service.findByPk(req.params.id);
    res.json({ success: true, service: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Service delete karo
router.delete('/:id', async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Service delete ho gayi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;