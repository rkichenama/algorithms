module.exports = {
  resolve: {
    extensions: [ '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js' ],
    modulesDirectories: [ 'node_modules' ],
  },
  devtool: 'inline-source-map',
  entry: './src/app.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'pack.js',
  },
  module: {
    // postLoaders: [
    //   {
    //     test: /\.js$/,
    //     include: __dirname + 'src/',
    //     loader: 'istanbul-instrumenter'
    //   }
    // ],
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
