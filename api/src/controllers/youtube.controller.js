const youtuberFetcher = require('../fetchers/youtube');
const catchAsync = require('../utils/catchAsync');

const getVideoDetails = catchAsync(async (req, res) => {
  const { videoTitle } = req.params;
  const result = await youtuberFetcher.getVideoDetails(videoTitle);

  const video = {
    videoId: result.id.videoId,
    title: result.snippet.tittle,
    description: result.snippet.description,
    embedUrl: `https://www.youtube.com/embed/${result.id.videoId}`,
    publishedAt: result.snippet.publishTime,
  };

  res.send(video);
});

const listVideoComments = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { pageToken } = req.query;
  const result = await youtuberFetcher.getVideoComments(videoId, pageToken);

  const comments = result.items.map((item) => ({
    commentId: item.id,
    text: item.snippet.topLevelComment.snippet.textOriginal,
    createdAt: item.snippet.topLevelComment.snippet.publishedAt,
    replies: item.snippet.totalReplyCount,
    author: {
      name: item.snippet.topLevelComment.snippet.authorDisplayName,
      avatarUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
    },
  }));

  res.send({
    nextPageToken: result.nextPageToken,
    comments,
  });
});

const listCommentReplies = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const { pageToken } = req.query;
  const result = await youtuberFetcher.getCommentReplies(commentId, pageToken);

  const replies = result.items.map((item) => ({
    commentId: item.id,
    text: item.snippet.textOriginal,
    createdAt: item.snippet.publishedAt,
    author: {
      name: item.snippet.authorDisplayName,
      avatarUrl: item.snippet.authorProfileImageUrl,
    },
  }));

  res.send({
    nextPageToken: result.nextPageToken,
    replies,
  });
});

module.exports = {
  getVideoDetails,
  listVideoComments,
  listCommentReplies,
};
