---
title: hexo主题next相关
date: 2019-10-11 16:18:38
tags: 
  - hexo
  - next
---
### 概述
next为hexo下的一个主题。

### 下载
如果你熟悉 `Git`， 建议你使用 克隆最新版本 的方式，之后的更新可以通过 `git pull` 来快速更新， 而不用再次下载压缩包替换。

<!-- more -->

在终端窗口下，定位到 `Hexo` 站点目录下。使用 `Git checkout` 代码：
```
cd your-hexo-site
git clone https://github.com/theme-next/hexo-theme-next.git themes/next
```

### 启用
下载完成后在 `_config.yml` 中修改`theme`字段。
```
theme: next
```
到此，NexT 主题安装完成。运行之前使用 `hexo clean` 来清除 `Hexo` 的缓存。

### 常用操作

#### 选择 Scheme
Scheme 是 NexT 提供的一种特性，借助于 Scheme，NexT 为你提供多种不同的外观。同时，几乎所有的配置都可以 在 Scheme 之间共用。目前 NexT 支持三种 Scheme，他们是：

- `Muse` - 默认 Scheme，这是 NexT 最初的版本，黑白主调，大量留白
- `Mist` - Muse 的紧凑版本，整洁有序的单栏外观
- `Pisces` - 双栏 Scheme，小家碧玉似的清新

Scheme 的切换通过更改 主题配置文件，搜索 `scheme` 关键字。 你会看到有三行 `scheme` 的配置，将你需用启用的 `scheme` 前面注释 # 去除即可。
```yaml
#scheme: Muse
#scheme: Mist
scheme: Pisces
```

#### 设置 语言
将 `language` 设置成你所需要的语言。建议明确设置你所需要的语言，例如选用简体中文
```
language: zh-Hans
```
#### next主题页面生成
1. 修改主题配置文件
    ```yaml
    menu:
      home: / || home   #主页
      about: /about/ || user  #关于
      tags: /tags/ || tags   #标签
      categories: /categories/ || th  #分类
      archives: /archives/ || archive  #归档
      #schedule: /schedule/ || calendar  #日程表
      #sitemap: /sitemap.xml || sitemap   #站点地图
      #commonweal: /404/ || heartbeat    #公益404
    ```
    第一个参数为路由  第二个参数为图标名字
2. 生成`about`页面

    终端回到blog的根目录.运行
    ```
    hexo new page about
    ```
3. 生成`tags`页面

    终端回到blog的根目录.运行
    ```
    hexo new page tags
    ```
    设置index.md type： tags
4. 生成`categories`页面

    终端回到blog的根目录.运行
    ```
    hexo new page categories
    ```
    设置index.md type： categories
 
**注：** `tags`和`categorise`页面不用自己布局，会自动根据blog的属性布局好

#### 站内搜索功能的实现
首先，安装插件 hexo-generator-searchdb
```
npm install hexo-generator-searchdb --save
or  
yarn add hexo-generator-searchdb
```
接着，进入站点配置文件`_config.yml`,在最后新增以下内容
```yaml
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
最后，打开主题配置文件`_config.yml`,搜索`local_search`,其值改为true：
```yaml
# Local search
local_search:
  enable: true
```

#### 头像设置
修改主题配置文件中`avatar`字段:
```yaml
avatar:
  # in theme directory(source/images): /images/avatar.gif
  # in site  directory(source/uploads): /uploads/avatar.gif
  # You can also use other linking images.
   # url: http://static.leroy.net.cn/image/base_avatar.jpg
   # url: /images/header.jpg     #相对于 /next/source/images/下文件
  # If true, the avatar would be dispalyed in circle. 
  rounded: false   #设置图片是否为圆形，当图片为正方形时为圆，否则为椭圆
  # The value of opacity should be choose from 0 to 1 to set the opacity of the avatar.
  opacity: 1 #图片的透明度
  # If true, the avatar would be rotated with the cursor.
  rotated: false  #设置鼠标移到图片上后头像是否转动
```

#### 点击个人头像回到主页面
打开文件`/blog/themes/next/layout/_partials/sidebar/site-overview.swig`,然后，修改以下内容：
```html
+ <a href="/">
    <img class="site-author-image" itemprop="image"
       src="{{ url_for( theme.avatar.url | default(theme.images + '/avatar.gif') ) }}"
       alt="{{ author }}" />
