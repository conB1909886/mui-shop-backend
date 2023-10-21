const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
