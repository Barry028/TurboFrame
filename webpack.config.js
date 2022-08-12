// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');

const HtmlInlineCssWebpackPlugin = require("html-inline-css-webpack-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const glob = require('glob-all');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// //取得副檔名
// function getFileExtension1(filename) {
//     return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
// }
// //取得檔名
// function getFileName(val) {
//     filename = val.split('\\').pop().split('/').pop();
//     filename = filename.substring(0, filename.lastIndexOf('.'));
//     return filename;
// }

var minifyHtml = {
  html5: true,
  // collapseWhitespace: true,
  // preserveLineBreaks: false,
  minifyCSS: true,
  minifyJS: true,
  removeComments: false
}



// const entries = {};
// const chunks = [];
// // const chunks = [];
// const htmls = glob.sync('./src/pages/**/*.html').forEach((name) => {
//   const n = name.slice(name.lastIndexOf('.html') + 5, name.lastIndexOf('/'));
//   console.log(n)
//   console.log(name)
//   entries[n] = [name];
//   chunks.push(n);
// });



// const HTMLReg = new RegExp(/([\w])+(?=.html)/);
// // const JSReg =new RegExp(//([-]+)(?=.js)/);

// const html = glob.sync('./src/pages/**/*.html').map(path => {
//   let name = path.match(HTMLReg)[0] // 從路徑中提取出檔名
//   console.log(name);
//   return new HtmlWebpackPlugin({
//     template: path,
//     filename: name + '.html',
//     chunks: [name],
// minifyHtml: minifyHtml
//   })
// })
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// var webpack = require('webpack');
// 



const HTMLReg = new RegExp(/([\w])+(?=.html)/);
const JSReg = new RegExp(/([\w])+(?=.js)/);



const html = glob.sync('./src/pages/**/*.html').map(path => {
  let name = path.match(HTMLReg)[0] // 從路徑中提取出檔名
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
// var webpack = require('webpack');
// 



module.exports = {
  entry: entries,
  // {
  //   "index": './src/pages/index/index.js',
  //   '404': './src/pages/404/404.js',
  //   "doc": './src/pages/doc/doc.js',
  //   "dashboard_v1": './src/pages/dashboard_v1/dashboard_v1.js',
  //   'dashboard_v2': './src/pages/dashboard_v2/dashboard_v2.js',
  // },
  output: {
    filename: 'js/[name].js',
    path: __dirname + '/dist'
  },
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   // filename: 'js/[name].[chunkhash:8].js',
  //   filename: 'js/[name]/[name]-bundle.js',
  // },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /\/excludes/,
      }),
    ],
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
    new MiniCssExtractPlugin({
      filename: 'css/[name]@[contenthash].css',
      chunkFilename: 'css/[name]@[contenthash].async.css'
    }),
    html,
    new PurgeCSSPlugin({
      // paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/**/*`, {
        nodir: true,
      }),
    }),
    // new BeautifyHtmlWebpackPlugin(),
    // new LodashModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
};