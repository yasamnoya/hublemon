const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.log('Redis redisClient Error', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
