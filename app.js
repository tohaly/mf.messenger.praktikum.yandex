/* eslint-disable*/
const express = require('express');
const limiter = require('express-rate-limit');
const helmet = require('helmet');

const RATE_LIMIT_MESSAGE = 'Too many requests from the same IP, please try later';

const app = express();

const { PORT = 3000 } = process.env;

app.use(
  limiter({
    max: 100,
    message: { message: RATE_LIMIT_MESSAGE },
  })
);
app.use(express.static('./dist'));
app.get('*', function (req, res) {
  res.send('<h1 style="text-align: center">Error 404, not found!</h1>', 404);
});
app.listen(PORT, function () {
  console.log('\x1b[32m%s\x1b[0m', `Server working on port ${PORT}.`);
});
