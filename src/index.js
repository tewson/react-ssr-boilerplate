/* eslint-disable no-console */

/* eslint-disable-next-line import/no-extraneous-dependencies */
import browserSync from 'browser-sync';
import express from 'express';

const server = express();

const port = 3000;

server.get('/', (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        Hello world!
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
