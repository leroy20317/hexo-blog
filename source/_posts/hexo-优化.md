---
title: hexo-优化
date: 2019-10-16 16:11:17
tags:
  - hexo
  - next
---
Hexo主题Next配置及加载优化

### 主题源加载优化
把在`NexT`主题的`_config.yml`里面的：
```yaml
# Uri of fonts host. E.g. //fonts.googleapis.com (Default)
host:
```

<!-- more -->

改为：
```yaml
# Uri of fonts host. E.g. //fonts.googleapis.com (Default)
host: //fonts.lug.ustc.edu.cn
```
因为`fonts.lug.ustc.edu.cn`是中科大的源，相比之前能快一下

### 压缩网页静态资源(hexo-neat)

#### 在站点根目录下安装`hexo-neat`
```yaml
npm install hexo-neat --save
or 
yarn add hexo-neat
```

#### 站点配置文件添加相关配置
进入`_config.yml`文件的末尾，配置
```yaml
# hexo-neat
# 博文压缩
neat_enable: true
# 压缩html
neat_html:
  enable: true
  exclude:
# 压缩css
neat_css:
  enable: true
  exclude:
    - '**/*.min.css'
# 压缩js
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/*.min.js'
    - '**/jquery.fancybox.pack.js'
    - '**/index.js'
    - '**/muse.js'
    - '**/next-boot.js'
    - '**/utils.js'
```
#### 报错及相应解决
1. 跳过压缩文件的正确配置方式
    如果按照官方插件的文档说明来配置`exclude`，你会发现完全不起作用。这是因为配置的文件路径不对，压缩时找不到你配置的文件，自然也就无法跳过了。你需要给这些文件指定正确的路径，万能的配置方式如下：
    ```yaml
    neat_css:
    enable: true
    exclude:
        - '**/*.min.css'
    ```
   
2. 压缩html时不要跳过.md文件
    .md文件就是我们写文章时的markdown文件，如果跳过压缩.md文件，而你又刚好在文章中使用到了NexT自带的tab标签，那么当hexo在生成静态页面时就会发生解析错误。这会导致使用到了tab标签的页面生成失败而无法访问。
    
3. 压缩html时不要跳过.swig文件
    .swig文件是模板引擎文件，简单的说hexo可以通过这些文件来生成对应的页面。如果跳过这些文件，那么你将会发现，你的所有页面完全没有起到压缩的效果，页面源代码里依然存在着一大堆空白。
    
4. 点击的桃心效果消失
    ```yaml
    # 压缩js
    neat_js:
      enable: true
      mangle: true
      output:
      compress:
      exclude:
        - '**/*.min.js'
        - '**/jquery.fancybox.pack.js'
        - '**/index.js'  
        - '**/love.js'
    ```
   js文件报错
   在上面的代码底部加入如下代码
   ```yaml
    - '**/xxx.js'
    ```
5. jquery pjax min js报错
    我这里的 jquery pjax min js是指的加入pjax前需要以来的两个cdn文件，一个是jq，一个是它，我将它下载到了本地，不要在意这些细节~
    
    同样加入如下代码
    ```yaml
    - '**/jquery_pjax_min_js.js'
    ```
   
注: 由于hexo-neat插件运用的是uglifyjs，故对es6不兼容

### 压缩网页静态资源(gulp)

#### 在站点根目录下安装
```yaml
yarn add gulp -D
yarn add gulp-minify-css -D
yarn add gulp-uglify -D
yarn add gulp-htmlmin -D
yarn add gulp-htmlclean -D
yarn add gulp-imagemin -D
yarn add @babel/core -D
yarn add gulp-babel -D
yarn add @babel/preset-env -D
yarn add @babel/plugin-transform-strict-mode -D

or

npm install gulp --save
npm install gulp-minify-css -D
npm install gulp-uglify -D
npm install gulp-htmlmin -D
npm install gulp-htmlclean -D
npm install gulp-imagemin -D
npm install @babel/core -D
npm install gulp-babel -D
npm install @babel/preset-env -D
npm install @babel/plugin-transform-strict-mode -D
```

问题：如果安装`gulp-imagemin`错误请执行以下语句
```yaml
yarn add gulp-imagemin --unsafe-perms
```

#### 创建`gulpfile.js`文件
在 `Hexo` 站点下新建`gulpfile.js`文件，文件内容如下：
```javascript
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');

// 压缩css文件
gulp.task('minify-css', function (done) {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
    done();
});

// 压缩html文件
gulp.task('minify-html', function (done) {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'));
    done();
});

// 压缩js文件
gulp.task('minify-js', function (done) {
    return gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
        .pipe(babel({
            //将ES6代码转译为可执行的JS代码
            presets: ['@babel/preset-env'] // es5检查机制
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
    done();
});

// 压缩 public/images 目录内图片(Version<3)
// gulp.task('minify-images', function () {
//     gulp.src('./public/images/**/*.*')
//         .pipe(imagemin({
//             optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//             progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//             interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//             multipass: false, //类型：Boolean 默认：false 多次优化svg直到完全优化
//         }))
//         .pipe(gulp.dest('./public/images'));
// });

// 压缩 public/images 目录内图片(Version>3)
gulp.task('minify-images', function (done) {
    gulp.src('./public/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./public/images'));
    done();
});

//4.0以前的写法 
//gulp.task('default', [
//  'minify-html', 'minify-css', 'minify-js', 'minify-images'
//]);
//4.0以后的写法
// 执行 gulp 命令时执行的任务
gulp.task('default', gulp.series(gulp.parallel('minify-html', 'minify-css', 'minify-js', 'minify-images')), function () {
    console.log("----------gulp Finished----------");
    // Do something after a, b, and c are finished.
});
```

#### 创建`.babelrc`文件
在 `Hexo` 站点下新建`.babelrc`文件，文件内容如下：
```json5
{
    "presets": [
        ["@babel/preset-env", {
            "modules": false,
            "targets": {
                "browsers": ["> 1%", "last 2 versions", "ie >= 11"]
            }
        }
        ]
    ],
    "plugins": ["@babel/plugin-transform-strict-mode"]
}
```

#### 运行
只需要每次在执行 `build` 命令后执行 `gulp` 就可以实现对静态资源的压缩
```yaml
hexo generate
gulp
```

### 图片懒加载
懒加载，在需要的时候才加载图片，而不是一次性加载完整个页面的图片
使用lazyload插件，适用于本地图片很多的情况

#### 配置
在`Hexo`博客目录下，执行以下命令：
```yaml
npm install hexo-lazyload --save
or
yarn add hexo-lazyload
```
然后在配置文件 `_config.yml` 中添加配置:
```yaml
lazyload:
  enable: true
  onlypost: false
  # loadingImg: #可选 eg. ./images/loading.png
```
参数：

`onlypost` 
- 是否仅文章中的图片做懒加载, 如果为 false, 则主题中的其他图片, 也会做懒加载, 如头像, logo 等任何图片.

`loadingImg` 
- 图片未加载时的代替图

- 默认路径: `/js/lazyload-plugin/loading.svg`

- 如果需要自定义，添填入 `loading` 图片地址，如果是本地图片，不要忘记把图片添加到主题目录下。Next 主题需将图片放到 `\themes\next\source\images` 目录下, 然后引用
