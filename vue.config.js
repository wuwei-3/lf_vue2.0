/*
 * @Description: 配置中心
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2021-06-17 19:05:30
 * @LastEditors: OBKoro1
 */
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  chainWebpack: (config) => {
    /* 这里要注意下环境，成功打包后dist文件会有.gz为压缩成功 */
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
    }
  },
  publicPath: './',
  productionSourceMap: false,
  outputDir: 'dist', //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  devServer: {
    hot: true,
    https: false,
    hotOnly: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // proxy: {
    //   // 调试专用
    //   '/gateway-trans': {
    //     target: 'http://192.168.3.190:8083', // 线上地址 https://test-yt-mp.ytfs.yitong.com.cn
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/gateway-trans': '/gateway-trans',
    //     },
    //   },
    // },
  },
};
