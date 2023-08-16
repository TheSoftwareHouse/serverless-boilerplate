const path = require("path");
const slsw = require("serverless-webpack");
const CopyPlugin = require("copy-webpack-plugin");

const {
  lib: {
    webpack: { isLocal },
  },
} = slsw;

module.exports = {
  plugins: [new CopyPlugin({ patterns: [{ from: ".env.dist" }] })],
  entry: slsw.lib.entries,
  mode: isLocal ? "development" : "production",
  target: "node18",
  externals: ["pg-native"],
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  optimization: {
    minimize: !isLocal,
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  ignoreWarnings: [
    {
      module: /node_modules\/typeorm/,
      message: /Can't resolve/,
    },
    {
      module: /node_modules/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/plop-templates/, /node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: !isLocal,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /plop-templates/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
