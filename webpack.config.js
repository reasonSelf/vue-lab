const path = require('path');
const RemoveStrictPlugin = require('./removeStrictPlugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'static/js')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins: [
    new RemoveStrictPlugin()
  ],
};