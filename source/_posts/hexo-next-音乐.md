---
title: Hexo博客添加背景音乐和音乐歌单
date: 2019-10-17 15:51:01
tags:
  - hexo
  - next
---
两种插入音乐模式

### hexo-tag-aplayer 插件
 
#### 简介

<!-- more -->

一款好用的音乐播放器插件，支持 QQ 音乐、网易云音乐、虾米、酷狗、百度等平台的音乐播放。

github 地址： <a href="https://github.com/MoePlayer/hexo-tag-aplayer">https://github.com/MoePlayer/hexo-tag-aplayer</a>
 
官方文档：<a href="https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md">https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md</a>
 
#### 安装
```yaml
npm install --save hexo-tag-aplayer
or
yarn add hexo-tag-aplayer
```

#### 文章插入音乐
```ejs
{% aplayer title author url [picture_url, narrow, autoplay, width:xxx, lrc:xxx] %}
```
##### 参数
- `title` : 曲目标题
- `author`: 曲目作者
- `url`: 音乐文件 URL 地址
- `picture_url`: (可选) 音乐对应的图片地址
- `narrow`: （可选）播放器袖珍风格
- `autoplay`: (可选) 自动播放，移动端浏览器暂时不支持此功能
- `width`:xxx: (可选) 播放器宽度 (默认: 100%)
- `lrc`:xxx: （可选）歌词文件 URL 地址

#### MetingJS配置
引入 `MetingJS` 后，播放器将支持对于 QQ音乐、网易云音乐、虾米、酷狗、百度等平台的音乐播放。

在`Hexo` 配置文件`_config.yml` 中设置
```yaml
aplayer:
  meting: true
```
接着就可以通过 `meting ...` 在文章中使用 `MetingJS` 播放器：
```ejs
<!-- 简单示例 (id, server, type)  -->
{% meting "60198" "netease" "playlist" %}

<!-- 进阶示例 -->
{% meting "60198" "netease" "playlist" "autoplay" "mutex:false" "listmaxheight:340px" "preload:none" "theme:#ad7a86"%}
```
有关 `meting` 的选项列表如下:

|选项|	默认值|	描述|
|----|----|----|
|id	|必须值	|歌曲 id / 播放列表 id / 相册 id / 搜索关键字|
|server|	必须值|	音乐平台: netease, tencent, kugou, xiami, baidu|
|type|	必须值|	song, playlist, album, search, artist|
|fixed|	false|	开启固定模式|
|mini|	false|	开启迷你模式|
|loop|	all|	列表循环模式：all, one,none|
|order|	list|	列表播放模式： list, random|
|volume|	0.7|	播放器音量|
|lrctype|	0|	歌词格式类型|
|listfolded|	false|	指定音乐播放列表是否折叠|
|storagename|	metingjs|	LocalStorage 中存储播放器设定的键名|
|autoplay|	true|	自动播放，移动端浏览器暂时不支持此功能|
|mutex|	true|	该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停|
|listmaxheight|	340px|	播放列表的最大长度|
|preload|	auto|	音乐文件预载入模式，可选项： none, metadata, auto|
|theme|	#ad7a86|	播放器风格色彩设置|

### 网易云音乐 
1. 打开网易云音乐首页，然后搜索你要添加的背景音乐
    ```yaml
    http://music.163.com/
    ```

2. 生成外链播放器
    在网易云音乐页面，根据提示操作即可。
    
3. 插入
    将生成的html代码复制到需要的插入音乐的地方即可。
    
```html
<div>
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=260 height=86 src="//xxx?type=x&id=xxxxx&auto=1&height=66"></iframe>
    </div>
```
