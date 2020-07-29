const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  mode: "none",
  target: "node",
  node: {
    __dirname: true,
  },
  externals: {
    "aws-sdk": "aws-sdk",
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
        ],
      },
    ],
  },
};
