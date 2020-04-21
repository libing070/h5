"use strict";
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
const HOST_PRODUCTION = "http://jeep.bitsmart.com.cn/";
const HOST_DEV = "http://172.20.207.44:8080";
// let host = HOST_DEV;
let host = HOST_PRODUCTION;

module.exports = {
  build: {
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require("./dev.env"),
    port: process.env.PORT || 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "**/login": {
        target: host,
        changeOrigin: true
      },
      "**/queryCarServlet": {
        target: host,
        changeOrigin: true
      },
      "**/getIdentifyingCode": {
        target: host,
        changeOrigin: true
      },
      "**/getRegisterIdentifyingCode": {
        target: host,
        changeOrigin: true
      },
      "**/checkIdentifyingCode": {
        target: host,
        changeOrigin: true
      },
      "**/isValidInviteCode": {
        target: host,
        changeOrigin: true
      },
      "**/isHasBindedInvitedCode": {
        target: host,
        changeOrigin: true
      },
      "**/rebindInvitedCode": {
        target: host,
        changeOrigin: true
      },
      "**/addUser": {
        target: host,
        changeOrigin: true
      },
      "**/queryCompetitionServlet": {
        target: host,
        changeOrigin: true
      },
      "**/getGephiPngServlet": {
        target: host,
        changeOrigin: true
      },
      "**/heatmapServlet": {
        target: host,
        changeOrigin: true
      },
      "**/queryValidCompetitionServlet": {
        target: host,
        changeOrigin: true
      },
      "/data/": {
        target: host,
        changeOrigin: true
      },
      "**/analysis": {
        target: host,
        changeOrigin: true
      },
      "**/downAnalysis": {
        target: host,
        changeOrigin: true
      },
      "**/assembly": {
        target: host,
        changeOrigin: true
      },
      "**/assemblyRate": {
        target: host,
        changeOrigin: true
      },
      "**/download": {
        target: host,
        changeOrigin: true
      },
      "**/dimvalue": {
        target: host,
        changeOrigin: true
      },
      "**/userProfile": {
        target: host,
        changeOrigin: true
      },
      "**/preference": {
        target: host,
        changeOrigin: true
      },
      "**/habit": {
        target: host,
        changeOrigin: true
      },
      "**/downpreference": {
        target: host,
        changeOrigin: true
      },
      "**/downhabit": {
        target: host,
        changeOrigin: true
      },
      "**/gis": {
        target: host,
        changeOrigin: true
      },
      "**/dealergis": {
        target: host,
        changeOrigin: true
      },
      "**/buyCarGoal": {
        target: host,
        changeOrigin: true
      },
      "**/koubei": {
        target: host,
        changeOrigin: true
      },
      "**/getWCData": {
        target: host,
        changeOrigin: true
      },
      "**/getAccounts": {
        target: host,
        changeOrigin: true
      },
      "**/addUser": {
        target: host,
        changeOrigin: true
      },
      "**/editUser": {
        target: host,
        changeOrigin: true
      },
      "**/delUser": {
        target: host,
        changeOrigin: true
      },
      "**/downBuyCarGoal": {
        target: host,
        changeOrigin: true
      },
      "**/dwCSV": {
        target: host,
        changeOrigin: true
      },
      "**/zfzb": {
        target: host,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
