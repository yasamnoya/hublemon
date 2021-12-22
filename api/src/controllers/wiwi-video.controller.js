const wiwiVideoFetcher = require('../fetchers/wiwi-video');
const catchAsync = require('../utils/catchAsync');
const useCache = require('../utils/useCache');

const listVideos = catchAsync(async (req, res) => {
  const { start, count } = req.query;

  const cached = await useCache(`wiwivideo.listVideos, {start: ${start}, count: ${count}}`, async () => {
    const result = await wiwiVideoFetcher.getVideoList(start, count);
    const videos = result.data.map((video) => ({
      provider: 'wiwivideo',
      videoId: video.id,
      title: video.name,
      thumbnailUrl: `https://wiwi.video${video.previewPath}`,
      publishedAt: video.publishedAt,
    }));

    return {
      total: result.total,
      videos,
    };
  });

  res.send(cached);
});

const getVideoDetails = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  const cached = await useCache(`wiwivideo.getVideoDetails/${videoId}`, async () => {
    const result = await wiwiVideoFetcher.getVideoDetails(videoId);

    const video = {
      provider: 'wiwivideo',
      videoId: result.id,
      title: result.name,
      description: result.description,
      embedUrl: `https://wiwi.video${result.embedPath}`,
      publishedAt: result.publishedAt,
    };

    return video;
  });

  res.send(cached);
});

const listVideoComments = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { start, count } = req.query;

  const cached = await useCache(`wiwivideo.listVideosComments/${videoId}, {start: ${start}, count: ${count}}`, async () => {
    const result = await wiwiVideoFetcher.getVideoComments(videoId, start, count);

    const filteredData = result.data.filter((comment) => !comment.isDeleted);

    const comments = filteredData.map((comment) => ({
      provider: 'wiwivideo',
      commentId: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      replies: comment.totalReplies,
      author: {
        name: comment.account.name,
        avatarUrl: comment.account.avatar ? `https://wiwi.video${comment.account.avatar.path}` : null,
      },
      children: comment.children || [],
    }));

    return {
      total: result.total,
      comments,
    };
  });

  res.send(cached);
});

const extractReplies = (replies) => replies.filter((reply) => !reply.isDeleted).map((reply) => {
  let children = [];

  // if the reply has replies, then extract them
  if (reply.children.length) {
    children = extractReplies(reply.children);
  }

  return {
    provider: 'wiwivideo',
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
  const { start, count } = req.query;

  const cached = await useCache(`wiwivideo.listCommentReplies/${commentId}, {start: ${start}, count: ${count}}`, async () => {
    const result = await wiwiVideoFetcher.getCommentReplies(videoId, commentId, start, count);

    // result.children = replies of the comment
    const replies = extractReplies(result);
    return {
      total: replies.length,
      replies,
    };
  });

  res.send(cached);
});

module.exports = {
  listVideos,
  getVideoDetails,
  listVideoComments,
  listCommentReplies,
};
