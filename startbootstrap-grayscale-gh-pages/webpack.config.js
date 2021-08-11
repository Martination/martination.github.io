const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // vendor: ['bootstrap'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HTML Loading',
      template: 'src/index.html',
      inject: true,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      // name: false,
      // name: (module, chunks, cacheGroupKey) => {
      //   const allChunksNames = chunks.map((chunk) => chunk.name).join('~');
      //   const prefix = cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
      //   return `${prefix}~${allChunksNames}`;
      // },
      name(module, chunks, cacheGroupKey) {
        const moduleFileName = module
          .identifier()
          .split('/')
          .reduceRight((item) => item);
        const allChunksNames = chunks.map((item) => item.name).join('~');
        const prefix = cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
        return `${prefix}~${allChunksNames}-${moduleFileName}`;
      },
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    // hot: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};