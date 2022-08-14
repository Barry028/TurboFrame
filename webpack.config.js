// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlInlineCssWebpackPlugin = require("html-inline-css-webpack-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');


const glob = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

var minifyHtml = {
  html5: true,
  // collapseWhitespace: true,
  // preserveLineBreaks: false,
  minifyCSS: true,
  minifyJS: true,
  removeComments: false
}

const HTMLReg = new RegExp(/\/([\w-]+)(?=.html)/);
const JSReg = new RegExp(/\/([\w-]+)(?=.js)/);

const html = glob.sync('./src/pages/**/*.html').map(path => {
  let name = path.match(HTMLReg)[1]
  console.log(name);
  return new HtmlWebpackPlugin({
    template: path,
    filename: name + '.html',
    chunks: [name],
    minify: minifyHtml
  })
})
console.log(html);
const entries = glob.sync('./src/pages/**/*.js').reduce((prev, next) => {
  let name = next.match(JSReg)[1];
  // console.log(name);
  prev[name] = next;
  // console.log(prev, prev[name]);
  return prev
}, {})


console.log(entries);

// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// var webpack = require('webpack');




module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]/[name]-bundle.js',
  },
  devtool: 'source-map',
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['lodash']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]@[contenthash].css',
      chunkFilename: 'css/[name]@[contenthash].async.css'
    }),
    new PurgeCSSPlugin({
      // paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
      paths: glob.sync(`${path.resolve(__dirname, 'src/pages')}/**/*`, {
        nodir: true,
      }),
    }),
    // // new BeautifyHtmlWebpackPlugin(),
    // // new LodashModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ].concat(html)
}