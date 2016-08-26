var gulp = require("gulp");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

var uglify = require("gulp-uglify");
var react = require("gulp-react");

var using = require("gulp-using");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var del = require("del");


gulp.task("bsReload", function(){
    browser.reload();
});

gulp.task("bs", function(){
    browser.init(null, {
        proxy: 'localhost:6000'
    });
});



gulp.task("watch",  function() {
    gulp.watch ("assets/jsx/*.jsx", ["react"])
    gulp.watch ("assets/sass/*.scss", ["sass"])
    gulp.watch ("main.rb", ["bsReload"])
    gulp.watch ("views/*.slim", ["bsReload"])
});


gulp.task("sass", function() {
    gulp.src("./assets/sass/**/*.scss")
        .pipe(plumber())
        .pipe(using())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./public/css/"))
        .pipe(browser.reload({stream:true}));
});

gulp.task("react", function(){
    gulp.src("./assets/jsx/**/*.jsx")
        .pipe(plumber())
        .pipe(using())
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browser.reload({stream:true}));
});

gulp.task("build",
          [
              "bs",
              "sass",
              "react"
          ]
         );

gulp.task("clean", function(){
    del [
        "public/js/*.js",
        "public/css/*.css"
    ]
});

gulp.task ("default", ["clean", "build", "watch"]);

