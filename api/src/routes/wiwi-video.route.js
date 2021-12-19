const router = require('express').Router();
const { wiwiVideoController } = require('../controllers');

router.get('/videos', wiwiVideoController.listVideos);
router.get('/videos/:videoId', wiwiVideoController.getVideoDetails);
router.get('/videos/:videoId/comments', wiwiVideoController.listVideoComments);
router.get('/videos/:videoId/comments/:commentId/replies', wiwiVideoController.listCommentReplies);

module.exports = router;
