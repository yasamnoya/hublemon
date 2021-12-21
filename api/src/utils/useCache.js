const redisClient = require('../config/redisClient');

const useCache = async (cacheKey, fn) => {
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const result = await fn();
  await redisClient.set(cacheKey, JSON.stringify(result));
  await redisClient.expire(cacheKey, process.env.REDIS_EXPIRE_TIME);

  return result;
};

module.exports = useCache;
