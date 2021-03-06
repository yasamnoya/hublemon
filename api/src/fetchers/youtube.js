const axios = require('axios');
const stringSimilarity = require('string-similarity');

const search = async (title) => {
  const res = await axios.get('https://youtube.googleapis.com/youtube/v3/search?', {
    params: {
      key: process.env.YOUTUBE_KEY,
      part: 'snippet',
      maxResults: 5,
      q: title,
    },
  });

  const videoList = Object.values(res.data.items);
  return videoList;
};

const filterOutTheVideo = (videoList, title) => {
  const filteredVideo = videoList.filter(
    (video) => stringSimilarity.compareTwoStrings(title, video.snippet.title) > 0.7,
  );
  return filteredVideo[0];
};

const getVideoDetails = async (title) => {
  const searchResults = await search(title);
  const videoDeatils = filterOutTheVideo(searchResults, title);
  return videoDeatils;
};

const getVideoComments = async (videoId, pageToken) => {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
    params: {
      key: process.env.YOUTUBE_KEY,
      part: 'snippet',
      videoId,
      pageToken,
    },
  });

  return res.data;
};

const getCommentReplies = async (commentId, pageToken) => {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/comments', {
    params: {
      key: process.env.YOUTUBE_KEY,
      part: 'id,snippet',
      parentId: commentId,
      pageToken,
    },
  });

  return res.data;
};

module.exports = {
  getVideoDetails,
  getVideoComments,
  getCommentReplies,
};
