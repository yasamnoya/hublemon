const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

module.exports = router;
