const axios = require('axios');

const getVideoList = async (start = 0, count = 25) => {
  const res = await axios.get('https://wiwi.video/api/v1/video-channels/nicelemon/videos', {
    params: {
      start,
      count,
      sort: '-publishedAt',
    },
  });
  return res.data;
};

const getVideoDetails = async (videoId) => {
  const res = await axios.get(`https://wiwi.video/api/v1/videos/${videoId}`);

  return res.data;
};

// {commnet, children} => {comment:{..., children}}
const restructureReplies = (replies) => replies.map((reply) => {
  if (!reply.children) return reply.comment;

  return {
    ...reply.comment,
    children: restructureReplies(reply.children),
  };
});

const getCommentReplies = async (videoId, commentId) => {
  const res = await axios.get(`https://wiwi.video/api/v1/videos/${videoId}/comment-threads/${commentId}`);
  return restructureReplies(res.data.children);
};

const getVideoComments = async (videoId, start = 0, count = 25) => {
  const res = await axios.get(`https://wiwi.video/api/v1/videos/${videoId}/comment-threads`, {
    params: {
      start,
      count,
      sort: '-createdAt',
    },
  });

  return res.data;
};

module.exports = {
  getVideoList,
  getVideoDetails,
  getVideoComments,
  getCommentReplies,
};
