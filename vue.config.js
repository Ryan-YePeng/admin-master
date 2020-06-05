const settings = require("./src/settings");
const resolve = dir => require("path").join(__dirname, dir);
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const isOpenAnalyzer = true;
module.exports = {
  publicPath: settings.isHistory ? "/" : "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    const plugins = [];
    if (isOpenAnalyzer && process.env.NODE_ENV === "development")
      plugins.push(new Analyzer({ analyzerPort: 9999 }));
    config.plugins = [...config.plugins, ...plugins];
    config.name = settings.title;
  },
  chainWebpack: config => {
    config.resolve.symlinks(true);
    config.resolve.alias.set("@", resolve("src"));
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/index.scss";'
      }
    }
  },
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://123.57.232.1:8000",
        // target: "http://192.168.0.132:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
