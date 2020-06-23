const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const paths = {
  entryJs: "./src/javascript/index.js",

  distDir: "../dist",
  publicDir: "../public",
  imagesDir: "../src/images",

  filename: {
    js: "bundle.js",
    css: "bundle.css",
  }
}

module.exports = {
  entry: paths.entryJs,

  output: {
    path: path.resolve(__dirname, paths.distDir),
    filename: paths.filename.js,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: 'resolve-url-loader' },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: paths.filename.css,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, paths.imagesDir),
          to: path.join(__dirname, paths.distDir, "images"),
        },
      ],
    }),
  ],

  devServer: {
    contentBase: [
      path.join(__dirname, paths.publicDir),
      path.join(__dirname, paths.distDir)
    ],
    compress: true,
    port: 9000,
  },
};
