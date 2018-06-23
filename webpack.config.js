const path = require('path');
const WebpackNodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const commonConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
};

const serverConfig = Object.assign({}, commonConfig, {
  entry: './src/server/index.jsx',
  externals: [
    WebpackNodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
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
});

const clientConfig = Object.assign({}, commonConfig, {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'app.js',
  },
});

module.exports = [serverConfig, clientConfig];
