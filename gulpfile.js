var gulp  = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var project = require('./_project.js');
var os = require("os");
var parallel = require("concurrent-transform");
var rename = require("gulp-rename");
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var purgecss = require('gulp-purgecss')
var pump = require('pump');
var serve = require('gulp-serve');

/**
  Helper functions
*/ 

// Create a set of resize tasks at defined image widths
var resizeImageTasks = [];
[200,400,800,1600].forEach(function(size) {
  var resizeImageTask = 'resize_' + size;
  gulp.task(resizeImageTask, function(done) {
    gulp.src(project.buildSrc + '/images/*')
    .pipe(parallel(
      imageResize({ width : size }),
      os.cpus().length
    ))
    .pipe(imagemin())
    .pipe(rename(function (path) { path.basename += "-" + size; }))
    .pipe(gulp.dest(project.buildDest+ '/images'));
    done();
  });
  resizeImageTasks.push(resizeImageTask);
});

/**
  Low-level functions
*/ 

// Resize, min and copy our images to the dist folder (and copy the original)
gulp.task('imageswithoriginal', gulp.parallel(resizeImageTasks, function copyOriginalImages(done) {
  gulp.src(project.buildSrc + '/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(project.buildDest+ '/images'))
    done();
}));

// Resize, min and copy our images to the dist folder
gulp.task('images', gulp.parallel(resizeImageTasks));

// Move the img files to dist images folder. Img file are not preprocessed.
gulp.task('copyimg', function() {
  return gulp.src(project.buildSrc + '/img/*')
    .pipe(gulp.dest(project.buildDest+ '/images'))
});

// Compile SCSS files to CSS
gulp.task('sassy', function() {
  return gulp.src(project.buildSrc + '/scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(project.buildDest+ '/css'));
});

// Purge unused css
gulp.task('purgecss', () => {
  return gulp.src(project.buildDest+'/css/*.css')
      .pipe(purgecss({
          content: [project.buildDest+"/**/*.html"]
      }))
      .pipe(gulp.dest(project.buildDest+'/css'))
})

gulp.task('styles', gulp.series('sassy', 'purgecss'));


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
  'scripts',
  'copyimg'
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
gulp.task('pages', gulp.series('eleventy', 'styles'));

// Watch folders for changes
gulp.task("watch", function () {
  gulp.watch(project.buildSrc + "/js/**/*", gulp.parallel('scripts'));
  gulp.watch(project.buildSrc + "/scss/**/*", gulp.parallel('styles'));
  gulp.watch(project.buildSrc + "/site/**/*",  gulp.parallel('pages'));
  gulp.watch(project.buildSrc + "/images/**/*",  gulp.parallel('eleventy'));
  gulp.watch(project.buildSrc + "/img/**/*",  gulp.parallel('eleventy'));
  gulp.watch(project.buildSrc + "/filters/**/*",  gulp.parallel('eleventy'));
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
  'clean-build',
  'eleventy',
  'assets'
));


