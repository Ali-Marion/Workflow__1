//Подключение плагинов
var gulp = require('gulp'),
    connect = require('browser-sync'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    bower = require('wiredep').stream;
 
//Запуск локального сервера
gulp.task('connect', function() {
  connect({server: { 
      baseDir: 'app'
    },
    notify: false 
  });
});

//Компиляция Sass
gulp.task('sass', function () {
  gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload({stream: true}));
});

//Отслеживание изменений в файлах
gulp.task('watch', ['connect'],function () {
  gulp.watch('app/*.html', connect.reload);
  gulp.watch('app/*/*.css', connect.reload);
  gulp.watch('app/*/*.sass', ['sass']);
  gulp.watch('app/*/*.js', connect.reload);
  gulp.watch('bower.json', connect.reload);
});
 
 //Добавление ссылок на bower-файлы
gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(bower({
        directory: "app/bower"
    }))
    .pipe(gulp.dest('app/'));
});

//Сборка проекта
gulp.task('build', function () {
  gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
  gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img/'));
  gulp.src('app/*/*.css')
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{ cascade: true }));
  return gulp.src('app/*.html')   
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('dist'));
}); 

//Задача по умолчанию 
gulp.task('default',['watch']);