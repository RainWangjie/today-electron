const path = require('path')

module.exports = (storybookBaseConfig, configType) => {
  // add stylus support
  // and font support so font-awesome could work!
  storybookBaseConfig.module.rules.push(
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.styl$/,
      loaders: ['style-loader', 'css-loader', 'stylus-loader'],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name]--[folder].[ext]'
      }
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'imgs/[name]--[folder].[ext]'
        }
      }
    }
  )

  return storybookBaseConfig
}
