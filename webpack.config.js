// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlInlineCssWebpackPlugin = require("html-inline-css-webpack-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const glob = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const HTMLReg = new RegExp(/\/([\w-]+)(?=.html)/);
const JSReg = new RegExp(/\/([\w-]+)(?=.js)/);

const html = glob.sync('./src/pages/**/*.html').map(path => {
  let name = path.match(HTMLReg)[1]
  console.log(name);
  return new HtmlWebpackPlugin({
    template: path,
    filename: name + '.html',
    chunks: [name],
    minify: {
      html5: true,
      // collapseWhitespace: true,
      // preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false
    }
  })
})
console.log(html);
const entries = glob.sync('./src/pages/**/*.js').reduce((prev, next) => {
  let name = next.match(JSReg)[1];
  prev[name] = next;
  return prev
}, {})
console.log(entries);


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
    }, {
      test: /\.css$/i,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag', // 多個 CSS 合併為單一個 style 標籤
            attributes: {
              id: 'allCSS', // 附加 id 屬性並定義其值為 "allCSS"
            },
          },
        },
        'css-loader', {
          loader: 'postcss-loader'
        }
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
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]@[contenthash].css',
      chunkFilename: 'css/[name]@[contenthash].async.css'
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/**/*`, {
        nodir: true,
      }),
    }),
    // new CleanWebpackPlugin(),
  ].concat(html)
}