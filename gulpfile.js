// var async = require('async');
// gulp default

const {
  src,
  dest,
  watch,
  series
} = require('gulp')
// const async = require('async');
const gulp = require('gulp');

const babel = require('gulp-babel');

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcss_html = require('gulp-html-postcss');
const reporter = require('gulp-reporter');
const autoprefixer = require('autoprefixer');
const sugarss = require('sugarss');


const cssnano = require('cssnano');
// 合併檔案
const concat = require('gulp-concat');
const minify = require("gulp-babel-minify");
sass.compiler = require('dart-sass');
const Observable = require("rx").Observable;

// iCon font build Task 
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const lodash = require('lodash');

const svgicons2svgfont = require('gulp-svgicons2svgfont');

const fontName = 't-slim-icon';
const className = 't-slim-ic';
// templates Path
const fontPath = './src/iconfont/templates/';
const template = 'iconfonts';

const timestamp = Math.round(Date.now() / 1000);

const purgecss = require('gulp-purgecss');



// gulp.task('css', () => {
//   const callback = (ctx) => ({
//     parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
//     plugins: [
//       autoprefixer,
//       cssnano
//     ]
//   });


//   return gulp.src('./src/doc.html', {
//       sourcemaps: true
//     })
//     .pipe(postcss(callback))
//     // Message repport support
//     .pipe(reporter())
//     .pipe(gulp.dest('./dest'));
// });

// iConFont 快速建立
gulp.task('iconfonts', () =>
  gulp.src(
    ['./src/iconfont/slim/Regular/**.svg',
      './src/iconfont/slim/Bold/**.svg',
      './src/iconfont/slim/Filled/**.svg',
      './src/iconfont/slim/Light/**.svg'
    ])
  .pipe(iconfont({
    fontName,
    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
    log: () => {}
  }))
  .on('glyphs', (glyphs) => {

    // const timestamp = Math.round(Date.now() / 1000)
    const options = {
      className: className,
      fontName,
      fontPath: '../fonts/', // set path to font (from your CSS file if relative)
      glyphs: glyphs.map(mapGlyphs),
      descent: 100
    }
    gulp.src(`src/iconfont/templates/${template}.css`)
      .pipe(consolidate('lodash', options))
      .pipe(rename({
        basename: fontName
      }))
      .pipe(gulp.dest('dist/icons/t-slim-icon/css/'))

    gulp.src(`src/iconfont/templates/${template}.html`)
      .pipe(consolidate('lodash', options))
      .pipe(rename({
        basename: fontName
      }))
      .pipe(gulp.dest('dist/icons/t-slim-icon/'))
  })
  .pipe(gulp.dest('./dist/icons/t-slim-icon/fonts/'))
)

function mapGlyphs(glyph) {
  return {
    name: glyph.name,
    codepoint: glyph.unicode[0].charCodeAt(0)
  }
}



// SASS 非同步 
gulp.task("sass", function() {
  return Observable.return(
    scssTask()
  );
});

function scssTask() {
  return src('./src/pages/scss/*.scss')
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass()) // expanded nested compact compressed
    .pipe(
      postcss([
        // cssnano(),
        postcssPresetEnv( /* pluginOptions */ )
      ]))
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write('./')) // 生成 sourcemaps 文件 (.map)
    .pipe(sourcemaps.write('.', {
      sourceRoot: '../../../src/scss/'
      // 寫入 Sourcemaps 到當前資料夾(以下下列 dest('assets/css')為基準點，
      // SourceRoot：以匯出的資料夾為基準點找他原本的 scss 資料夾位置。
    }))
    .pipe(dest('./dist/css/gulp'));
}

// BABELES5 非同步 
gulp.task("babelEs5", function() {
  return Observable.return(
    babelEs5()
  );
});

// 編譯 ES6 轉 5 
function babelEs5() {
  return src([
      // "javascript/TurboFrame_Global.js",
      "src/javascript/TurboFrame.js",
      "src/javascript/TurboFrame_Prototype.js",
      "src/javascript/TurboFrame_Ready.js",
      "src/javascript/TurboFrame_Core.js",
      "src/javascript/TurboFrame_Fragments.js",
      "src/javascript/TurboFrame_Resize.js",
      "src/javascript/TurboFrame_Browser.js",
      "src/javascript/TurboFrame_Util.js",
      "src/javascript/TurboFrame_Functions.js",
      "src/javascript/TurboFrame_Elements.js",
      "src/javascript/TurboFrame_String.js",
      "src/javascript/TurboFrame_Events.js",
      "src/javascript/TurboFrame_Ajax.js",
      // "src/javascript/TurboFrame_Ajax.js",
    ], {
      "allowEmpty": true
    })
    .pipe(concat("turboframe_bundle.min.js"))

    .pipe(babel({
      presets: ['@babel/env'],
      minified: true,
    }))

    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(dest('./dist/js'))
  // 編譯完成輸出路徑
}

// BABELES5 非同步 
gulp.task("babelEs5Polyfills", function() {
  return Observable.return(
    babelEs5Polyfills()
  );
});

// src('./src/pages/scss/*.scss')
// 編譯 babelEs5Polyfills ES6 轉 5 
function babelEs5Polyfills() {
  return src([
      "src/javascript/polyfills/*.js",
    ], {
      "allowEmpty": true
    })
    .pipe(concat("turboframe_polyfills_bundle.min.js"))

    .pipe(babel({
      presets: ['@babel/env'],
      minified: true,
    }))

    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(dest('./dist/js'))
  // 編譯完成輸出路徑
}
// BROWSERSYNC TASKS
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browsersyncReload);
  watch(['./src/scss/*.scss', './javascript/*.js'], series(
    scssTask,
    babelEs5,
    babelEs5Polyfills
    // browsersyncReload
  ));
}

exports.default = series(
  scssTask,
  babelEs5,
  babelEs5Polyfills
);