module.exports = {
  resolve: {extensions: ['.js','.jsx']},
  entry: __dirname + '/client/src/index.jsx',
  module: {
    rules: [
      { 
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        ],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
    ]
  },
   output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist',
    // publicPath: 'http://localhost:3009/client/src/components'
  }
};