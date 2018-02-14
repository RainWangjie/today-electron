const genDefaultConfig = require('@storybook/vue/dist/server/config/defaults/webpack.config.js')
const path = require('path')

module.exports = (baseConfig, env) => {
  const defaultConfig = genDefaultConfig(baseConfig, env)
  defaultConfig.resolve.extensions.push('.vue')
  defaultConfig.module.rules.push(
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.styl$/,
      loaders: ['style-loader', 'css-loader', 'stylus-loader'],
      include: path.resolve(__dirname, '../')
    }
  )
  return defaultConfig
}
