require('dotenv').config();
const express = require('express');
const agradon = require('agradon');
const log = require('agradon/log')({ file: __filename });

const app = express();

app.use(require('cors')());

agradon
  .init({
    app,
    rootPath: '/api',
    auth: {
      strategies: require('./strategies')
    }
  })
  .then(() => {
    app.use('**', (req, res) => {
      res.status(404).send('Not Found');
    });

    app.listen(process.env.PORT, () => log.info(`Server is listening on port ${process.env.PORT}`));
  });

module.exports = app;
