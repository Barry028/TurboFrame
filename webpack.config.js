// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlInlineCssWebpackPlugin = require("html-inline-css-webpack-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');



// const glob = require('glob');
const glob = require('glob-all');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var minifyHtml = {
  html5: true,
  // collapseWhitespace: true,
  // preserveLineBreaks: false,
  minifyCSS: true,
  minifyJS: true,
  removeComments: false
}
const HTMLReg = new RegExp(/([\w])+(?=.html)/);
const JSReg = new RegExp(/([\w])+(?=.js)/);

const html = glob.sync('./src/pages/**/*.html').map(path => {
  let name = path.match(HTMLReg)[0]
  console.log(name);
  return new HtmlWebpackPlugin({
    template: path,
    filename: name + '.html',
    chunks: [name],
    minify: minifyHtml
  })
})

const entries = glob.sync('./src/pages/**/*.js').reduce((prev, next) => {
  let name = next.match(JSReg)[0];
  // console.log(name);
  prev[name] = './' + next;
  // console.log(prev, prev[name]);
  return prev
}, {})
var webpack = require('webpack');


const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');




module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: 'js/[name].[chunkhash:8].js',
    filename: 'js/[name]/[name]-bundle.js',
  },
  devtool: 'source-map',
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'js/[name].js',
  // }, 
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },devServer: {
   contentBase: './dist',
   hot: true, // <---- add this line
},
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            implementation: require('sass'),
            sassOptions: {
              outputStyle: "expanded", // expanded compressed
            },
          },
        },
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['lodash']
        }
      }
    }, ]
  },
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    new MiniCssExtractPlugin({
      filename: 'css/[name]@[contenthash].css',
      chunkFilename: 'css/[name]@[contenthash].async.css'
    }),
    html,
    new HtmlWebpackPlugin({
      template: './src/pages/index/index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: minifyHtml
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/doc/doc.html',
      filename: 'doc.html',
      chunks: ['doc'],
      minify: minifyHtml
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/404/404.html',
      filename: '404.html',
      chunks: ['404'],
      minify: minifyHtml
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/dashboard_v1/dashboard_v1.html',
      filename: 'dashboard_v1.html',
      chunks: ['dashboard_v1'],
      minify: minifyHtml
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/dashboard_v2/dashboard_v2.html',
      filename: 'dashboard_v2.html',
      chunks: ['dashboard_v2'],
      minify: minifyHtml
    }),
    new PurgeCSSPlugin({
      // paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/**/*`, {
        nodir: true,
      }),
    }),
    // new BeautifyHtmlWebpackPlugin(),
    // new LodashModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
  ],
};