var gulp = require('gulp');
var sync = require('browser-sync').create();
var rename = require('gulp-rename');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');

gulp.task('scripts', function () {
  gulp.src('src/js/*.js')
          .pipe(concat('scripts.min.js'))
          .pipe(uglify())
          .on('error', function (err) {
            console.log('\n\n===== ERROR =====\n\n' + err.message + '\n===== /ERROR =====\n\n');
          })
//          .pipe(rename('scripts.min.js'))
          .pipe(gulp.dest('dist/js'))
          .pipe(sync.reload({stream: true}));
});

gulp.task('styles', function () {
  gulp.src('src/css/all.scss')
          .pipe(sass())
          .on('error', function (err) {
            console.log('\n\n===== ERROR =====\n\n' + err.message + '\n===== /ERROR =====\n\n');
          })
          .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'firefox esr', 'opera 12.1']}))
          .pipe(clean())
          .pipe(rename('styles.min.css'))
          .pipe(gulp.dest('dist/css'))
          .pipe(sync.reload({stream: true}));
});

gulp.task('sync', function () {
  sync.init({
    proxy: 'localhost:80/avatarki/dist/index_.php'
  });
});

gulp.task('default', ['sync'], function () {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/css/*.scss', ['styles']);
  gulp.watch('dist/*.php').on('change', sync.reload);
});