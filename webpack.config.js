import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: {
      import: './src/index.js',
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.join(path.resolve(), './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  performance: {
    hints: false,
  },
});
