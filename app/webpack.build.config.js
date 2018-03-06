const path = require('path'),
      webpack = require('webpack'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

//Modules webpack config
const MODULES = path.join(__dirname, '/node_modules/'),
      phaser = path.join(MODULES, 'phaser-ce/build/custom/phaser-split.js'),
      pixi = path.join(MODULES, 'phaser-ce/build/custom/pixi.js'),
      p2 = path.join(MODULES, 'phaser-ce/build/custom/p2.js'),
      redux = path.join(MODULES, 'redux/dist/redux.js');

module.exports = {
  entry: {
    app : './src/index.ts',
    vendor: ['pixi', 'p2', 'phaser', 'redux']
  },
  module: {
    rules: [
      { test: /\.(jpe?g|png|gif|svg)$/i, use: [
        {
          loader: 'file-loader',
          options:
            {
              name: 'assets/[name]-[hash:6].[ext]'
            }
          }
        ]
      },
      { test: /\.ts?$/,use: 'ts-loader', exclude: /node_modules/ },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
      { test: /redux\.js/, use: ['expose-loader?redux'] }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      'redux': redux
    },
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/']),
    new CopyWebpackPlugin(
      [{ from: 'src/assets', to: 'assets' }],
      { copyUnmodified: true }
    ),
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'vendor',
        filename: 'vendor.bundle.js'
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      title: 'PhaserApp',
      alwaysWriteToDisk: true,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      }
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
};
