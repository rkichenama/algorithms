// const
//   gulp = require('gulp')
// ;
const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps')
;

const paths = {
  src: {
    js: ['./collections/**/*.js', './graphs/**/*.js', './js/site.js'],
    css: ['./css/*.scss', './collections/**/*.scss', './graphs/**/*.scss'],
  },
  dist: {
    dir: './dist/',
    js: 'scripts.min.js',
    css: 'styles.min.css',
  },
};

function scripts () {
  return gulp.src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.dist.js))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.dir));
}

function styles () {
  return gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat(paths.dist.css))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.dir));
}

const
  styling = gulp.series(styles),
  scripting = gulp.series(scripts),
  build = gulp.parallel(styling, scripting)
;

function watch (cb) {
  const w = require('gulp-watch');
  w(paths.src.css, styling);
  w(paths.src.js, scripting);
}


gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('default', build);
