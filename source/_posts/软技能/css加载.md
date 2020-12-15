---
title: css加载
date: 2020-12-15 10:28:19
tags:
    - 软技能
    - css
---
### css加载会造成阻塞吗？

<!--more-->

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      h1 {
        color: red !important
      }
    </style>
    <script>
      function h () {
        console.log(document.querySelectorAll('h1'))
      }
      setTimeout(h, 0)
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
    <h1>这是红色的</h1>
  </body>
</html>

```
假设： css加载会阻塞DOM树解析和渲染

假设结果: 在bootstrap.css还没加载完之前，下面的内容不会被解析渲染，那么我们一开始看到的应该是白屏，h1不会显示出来。并且此时console.log的结果应该是一个空数组。

而实际的情况是：当css还没加载完成的时候，页面显示白屏，直到css加载完成之后，红色字体才显示出来，也就是说，下面的内容虽然解析了，但是并没有被渲染出来。所以，css加载不会阻塞DOM树的解析但是会阻塞DOM树渲染。

### css加载会阻塞js运行吗？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      console.log('before css')
      var startDate = new Date()
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
    <h1>这是红色的</h1>
    <script>
      var endDate = new Date()
      console.log('after css')
      console.log('经过了' + (endDate -startDate) + 'ms')
    </script>
  </body>
</html>

```
假设: css加载会阻塞后面的js运行

预期结果: 在link后面的js代码，应该要在css加载完成后才会运行

实际结果: 位于css加载语句前的那个js代码先执行了，但是位于css加载语句后面的代码迟迟没有执行，直到css加载完成后，它才执行。这也就说明了，css加载会阻塞后面的js语句的执行。

### 原理解析
浏览器渲染的流程如下：

1. HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree
2. 将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)
3. 根据Render Tree渲染绘制，将像素渲染到屏幕上。

从流程我们可以看出来

1. DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
2. 然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
3. 由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。

### 结论
由上所述，我们可以得出以下结论:

- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行

因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:
- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
- 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
- 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
- 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

