var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var del = require("del");
var imagemin = require("gulp-imagemin");
var pump = require("pump");
var rename = require("gulp-rename");
var run = require("run-sequence");
var uglify = require("gulp-uglify");
var webp = require("gulp-webp");

//Автопрефиксер и минификация

gulp.task("style", function () {
    gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
      autoprefixer()
    ]))
        .pipe(gulp.dest("./css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./css"))
        .pipe(server.stream());
        
});

//Минификация JS
gulp.task("js", function (cb) {
    pump([
    gulp.src(["js/*.js", "!js/*.min.js"]),
    uglify()
    .pipe(rename({
                suffix: ".min"
            })),
    gulp.dest("./js")
  ],
        cb
    );
});

//Оптимизация изображений
gulp.task("images", function () {
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
    imagemin.optipng({
                optimizationLevel: 3
            }),
    imagemin.jpegtran({
                progressive: true
            }),
    imagemin.svgo()
  ]))
        .pipe(gulp.dest("img"));
});

//Конвертация в webp
gulp.task("webp", function () {
    return gulp.src("img/**/*.{png,jpg}")
        .pipe(webp({
            quality: 90
        }))
        .pipe(gulp.dest("./img"));
});

//Очистка build
gulp.task("clean", function () {
    return del("./");
});

//Копирование в build
gulp.task("copy", function () {
    return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**"
  ], {
            base: "."
        })
        .pipe(gulp.dest("./"));
});

//Запуск сборки
gulp.task("./", function (done) {
    run(
        "clean",
        "copy",
        "style",
        "js",
        "html",
        "webp",
        "images",
        done
    );
});

gulp.task("html", function () {
    return gulp.src("*.html")
        .pipe(gulp.dest("./"));
});

gulp.task("default", function () {
    server.init({
        server: "./",
        notify: false,
        open: false,
        cors: true,
        ui: false
    });

    gulp.watch("less/**/*.less", ["style"]).on("change", server.reload);
    gulp.watch("js/*.js", ["js"]).on("change", server.reload);
    gulp.watch("*.html", ["html"]).on("change", server.reload);
});