const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const webpackEnv = require('webpack-env');
const concat = require('gulp-concat');

// Files
const files = {
  all: [__dirname + '/www/app/**/*.html',
    __dirname + '/www/app/*.html',
    __dirname + '/www/app/js/*.js'
  ],
  sass: [__dirname + '/www/app/styles/sass/*.scss',
         __dirname + '/www/app/styles/css/*.css'
  ]
};

// Build HTML
gulp.task('html:dev', () => {
  gulp.src([__dirname + '/www/app/*.html', __dirname + '/www/app/**/*.html'])
    .pipe(gulp.dest(__dirname + '/www/build'))
})

// Bundle.js
gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/www/app/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackEnv]
    }))
    .pipe(gulp.dest(__dirname + '/www/build/'))
});

// Sass
gulp.task('sass:all', function() {
  gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(__dirname + '/www/build/css/'));
});

// Watch Sass
gulp.task('sass:watch', function() {
  gulp.watch(files.sass, ['sass:all']);
});

// Watch HTML
gulp.task('dev:watch', () => {
  gulp.watch(files.all, ['webpack:dev', 'html:dev'])
});

// Build All
gulp.task('build:dev', ['sass:all', 'webpack:dev', 'html:dev']);

// Watch all
gulp.task('default', ['dev:watch', 'sass:watch']);

