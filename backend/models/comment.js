const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 140,
  },
  parentTwit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'twit',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', commentSchema);
