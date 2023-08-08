const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    new FaviconsWebpackPlugin({
      logo: './src/globe.svg',
      // mode: 'webapp', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      // devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'assets/[name]~[hash][ext][query]',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
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
        test: /\.(css|s[ac]ss)$/i,
        use: [
          // Creates `style` nodes from JS strings
          // "style-loader",
          // Better for production over style-loader
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]'
        }
      },
      {
        test: /\.(pdf|docx?|xlsx?|csv|pptx?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]'
        }
      },
    ],
  },
};