+ </a>
```

#### 社交栏设置
在主题配置文件中，搜索`social`，定位到如下代码段，把`social`的注释取消掉，需要显示什么社交网站，写上网站名+网址即可。
```yaml
social:
  GitHub: https://github.com/yourname || github   #网站名：网址 ||图标名
  简书: http://www.jianshu.com || heartbeat
  #E-Mail: mailto:yourname@gmail.com || envelope
  #Google: https://plus.google.com/yourname || google
  #Twitter: https://twitter.com/yourname || twitter
  #FB Page: https://www.facebook.com/yourname || facebook
  #VK Group: https://vk.com/yourname || vk
  #StackOverflow: https://stackoverflow.com/yourname || stack-overflow
  #YouTube: https://youtube.com/yourname || youtube
  #Instagram: https://instagram.com/yourname || instagram
  #Skype: skype:yourname?call|chat || skype
```
#### 自定义样式
在`_config.yml`或`next.yml`中，设置
```yaml
custom_file_path:
  style: source/_data/styles.styl
```
然后，将自定义CSS放进`source/_data/styles.styl`文件中即可
**注：** 此路径为相对blog根路径

#### 文章背景出现阴影边框
打开`source/_data/styles.styl`文件，放入以下代码：
```css
/*主页文章添加阴影效果*/
 .post-block {
   margin-top: 60px;
   margin-bottom: 60px;
   padding: 25px;
   -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
   -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
  }
```

#### 点击出现爱心功能
在`/themes/next/source/js/src`下新建文件 `love.js` ，接着把下面的代码拷贝粘贴到 `love.js` 文件中：
```javascript
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```
打开`/blog/themes/next/layout/_layout.swig`文件，在该文件的最后增加以下代码：
```html
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/love.js"></script>
```

#### 设置 阅读全文 
1. 在文章中使用 
     ```
    <!-- more -->
    ```
    手动进行截断，Hexo 提供的方式
2. 在文章的 `front-matter` 中添加 `description`，并提供文章摘录
3. 自动形成摘要，在主题 `_config.yml` 中添加：
    ```yaml
    auto_excerpt:
      enable: true
      length: 150
    ```
    默认截取的长度为 150 字符，可以根据需要自行设定
    
**注：** 若需要设置样式，则在`source/_data/styles.styl`文件中修改
```css
.post-button{
  /*...*/
}
.post-button .btn{
  /*...*/
}
```

#### 为文章中的代码块增加一键复制功能
在next v6.3.0 版本中，这个功能已经是集成了的，进入站点配置文件，搜索`copy_button`。把它的值改为true即可：
```yaml
# Add copy button on codeblock
  copy_button:copy
    enable: true  #是否开启复制功能
    # Show text copy result
    show_result: true #是否显示提示的复制结果
```

#### 文章结尾提示 “本文结束”
在文件夹`\themes\next\layout\_macro`中新建`passage-end-tag.swig`文件，并在文件中增加以下代码：
```ejs
<div>
    {% if not is_index %}
        <div style="text-align:center;color: #555;font-size:14px;">-------------The End-------------</div>
    {% endif %}
