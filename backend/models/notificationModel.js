import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['system', 'alert', 'info'],
    default: 'info'
  },
  read: {
    type: Boolean,
    default: false
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;