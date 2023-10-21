const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
commentSchema.index({ username: 1, productId: 1 }, { unique: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
