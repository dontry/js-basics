const path = require("path");

const ROOT_DIR = path.resolve(__dirname);
const SOURCE_DIR = path.join(ROOT_DIR, "src");
const BUILD_DIR = path.resolve(ROOT_DIR, "dist");

module.exports = {
  entry: path.join(SOURCE_DIR, "index.js"),
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  resolve: {
    modules: ["node_modules", SOURCE_DIR, "components"],
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true, camelCase: true } }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: "file-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./public"),
    historyApiFallback: true,
    // compress: true,
    port: 9000
  }
};

if (process.env.WEBPACK_SERVE) {
  module.exports.mode = "development";
  module.exports.serve = {
    content: path.join(__dirname, "./public")
  };
}
