module.exports = {
  resolve: {
    extensions: [ '', '.webpack.js', '.web.js', 'ts', '.js' ],
  },
  devtool: 'source-map',
  entry: './src/app.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'pack.js',
  },
  module: {
    preloaders: [
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
    loaders: [
      { test: /\.css$/, loader: 'styles!css' },
      { test: /\.(scss|sass)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.ts$/, loader: 'ts-loader?typescriptCompiler=jsx-typescript' },
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
};
