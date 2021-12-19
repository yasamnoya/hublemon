const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

router.use('/wiwivideo', require('./wiwi-video.route'));

module.exports = router;
