const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    commentDate: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
