const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

app.use(cors());

app.use(morgan('common'));

app.use(router);

app.use((err, req, res, next) => {
  console.warn(err);
  res.sendStatus(500);
});

module.exports = app;
