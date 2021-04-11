const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ExampleWebpackPlugin = require('./src/example-plugin');
const smp = new SpeedMeasurePlugin();




module.exports = smp.wrap({
  entry: {
    app: "./src/main.js",
    print: "./src/print.js",
  },
  plugins: [
    new ExampleWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', generateStatsFile: true, }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, 'build', 'vendor-manifest.json')
    }),
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
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, './src/example-loader.js'),
        }
      },
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
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }],
      }
    ]
  },
  mode: "development"
});
