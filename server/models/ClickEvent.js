const mongoose = require('mongoose');

const ClickEventSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true,
  },
  userAgent: {
    type: String,
  },
  ip: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('ClickEvent', ClickEventSchema);
