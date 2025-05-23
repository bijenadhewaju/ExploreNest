const mongoose = require('mongoose');

const userTrekStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trek: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trek',
    required: true,
  },
  status: {
    type: String,
    enum: ['wishlist', 'completed'],
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userTrekStatusSchema.index({ user: 1, trek: 1, status: 1 }, { unique: true });

const UserTrekStatus = mongoose.model('UserTrekStatus', userTrekStatusSchema);
module.exports = UserTrekStatus;
