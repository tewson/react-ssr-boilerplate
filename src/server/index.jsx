/* eslint-disable no-console */

/* eslint-disable-next-line import/no-extraneous-dependencies */
import browserSync from 'browser-sync';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../common/App';

const server = express();

const port = 3000;

server.use(express.static('dist/public'));

server.get('/', (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
        <script src="app.js"></script>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  if (process.env.NODE_ENV === 'development') {
    browserSync({
      files: ['src/**/*'],
      online: false,
      open: false,
      port: port + 1,
      proxy: `localhost:${port}`,
      ui: false,
    });
  }
});
