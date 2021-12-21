const wiwiVideoFetcher = require('../fetchers/wiwi-video');
const catchAsync = require('../utils/catchAsync');

const listVideos = catchAsync(async (req, res) => {
  const { start, count } = req.query;
  const result = await wiwiVideoFetcher.getVideoList(start, count);
  const videos = result.data.map((video) => ({
    videoId: video.id,
    title: video.name,
    thumbnailUrl: `https://wiwi.video${video.previewPath}`,
    publishedAt: video.publishedAt,
  }));

  res.send({
    total: result.total,
    videos,
  });
});

const getVideoDetails = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const result = await wiwiVideoFetcher.getVideoDetails(videoId);

  const video = {
    videoId: result.id,
    title: result.name,
    description: result.description,
    embedUrl: `https://wiwi.video${result.embedPath}`,
    publishedAt: result.publishedAt,
  };

  res.send(video);
});

const listVideoComments = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { start, count } = req.query;
  const result = await wiwiVideoFetcher.getVideoComments(videoId, start, count);

  const filteredData = result.data.filter((comment) => !comment.isDeleted);

  const comments = filteredData.map((comment) => ({
    commentId: comment.id,
    text: comment.text,
    createdAt: comment.createdAt,
    replies: comment.totalReplies,
    author: {
      name: comment.account.name,
      avatarUrl: comment.account.avatar ? `https://wiwi.video${comment.account.avatar.path}` : null,
    },
    children: comment.children,
  }));

  res.send({
    total: result.total,
    comments,
  });
});

const extractReplies = (replies) => replies.filter((reply) => !reply.isDeleted).map((reply) => {
  let children = [];

  // if the reply has replies, then extract them
  if (reply.children.length) {
    children = extractReplies(reply.children);
  }

  return {
    commentId: reply.id,
    text: reply.text,
    replies: reply.totalReplies,
    createdAt: reply.createdAt,
    author: {
      name: reply.account.name,
      avatarUrl: reply.account.avatar ? `https://wiwi.video${reply.account.avatar.path}` : null,
    },
    children,
  };
});

const listCommentReplies = catchAsync(async (req, res) => {
  const { videoId, commentId } = req.params;
  const result = await wiwiVideoFetcher.getCommentReplies(videoId, commentId);

  // result.children = replies of the comment
  const replies = extractReplies(result);
  res.send({
    total: replies.length,
    replies,
  });
});

module.exports = {
  listVideos,
  getVideoDetails,
  listVideoComments,
  listCommentReplies,
};
