const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "./js/main.js",
    path: path.resolve(__dirname, "docs"),
    assetModuleFilename: "./images/[hash][ext][query]",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/images", to: "images" }],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000000,
            name: "images/[name].[ext]",
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: { publicPath: "" },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer"),
                  require("postcss-assets")({
                    loadPaths: ["images/"],
                    basePath: "docs",
                  }),
                  require("postcss-uncss"),
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: "docs",
    port: 3000,
    inline: true,
    host: "0.0.0.0",
    watchContentBase: true,
  },

  devtool: "source-map",
};
