import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Notification from '../models/notificationModel.js';

const router = express.Router();

// Get notifications for the current user
router.get('/', protect, async (req, res) => {
  try {
    const query = req.user.store 
      ? { staff: req.user._id }
      : { user: req.user._id };

    const notifications = await Notification.find(query)
      .sort('-createdAt')
      .limit(10);

    res.json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create system notification
router.post('/system', protect, async (req, res) => {
  try {
    const { message, type = 'system', store } = req.body;
    
    const notification = await Notification.create({
      message,
      type,
      store,
      user: req.user.store ? null : req.user._id,
      staff: req.user.store ? req.user._id : null
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;