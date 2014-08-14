var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var uglify = require('gulp-uglify')

gulp.task('browserify', function() {
  return browserify({
      entries: ['./example.js'],
      debug: true
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('.'))
})

gulp.task('uglify', function () {
  return gulp.src(['main.js'])
    .pipe(uglify({
      output: {
        beautify: true
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('default', ['browserify','uglify'])
