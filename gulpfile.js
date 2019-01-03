var gulp  = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var project = require('./_project.js');
var os = require("os");
var parallel = require("concurrent-transform");
var rename = require("gulp-rename");
var imageResize = require('gulp-image-resize');
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var serve = require('gulp-serve');

/**
  Helper functions
*/ 

// create a set of resize tasks at defined image widths
var resizeImageTasks = [];
[400,1000].forEach(function(size) {
  var resizeImageTask = 'resize_' + size;
  gulp.task(resizeImageTask, function(done) {
    gulp.src(project.buildSrc + '/images/*')
    .pipe(parallel(
      imageResize({ width : size }),
      os.cpus().length
    ))
    .pipe(rename(function (path) { path.basename += "-" + size; }))
    .pipe(gulp.dest(project.buildDest+ '/images'));
    done();
  });
  resizeImageTasks.push(resizeImageTask);
});

/**
  Low-level functions
*/ 

// Copy our core images to the dist folder, and resize all preview images
gulp.task('images', gulp.parallel(resizeImageTasks, function copyOriginalImages(done) {
  gulp.src(project.buildSrc + '/images/*')
    .pipe(gulp.dest(project.buildDest+ '/images'))
    done();
}));

// Compile SCSS files to CSS
gulp.task('styles', function() {
  return gulp.src(project.buildSrc + '/scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(project.buildDest+ '/css'));
});

// Uglify our javascript files into one and use pump to expose errors
gulp.task('scripts', function(done) {
  pump([
      gulp.src(project.buildSrc + "/js/**/*.js"),
      concat('main.js'),
      uglify(),
      gulp.dest(project.buildDest + '/js')
    ],
    done()
  );
});

// compile the assets to the correct destination
gulp.task('assets', gulp.parallel(
  'images',
  'styles',
  'scripts'
));

// local webserver for development
gulp.task('serve', serve({
  root: [project.buildDest],
  port: 8080,
}));

/**
  High-level functions (Yarn calls)
*/ 

// Run 11ty to build the pages
gulp.task('eleventy', shell.task('eleventy'));

// Watch folders for changes
gulp.task("watch", function () {
  gulp.watch(project.buildSrc + "/js/**/*", gulp.parallel('scripts'));
  gulp.watch(project.buildSrc + "/scss/**/*", gulp.parallel('styles'));
  gulp.watch(project.buildSrc + "/site/**/*",  gulp.parallel('eleventy'));
});

// Watcher task for running watch and serve
gulp.task('watcher', gulp.parallel(
  'serve',
  'watch'
));

// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(project.buildDest, {
      read: false,
      allowEmpty: true
    })
    .pipe(clean());
});

// Local clean build
gulp.task('build:local', gulp.series(
  'clean-build',
  'eleventy',
  'assets'
));

// Get the data and build
gulp.task('build', gulp.series(
  // 'get:data',
  'eleventy',
  'assets'
));


