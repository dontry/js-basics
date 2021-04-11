const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');



module.exports = {
  entry: {
    app: "./src/main.js",
    print: "./src/print.js",
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new WebpackManifestPlugin({
      basePath: './src/', // generate an asset manifest
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: 'output management'  // auto-generate a new index.html in dist folder
    })
    //   new MiniCssExtractPlugin({
    //     filename: "[name]_[contenthash8].css",
    //     chunkFilename: "[id].css"
    //   })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it uses publicPath in webpackOptions.output
          //     hmr: process.env.NODE_ENV === "development"
          //   }
          // },
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 50,
            }
          },
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // indicates which chunks will be selected for optimization.  
    },
    usedExports: true, // Tells webpack to determine used exports for each module.
  },
  mode: "development"
};
