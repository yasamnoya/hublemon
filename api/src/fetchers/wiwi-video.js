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

const getCommentReplies = async (videoId, commentId) => {
  const res = await axios.get(`https://wiwi.video/api/v1/videos/${videoId}/comment-threads/${commentId}`);
  return res.data.children;
};

const getVideoComments = async (videoId, start = 0, count = 25) => {
  const res = await axios.get(`https://wiwi.video/api/v1/videos/${videoId}/comment-threads`, {
    params: {
      start,
      count,
      sort: '-createdAt',
    },
  });

  // expand the replies
  const commentsWithReplies = await Promise.all(res.data.data.map(async (comment) => {
    if (!comment.totalReplies) return { comment, children: [] };

    const children = await getCommentReplies(videoId, comment.id);
    return {
      comment,
      children,
    };
  }));

  return {
    total: res.data.total,
    data: commentsWithReplies,
  };
};

module.exports = {
  getVideoList,
  getVideoDetails,
  getVideoComments,
};
