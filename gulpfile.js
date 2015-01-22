'use strict'

// Load gulp
var gulp = require('gulp');

// Modules container
var $ = {};

// Modules declaration
var modules = {
        concat     : 'gulp-concat',
        del        : 'del',
        sass       : 'gulp-ruby-sass',
        rename     : 'gulp-rename',
        minify_css : 'gulp-minify-css',
        version    : 'gulp-rev',
        uglify     : 'gulp-uglify',
        inject     : 'gulp-inject',
        autoprefix : 'gulp-autoprefixer',
        jshint     : 'gulp-jshint',
        size       : 'gulp-size',
        browserSync: 'browser-sync'
    };

// Load all modules into modules container
for(var key in modules) {
    if (modules.hasOwnProperty(key)) {
        $[key] = require(modules[key]);
    }
}

///////////////
// Constants //
///////////////
var PATH = {};

// Temporary folder
PATH.temp = 'temp';

// Source
PATH.src = {
    css: 'src/content/css',
    img: 'src/content/img',
    js: 'src/content/js',
    sass: 'src/content/sass',
    content: 'src/content',
    views: 'src/app/views',
    root: 'src'
};

// Public
PATH['public'] = {
    css: 'public/content/css',
    img: 'public/content/img',
    js: 'public/content/js',
    sass: 'public/content/sass',
    content: 'public/content',
    root: 'public'
};


///////////////////////
// DEVELOPMENT TASKS //
///////////////////////

/////////////
// Scripts //
/////////////

/**
 * Concatenates all bower dependencies in components folder
 */
gulp.task('vendor', function(){

    // List of all dependencies
    var dependencies = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js'
    ];

    return gulp.src(dependencies)
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest(PATH['public'].root));
});

/**
 * Concatenates all application scripts in assets/js folder
 */
gulp.task('script', function(){
    return gulp.src(PATH.src.js + '/**/*.js')
    .pipe($.jshint())
    .pipe($.concat('all.js'))
    .pipe(gulp.dest(PATH['public'].root));
});


////////////
// Styles //
////////////

/**
 * Compile style
 */
gulp.task('style', function() {
    return gulp.src(PATH.src.sass + '/main.sass')
    .pipe($.sass({
        'style': 'expanded',
        'sourcemap=none': true,
        'container':'jandreola-gulp-ruby-sass'
    }))
    .pipe($.autoprefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe($.size({title: 'CSS: '}))
    .pipe(gulp.dest(PATH['public'].root));
});


///////////
// INDEX //
///////////

/**
 * Injects dependencies and save file into public
*/
gulp.task('index', ['vendor', 'script', 'style'], function () {

    // Move index first
    gulp.src(PATH.src.views + '/index.html')
    .pipe(gulp.dest(PATH['public'].root));

    var target = gulp.src(PATH['public'].root + '/index.html');

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
        PATH['public'].root + '/vendor.js',
        PATH['public'].root + '/all.js',
        PATH['public'].root + '/main.css'
    ], {read: false});

    return target.pipe($.inject(sources, {relative: true}))
    .pipe(gulp.dest(PATH['public'].root));
});

//////////////
// Cleaners //
//////////////
gulp.task('clean:index', function(cb){
    return $.del([PATH['public'].root + '/index.html'], cb);
});

//////////////////
// Browser Sync //
//////////////////
gulp.task('serve', function (cb) {
      $.browserSync({
        files: ['public/**/*.{js,css,html}'],
        port: 8001,
        notify: false,
        server: {
          baseDir: './public',
          index: 'index.html'
        }
      }, cb)
    });


///////////////
// MAIN TASK //
///////////////

/**
 * Sets watchers and triggers appropriate tasks
 */
gulp.task('default', ['index'], function() {

    // Watch for index.html changes
    var indexWatcher = gulp.watch(PATH.src.root + '/index.html', [$.browserSync.reload]);

    indexWatcher.on('change', function(){
        var target = gulp.src(PATH.src.root + '/index.html');

        // It's not necessary to read the files (will speed up things), we're only after their paths:
        var sources = gulp.src([
            PATH['public'].root + '/vendor.js',
            PATH['public'].root + '/all.js',
            PATH['public'].root + '/main.css'
        ], {read: false});

        // Inject dependencies
        return target.pipe($.inject(sources, {relative: true}))
            .pipe(gulp.dest(PATH['public'].root));
    });

    // Watch for scripts changes
    gulp.watch(PATH.src.js + '/**/*.js', ['script']);

    // Watch for SASS changes
    gulp.watch([PATH.src.sass + '**/*.sass'], ['style']);
});
