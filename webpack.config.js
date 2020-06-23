let config = {};

if (process.env.NODE_ENV === "production") {
  config = require("./configs/webpack.prod");
} else {
  config = require("./configs/webpack.dev");
}

module.exports = config