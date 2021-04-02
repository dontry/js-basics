const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js",
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
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "[name]_[contenthash8].css",
  //     chunkFilename: "[id].css"
  //   })
  // ],
  mode: "production"
};
