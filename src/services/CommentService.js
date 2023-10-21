const Comment = require("../models/CommentModel");

const createComment = (newComment) => {
  return new Promise(async (resolve, reject) => {
    const { username, content, productId, rating } = newComment;
    try {
      const newComment = await Comment.create({
        username,
        content,
        productId,
        rating,
      });
      if (newComment) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newComment,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateComment = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkComment = await Comment.findOne({
        _id: id,
      });
      if (checkComment === null) {
        resolve({
          status: "ERR",
          message: "The comment is not defined",
        });
      }

      const updatedComment = await Comment.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedComment,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkComment = await Comment.findOne({
        _id: id,
      });
      if (checkComment === null) {
        resolve({
          status: "ERR",
          message: "The comment is not defined",
        });
      }

      await Comment.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete comment success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyComment = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Comment.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete comment success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comment = await Comment.findOne({
        _id: id,
      });
      if (comment === null) {
        resolve({
          status: "ERR",
          message: "The comment is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: comment,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllComment = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalComment = await Comment.count();
      let allComment = [];
      if (filter) {
        const label = filter[0];
        let regex = new RegExp(`${filter[1]}`, "ig");
        const allObjectFilter = await Comment.find({
          [label]: { $regex: regex },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalComment,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalComment / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allCommentSort = await Comment.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allCommentSort,
          total: totalComment,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalComment / limit),
        });
      }
      if (!limit) {
        allComment = await Comment.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allComment = await Comment.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allComment,
        total: totalComment,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalComment / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createComment,
  updateComment,
  getDetailsComment,
  deleteComment,
  getAllComment,
  deleteManyComment,
};
