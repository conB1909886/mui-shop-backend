const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { authMiddleWare } = require('../middleware/authMiddleware');

router.post('/create', CommentController.createComment);
router.put('/update/:id', authMiddleWare, CommentController.updateComment);
router.get('/get-details/:id', CommentController.getDetailsComment);
router.delete('/delete/:id', authMiddleWare, CommentController.deleteComment);
router.get('/get-all', CommentController.getAllComment);

module.exports = router;
