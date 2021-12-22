const axios = require('axios');
const stringSimilarity = require('string-similarity');

// returns claimId and lbry url
const search = async (title) => {
  const resSearch = await axios.get('https://lighthouse.odysee.com/search', {
    params: {
      from: 0,
      size: 5,
      s: title,
    },
  });
  return resSearch.data;
};

const resolveSearchResults = async (results) => {
  const urls = results.map((result) => `lbry://${result.name}#${result.claimId}`);
  const res = await axios.post('https://api.na-backend.odysee.com/api/v1/proxy?m=resolve', {
    jsonrpc: '2.0',
    method: 'resolve',
    params: { urls },
  });

  const videoList = Object.values(res.data.result);
  return videoList;
};

const filterOutTheVideo = (videoList, title) => {
  const filteredVideo = videoList.filter(
    (video) => stringSimilarity.compareTwoStrings(title, video.value.title) > 0.7,
  );
  return filteredVideo[0];
};

const getVideoDetails = async (title) => {
  const searchResults = await search(title);
  const videoList = await resolveSearchResults(searchResults);
  const videoDetails = filterOutTheVideo(videoList, title);
  return videoDetails;
};

const expandCommentsChannels = async (items) => Promise.all(items.map(async (item) => {
  // filter out the properties
  const {
    channel_id, channel_name, channel_url: channelUrl, ...comment
  } = item;

  const channelDetails = await resolveChannel(channelUrl);

  return {
    ...comment,
    channel: channelDetails,
  };
}));

const getCommentReplies = async (commentId, page = 1, pageSize = 10) => {
  const res = await axios.post('https://comments.odysee.com/api/v2?m=comment.List', {
    jsonrpc: '2.0',
    id: 1,
    method: 'comment.List',
    params: {
      page,
      page_size: pageSize,
      parent_id: commentId,
      top_level: false,
      sort_by: 1,
    },
  });

  res.data.result.items = await expandCommentsChannels(res.data.result.items);
  return res.data;
};

// // recursively retrive the replies of comments
// const retrieveReplies = async (comments) => {
//   const commentsWithReplies = await Promise.all(comments.result.items.map(async (comment) => {
//     if (!comment.replies) return comment;

//     const resReplies = await getCommentReplies(comment.comment_id);

//     return {
//       ...comment,
//       children: await retrieveReplies(resReplies.data),
//     };
//   }));

//   const commentsCopy = comments;
//   commentsCopy.result.items = commentsWithReplies;
//   return commentsCopy;
// };

const resolveChannel = async (channelUrl) => {
  const res = await axios.post('https://api.na-backend.odysee.com/api/v1/proxy?m=resolve', {
    jsonrpc: '2.0',
    method: 'resolve',
    params: { urls: [channelUrl] },
  });

  return Object.values(res.data.result)[0];
};

const getVideoComments = async (claimId, page = 1, pageSize = 10) => {
  const res = await axios.post('https://comments.odysee.com/api/v2?m=comment.List', {
    jsonrpc: '2.0',
    id: 1,
    method: 'comment.List',
    params: {
      page,
      page_size: pageSize,
      claim_id: claimId,
      top_level: true,
      sort_by: 3,
    },
  });

  res.data.result.items = await expandCommentsChannels(res.data.result.items);
  return res.data;
};

module.exports = {
  getVideoDetails,
  getVideoComments,
  getCommentReplies,
};
