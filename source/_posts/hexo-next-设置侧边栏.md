---
title: Hexo-NexT 特定文章不显示侧边栏
date: 2019-10-17 15:21:53
tags:
  - hexo
  - next
---

`NexT` 主题的侧边栏可以在`_config.yml`里修改：
```yaml
# Sidebar Display, available value (only for Muse | Mist):
  display: post
  #display: always
  #display: hide
  #display: remove
```
<!-- more -->

但是这里只能修改所有post的设置，不能对特定文章进行修改。

可以在`.../themes/next/layout/_marcro/sidebar.swig`文件中找到下面内容
```ejs
{% set display_toc = is_post and theme.toc.enable or is_page and theme.toc.enable %}
```
将其修改为
```ejs
{% set display_toc = is_post and theme.toc.enable and !page.no_toc or is_page and theme.toc.enable and !page.no_toc %}

```

代码中的`page.no_toc`就是我们在`Front-matter`中添加的`no_toc`值。

所以在需要隐藏侧边栏的文章的`Front-matter`中加上：
```yaml
no_toc: true
```