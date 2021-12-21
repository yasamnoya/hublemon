const odyseeFetcher = require('../fetchers/odysee');
const catchAsync = require('../utils/catchAsync');

const getVideoDetails = catchAsync(async (req, res) => {
  const { videoTitle } = req.params;
  let result = await odyseeFetcher.getVideoDetails(videoTitle);

  // sometimes the fetching fails
  if (!result) result = await odyseeFetcher.getVideoDetails(videoTitle);
  if (!result) result = await odyseeFetcher.getVideoDetails(videoTitle);

  const video = {
    claimId: result.claim_id,
    title: result.value.title,
    embedUrl: `https://odysee.com/$/embed/${result.name}`,
    publishedAt: new Date(result.timestamp).toISOString(),
  };

  res.send(video);
});

const listVideoComments = catchAsync(async (req, res) => {
  const { claimId } = req.params;
  const { page, pageSize } = req.query;
  const result = await odyseeFetcher.getVideoComments(claimId, page, pageSize);
  // res.send(result);

  const comments = result.result.items.map((item) => ({
    commentId: item.comment_id,
    text: item.comment,
    createdAt: new Date(item.timestamp).toISOString(),
    replies: item.replies,
    author: {
      name: item.channel.name,
      avatarUrl: item.channel.value.thumbnail ? item.channel.value.thumbnail.url : null,
    },
  }));

  res.send({
    total: result.result.total_items,
    comments,
  });
});

const listCommentReplies = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const { page, pageSize } = req.query;
  const result = await odyseeFetcher.getCommentReplies(commentId, page, pageSize);

  const replies = result.result.items.map((item) => ({
    commentId: item.comment_id,
    text: item.comment,
    replies: item.replies || 0,
    createdAt: new Date(item.timestamp).toISOString(),
    author: {
      name: item.channel.name,
      avatarUrl: item.channel.value.thumbnail ? item.channel.value.thumbnail.url : null,
    },
  }));

  res.send({
    total: result.result.total_items,
    replies,
  });
});

module.exports = {
  getVideoDetails,
  listVideoComments,
  listCommentReplies,
};