</div>
```
接着打开`\themes\next\layout\_macro\post.swig`文件，再这个地方增加如下代码：
```ejs
 {#####################}
 {### END POST BODY ###}
 {#####################}

+ <div>
+  {% if not is_index %}
+    {% include 'passage-end-tag.swig' %}
+  {% endif %}
+ </div>

 {% if theme.wechat_subscriber.enabled and not is_index %}
   <div>
     {% include 'wechat-subscriber.swig' %}
   </div>
 {% endif %}
```
最后打开主题 `_config.yml` ，在文件的最后增加如下代码：
```yaml
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```

#### 增加版权信息
如需要在底部做一个版权申明：

next主题中现在已经是集成了这个功能的了，在主题配置文件中搜索`copyright`,并把`enable`的值改为true即可.

#### 修改标签样式
默认的标签前面是一个#号，我们把它改成标签的符号：

打开主题配置文件，在文件中搜索`tag_icon`,并把值改成true即可：
```yaml
# Use icon instead of the symbol # to indicate the tag at the bottom of the post
  tag_icon: true
```
在文件最后增加下面代码：
```css
.posts-expand .post-tags a {
    border-bottom: none;
}
```

#### 修改底部作者图标为跳动的红心
打开主题`_config.yml`,搜索`animated`:

把 `icon` 区域的代码做如下修改：
```yaml
# Icon between year and copyright info.
 icon:
   # Icon name in fontawesome, see: https://fontawesome.com/v4.7.0/icons
   # `heart` is recommended with animation in red (#ff0000).
   name: heart
   # If you want to animate the icon, set it to true.
   animated: true
   # Change the color of icon, using Hex Code.
   color: "#ff0000"
```

#### 隐藏下方的强力驱动和主题信息
进入`/blog/themes/next/layout/_partials/footer.swig`文件，注释掉关于这部分的信息即可：
```ejs
{% if theme.footer.powered.enable %}
 + <!-- 
  <div class="powered-by">{#
  #}{{ __('footer.powered', '<a class="theme-link" target="_blank"' + nofollow + ' href="https://hexo.io">Hexo</a>') }}{% if theme.footer.powered.version %} v{{ hexo_env('version') }}{% endif %}{#
#}</div>
{% endif %}

{% if theme.footer.powered.enable and theme.footer.theme.enable %}
  <span class="post-meta-divider">|</span>
{% endif %}

{% if theme.footer.theme.enable %}
  <div class="theme-info">{#
  #}{{ __('footer.theme') }} &mdash; {#
  #}<a class="theme-link" target="_blank"{{ nofollow }} href="https://github.com/theme-next/hexo-theme-next">{#
    #}NexT.{{ theme.scheme }}{#
  #}</a>{% if theme.footer.theme.version %} v{{ version }}{% endif %}{#
#}</div>
+ -->
{% endif %}
```
或者直接修改主题`_config.yml` 下的 `powered` 及  `theme` 字段
```yaml
footer:
  powered:
    # Hexo link (Powered by Hexo).
    enable: false
    # Version info of Hexo after Hexo link (vX.X.X).
    version: true

  theme:
    # Theme & scheme info link (Theme - NexT.scheme).
    enable: false
    # Version info of NexT after scheme info (vX.X.X).
    version: true
```

#### 网站底部字数统计
具体方法实现

安装插件 `hexo-wordcount`
```yaml
npm install hexo-wordcount --save
or
yarn add hexo-wordcount
```
然后在`/themes/next/layout/_partials/footer.swig`文件尾部加上：
```html
<div class="theme-info">
  <div class="powered-by"></div>
  <span class="post-count">博客全站共{{ totalcount(site) }}字</span>
</div>
```

#### 增加本站运行时间
进入`/blog/themes/next/layout/_partials/footer.swig`文件，在文件合适的地方放上如下代码：
```html
<div id="days"></div>
<script>
function show_date_time(){
    window.setTimeout("show_date_time()", 1000);
    BirthDay=new Date("04/17/2018 15:13:14");//修改为自己的blog建站时间
    today=new Date();
    timeold=(today.getTime()-BirthDay.getTime());
    sectimeold=timeold/1000;
    secondsold=Math.floor(sectimeold);
    msPerDay=24*60*60*1000;
    e_daysold=timeold/msPerDay;
    daysold=Math.floor(e_daysold);
    e_hrsold=(e_daysold-daysold)*24;
    hrsold=setzero(Math.floor(e_hrsold));
    e_minsold=(e_hrsold-hrsold)*60;
    minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
    seconds=setzero(Math.floor((e_minsold-minsold)*60));
    document.getElementById('days').innerHTML="本站已安全运行"+daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒";
}
function setzero(i){
    if (i<10)
    {i="0" + i}
    return i;
}
show_date_time();
</script>
```

#### 字数统计和阅读时长
安装插件 `hexo-symbols-count-time`
```yaml
npm install hexo-symbols-count-time --save
or 
yarn add hexo-symbols-count-time
```
修改 站点下配置
```yaml
symbols_count_time:
 #文章内是否显示
  symbols: true
  time: true
 # 网页底部是否显示
  total_symbols: true
  total_time: true
```


修改 主题配置文件
```yaml
# Post wordcount display settings
# Dependencies: https://github.com/theme-next/hexo-symbols-count-time
symbols_count_time:
  separated_meta: true
  #文章中的显示是否显示文字（本文字数|阅读时长） 
  item_text_post: true
  #网页底部的显示是否显示文字（站点总字数|站点阅读时长） 
  item_text_total: false
  # Average Word Length (chars count in word)
  awl: 4
  # Words Per Minute
  wpm: 275
```

#### 增加站点访问人数和总访问量
打开主题配置文件，搜索`busuanzi_count`，将`enable`的值改为true即可。
```yaml
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: user
  total_views: true
  total_views_icon: eye
  post_views: true
  post_views_icon: eye
```