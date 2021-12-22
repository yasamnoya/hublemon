const odyseeFetcher = require('../fetchers/odysee');
const catchAsync = require('../utils/catchAsync');
const useCache = require('../utils/useCache');

const getVideoDetails = catchAsync(async (req, res) => {
  const { videoTitle } = req.params;

  const cached = await useCache(`odysee.getVideoDetails/${videoTitle}`, async () => {
    let result = await odyseeFetcher.getVideoDetails(videoTitle);

    // sometimes the fetching fails
    if (!result) result = await odyseeFetcher.getVideoDetails(videoTitle);
    if (!result) result = await odyseeFetcher.getVideoDetails(videoTitle);

    const video = {
      provider: 'odysee',
      claimId: result.claim_id,
      title: result.value.title,
      embedUrl: `https://odysee.com/$/embed/${result.name}`,
      publishedAt: new Date(result.timestamp).toISOString(),
    };

    return video;
  });

  res.send(cached);
});

const listVideoComments = catchAsync(async (req, res) => {
  const { claimId } = req.params;
  const { page, pageSize } = req.query;

  const cached = await useCache(`odysee.listVideoComments/${claimId}, {page: ${page}, pageSize: ${pageSize}}`, async () => {
    const result = await odyseeFetcher.getVideoComments(claimId, page, pageSize);

    const comments = result.result.items.map((item) => ({
      provider: 'odysee',
      commentId: item.comment_id,
      text: item.comment,
      createdAt: new Date(item.timestamp).toISOString(),
      replies: item.replies,
      children: [],
      author: {
        name: item.channel.name,
        avatarUrl: item.channel.value.thumbnail ? item.channel.value.thumbnail.url : null,
      },
    }));

    return {
      total: result.result.total_items,
      comments,
    };
  });

  res.send(cached);
});

const listCommentReplies = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const { page, pageSize } = req.query;

  const cached = await useCache(`odysee.listCommentReplies/${commentId}, {page: ${page}, pageSize: ${pageSize}}`, async () => {
    const result = await odyseeFetcher.getCommentReplies(commentId, page, pageSize);

    const replies = result.result.items.map((item) => ({
      provider: 'odysee',
      commentId: item.comment_id,
      text: item.comment,
      replies: item.replies || 0,
      children: [],
      createdAt: new Date(item.timestamp).toISOString(),
      author: {
        name: item.channel.name,
        avatarUrl: item.channel.value.thumbnail ? item.channel.value.thumbnail.url : null,
      },
    }));
    return {
      total: result.result.total_items,
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
