const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssPresetEnv(/* pluginOptions */) // 这个预设中已经包括了autoprefixer https://github.com/csstools/postcss-preset-env
  ]
}
