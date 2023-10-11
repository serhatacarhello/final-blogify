const path = require("path");

module.exports = {
  // Diğer Webpack ayarları buraya gelecek

  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
