const express = require('express');
const router  = express.Router();
const UserTrekStatus = require('../../models/userTrekStatus.js');

router.get('/', (req, res) => {
  res.render('dashboard', { title: 'User Dashboard' });
});

// Add a trek to the user's wishlist
router.post('/wishlist', async (req, res) => {
  try {
    const { userId, trekId } = req.body;
    const entry = await UserTrekStatus.create({
      user:   userId,
      trek:   trekId,
      status: 'wishlist'
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark a trek as completed 
router.post('/completed', async (req, res) => {
  try {
    const { userId, trekId } = req.body;
    const entry = await UserTrekStatus.findOneAndUpdate(
      { user: userId, trek: trekId },
      { status: 'completed', updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all wishlist items for a user
router.get('/wishlist/:userId', async (req, res) => {
  try {
    const list = await UserTrekStatus
      .find({ user: req.params.userId, status: 'wishlist' })
      .populate('trek');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all completed treks for a user
router.get('/completed/:userId', async (req, res) => {
  try {
    const list = await UserTrekStatus
      .find({ user: req.params.userId, status: 'completed' })
      .populate('trek');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:status/:userId/:trekId', async (req, res) => {
  try {
    const { status, userId, trekId } = req.params;
    await UserTrekStatus.findOneAndDelete({ user: userId, trek: trekId, status });
    res.json({ message: `${status} entry removed` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;