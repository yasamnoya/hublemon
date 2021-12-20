const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

router.use('/wiwivideo', require('./wiwi-video.route'));
router.use('/odysee', require('./odysee.route'));
router.use('/youtube', require('./youtube.route'));

module.exports = router;
