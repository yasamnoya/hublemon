const youtuberFetcher = require('../fetchers/youtube');
const catchAsync = require('../utils/catchAsync');
const useCache = require('../utils/useCache');

const getVideoDetails = catchAsync(async (req, res) => {
  const { videoTitle } = req.params;

  const cached = await useCache(`youtube.getVideoDetails/${videoTitle}`, async () => {
    const result = await youtuberFetcher.getVideoDetails(videoTitle);

    const video = {
      provider: 'youtube',
      videoId: result.id.videoId,
      title: result.snippet.tittle,
      description: result.snippet.description,
      embedUrl: `https://www.youtube.com/embed/${result.id.videoId}`,
      publishedAt: result.snippet.publishTime,
    };

    return video;
  });

  res.send(cached);
});

const listVideoComments = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { pageToken } = req.query;

  const cached = await useCache(`youtube.listVideoComments/${videoId}, {pageToken: ${pageToken}}`, async () => {
    const result = await youtuberFetcher.getVideoComments(videoId, pageToken);

    const comments = result.items.map((item) => ({
      provider: 'youtube',
      commentId: item.id,
      text: item.snippet.topLevelComment.snippet.textOriginal,
      createdAt: item.snippet.topLevelComment.snippet.publishedAt,
      replies: item.snippet.totalReplyCount,
      children: [],
      author: {
        name: item.snippet.topLevelComment.snippet.authorDisplayName,
        avatarUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      },
    }));

    return {
      nextPageToken: result.nextPageToken,
      comments,
    };
  });

  res.send(cached);
});

const listCommentReplies = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const { pageToken } = req.query;

  const cached = await useCache(`youtube.listCommentReplies/${commentId}, {pageToken: ${pageToken}}`, async () => {
    const result = await youtuberFetcher.getCommentReplies(commentId, pageToken);

    const replies = result.items.map((item) => ({
      provider: 'youtube',
      commentId: item.id,
      text: item.snippet.textOriginal,
      createdAt: item.snippet.publishedAt,
      // youtube doesn't support replying a reply
      replies: 0,
      children: [],
      author: {
        name: item.snippet.authorDisplayName,
        avatarUrl: item.snippet.authorProfileImageUrl,
      },
    }));

    return {
      nextPageToken: result.nextPageToken,
      replies,
    };
  });

  res.send(cached);
});

module.exports = {
  getVideoDetails,
  listVideoComments,
  listCommentReplies,
};
