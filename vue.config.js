const settings = require("./src/settings");
const resolve = dir => require("path").join(__dirname, dir);
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const isOpenAnalyzer = true; // 代码分析
module.exports = {
  publicPath: settings.isHistory ? "/" : "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  lintOnSave: false, // eslint保存时检查
  productionSourceMap: false, // 生产环境sourceMap
  configureWebpack: config => {
    const plugins = [];
    if (isOpenAnalyzer && process.env.NODE_ENV === "development")
      plugins.push(new Analyzer({ analyzerPort: 9999 }));
    config.plugins = [...config.plugins, ...plugins];
    config.name = settings.title;
  },
  chainWebpack: config => {
    // 修复热更新
    config.resolve.symlinks(true);
    // 别名
    config.resolve.alias.set("@", resolve("src"));
    // 配置svg
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
  // css配置项
  css: {
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/index.scss";'
      }
    }
  },
  // 反向代理
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        // target: "http://o3108022o2.zicp.vip",
        // target: "http://123.57.232.1:8000",
        // target: "http://31p08u0222.oicp.vip",
        target: "http://192.168.0.136:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
