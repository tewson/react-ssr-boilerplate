const path = require('path');
const WebpackNodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const serverConfig = {
  entry: './src/index.js',
  externals: [
    WebpackNodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['nodemon dist/server.js'],
    }),
  ],
  target: 'node',
  watch: true,
};

module.exports = [serverConfig];
