const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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
      logo: './src/globe.svg', // svg works too!
      // mode: 'webapp', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      // devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
    }),
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
      // {
      //   test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "url?limit=10000&mimetype=application/font-woff",
      // },
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'webfonts',
      //       publicPath: '../webfonts',
      //     },
      //   }
      // }
    ],
  },
};
