module.exports = {
  resolve: {
    extensions: [ '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js' ],
    modulesDirectories: [ 'node_modules' ],
  },
  devtool: 'source-map',
  entry: './src/app.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'pack.js',
  },
  module: {
    preloaders: [
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
    loaders: [
      { test: /\.(html?)$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(scss|sass)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.tsx?$/, loader: 'ts-loader?typescriptCompiler=jsx-typescript' },
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
};
