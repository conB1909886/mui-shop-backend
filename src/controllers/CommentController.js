const CommentService = require('../services/CommentService');

const createComment = async (req, res) => {
  try {
    const { username, content, productId } = req.body;
    if (!username || !content || !productId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    }
    const response = await CommentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const data = req.body;
    if (!commentId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The commentId is required',
      });
    }
    const response = await CommentService.updateComment(commentId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The commentId is required',
      });
    }
    const response = await CommentService.getDetailsComment(commentId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The productId is required',
      });
    }
    const response = await CommentService.deleteComment(commentId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The ids is required',
      });
    }
    const response = await CommentService.deleteManyComment(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllComment = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await CommentService.getAllComment(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter,
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createComment,
  updateComment,
  getDetailsComment,
  deleteComment,
  getAllComment,
  deleteMany,
};
