//提前声明好路径常量
var app = {
  srcPath: 'src/',
  distPath: 'dist/'
};


var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),//img压缩
    spriter=require('gulp-css-spriter-dookay');//合并图片
var connect = require('gulp-connect');
var open = require('open');
var htmlmin = require('gulp-htmlmin');//html压缩
var cssmin = require('gulp-clean-css');// css 压缩(最新的，gulp-minify-css 已弃用)
var concat = require('gulp-concat');//合并文件 --合并只是放一起--压缩才会真正合并相同样式
var sass = require('gulp-sass');//sass转化
var less = require('gulp-less');//less转化
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');//js压缩
var babel = require("gulp-babel");//es6转化
var autoprefixer = require('gulp-autoprefixer');//给 CSS 增加前缀。解决某些CSS属性不是标准属性，有各种浏览器前缀的情况
////////////////////////////image/////////////////////
gulp.task('image', function () {
  var opt = {
    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
    multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
  };
 
    gulp.src(app.srcPath + 'img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest(app.distPath + 'img'));
});
////////////////////把小图标做成雪碧图//////////////////////

// gulp.task('hebing',function(){
//   var hebing = {
//     // 生成的spriter的位置
//    spriteSheet: 'dist/img/spritesheet/sprite.png',
//    // 生成样式文件图片引用地址的路径
//    pathToSpriteSheetFromCSS: '../img/*.png',
//    spritesmithOptions: {
//        padding: 10
//    }
//   }
//   gulp.src('dist/css/main.css')
//   .pipe(spriter(hebing))
//   .pipe(gulp.dest('dist/css'))
// })

////////////////////////////////搬运//////////////////////
gulp.task('ban',function(){
  gulp.src(app.srcPath + 'lib/**')
    .pipe(gulp.dest(app.distPath + 'lib'))
})
gulp.task('yun',function(){
  gulp.src(app.srcPath +'**/*.html')
    .pipe(gulp.dest(app.distPath))
})
/////////////////////html////////////////////


gulp.task('htmlmin', function () {
  var options = {
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
  };
  gulp.src([app.srcPath +'*.htm',app.srcPath +'*.html'])           
      .pipe(htmlmin(options))
      .pipe(gulp.dest(app.distPath ));
});

///////////////////////////////css////////////////////////
gulp.task('cssmin',function(){
  gulp.src(app.srcPath +'css/*')
  .pipe(sass())
  .pipe(less())
  .pipe(autoprefixer({
    browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
    cascade: true, //是否美化属性值 默认：true 像这样：
    //-webkit-transform: rotate(45deg);
    //        transform: rotate(45deg);
    remove:true //是否去掉不必要的前缀 默认：true 
  }))
  .pipe(concat('main.css')) //合并css
  .pipe(cssmin())//压缩
  .pipe(gulp.dest(app.distPath +'css'));
})
///////////////////////////////js//////////////////////////

gulp.task('jsmin',function(){
    gulp.src(app.srcPath +'js/*')
    .pipe(rename({suffix: '.min'}))
    .pipe(babel())
    .pipe(uglify())//压缩
    .pipe(gulp.dest(app.distPath +'js'));
})

// /////////////////////////server/////////////////////////


gulp.task('server', function () {
  // 设置服务器
  connect.server({
      root: [app.distPath],//要运行那个目录
      livereload: true,// 是否热更新
      port: 9999 // 端口号
  });

  // 监听哪些任务
  gulp.watch(app.srcPath + '*.html', ['html']);
  // gulp.watch(app.srcPath + 'm/*.html', ['mobile']);
  gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
  // gulp.watch(app.srcPath + 'm/js/**/*.js', ['mobile-js']);
  gulp.watch(app.srcPath + 'img/**/*', ['image']);
  // gulp.watch(app.srcPath + 'style/**/*.scss', ['scss']);
  // gulp.watch(app.srcPath + 'm/style/**/*.scss', ['mobile-css']);
  open('http://localhost:9999');
});
gulp.task('default', ['image','htmlmin','ban','yun','jsmin','cssmin','server']);