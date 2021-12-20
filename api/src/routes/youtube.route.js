const router = require('express').Router();
const { youtubeController } = require('../controllers');

router.get('/videos/:videoTitle', youtubeController.getVideoDetails);
router.get('/videos/:videoId/comments', youtubeController.listVideoComments);
router.get('/videos/:videoId/comments/:commentId/replies', youtubeController.listCommentReplies);

module.exports = router;
