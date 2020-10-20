const path = require('path');
const apiMocker = require('webpack-api-mocker');

module.exports = {
  publicPath: '/dongtai_vision',
  outputDir: 'dongtai_vision',
  productionSourceMap: false,
  // requireModuleExtension: false,
  lintOnSave: false,
  devServer: {
    before(app) {
      apiMocker(app, path.resolve('./mock/index.js'));
    },
  },
};
