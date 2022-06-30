import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    shared: 'i18next',
  },
  output: {
    filename: '[name].bundle.js',
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
});
