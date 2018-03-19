var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/static/js/app.js',
  output: {
    path: path.resolve(__dirname, 'src/static/js'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        include: __dirname + '/src/static/styles',
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss']
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

