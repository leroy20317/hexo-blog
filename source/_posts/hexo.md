---
title: hexo
date: 2019-10-11 15:16:27
tags: hexo
---
### 概述
Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，根据主题生成静态网页。

### 安装
使用 npm 或者 yarn 即可完成 Hexo 的安装。
<!-- more -->
```
npm install -g hexo-cli 
or 
yarn add global hexo-cli
```

### 使用
安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```
hexo init <folder>
cd <folder>
npm install
```

新建完成后，指定文件夹的目录如下：

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### 常用操作

```
hexo clean
```
清除缓存文件和已生成的静态文件
```
hexo new post <title>
```
创建文章, hexo的文件符合markdown语法。
```
hexo generate
```
生成静态文件，可以简写为 hexo g
```
hexo server
```
启动服务器，可以简写为 hexo s.默认情况下，访问网址为：http://localhost:4000/.
