const router = require('express').Router();
const { odyseeController } = require('../controllers');

router.get('/videos/:videoTitle', odyseeController.getVideoDetails);
router.get('/videos/:claimId/comments', odyseeController.listVideoComments);
router.get('/videos/:claimId/comments/:commentId/replies', odyseeController.listCommentReplies);

module.exports = router;
