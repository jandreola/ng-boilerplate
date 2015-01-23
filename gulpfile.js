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
        annotate   : 'gulp-ng-annotate',
        minify_css : 'gulp-minify-css',
        version    : 'gulp-rev',
        uglify     : 'gulp-uglify',
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
    appRoot: 'src/app',
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
    return gulp.src([
        'src/app/app.js',
        'src/app/**/*.js'
    ])
    .pipe($.annotate({'single_quotes': true}))
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
        'container':'gulp-ruby-sass'
    }))
    .pipe($.autoprefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe($.size({title: 'CSS: '}))
    .pipe(gulp.dest(PATH['public'].root));
});

///////////
// VIEWS //
///////////
/**
 * Move views files from src to public
 */
gulp.task('views', function(){
    return gulp.src('src/app/views/**/*.html')
        .pipe(gulp.dest('public/views'));

});

///////////
// INDEX //
///////////

/**
 * Injects dependencies and save file into public
*/
gulp.task('index', ['vendor', 'script', 'style'], function () {

    // Move index to puvlic location
    return gulp.src(PATH.src.appRoot + '/index.html')
    .pipe(gulp.dest(PATH['public'].root));
});

//////////////
// Cleaners //
//////////////
/*
 * not in use at the moment, useful with Inject
 */
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
        notify: true,
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
gulp.task('default', ['index', 'serve'], function() {

    // Watch for scripts changes
    gulp.watch('src/app/views/**/*.html', ['views']);

    // Watch for scripts changes
    gulp.watch('src/app/**/*.js', ['script']);

    // Watch for SASS changes
    gulp.watch([PATH.src.sass + '**/*.sass'], ['style']);
});
