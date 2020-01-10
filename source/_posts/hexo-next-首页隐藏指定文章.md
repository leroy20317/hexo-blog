---
title: hexo-next-首页隐藏文章
date: 2019-10-17 18:00:31
tags:
  - hexo
  - next
---
在首页隐藏指定文章

### 修改index.swig
进入`themes\next\layout\index.swig` 将:

<!-- more -->

```ejs
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
        {{ partial('_macro/post.swig', {is_index: true}) }}
    {% endfor %}
  </section>
```

改为：
```ejs
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
        {% if not post.hide %}
            {{ partial('_macro/post.swig', {is_index: true}) }}
        {% endif %}
    {% endfor %}
  </section>
```
由于代码中参数用到了`hide`则在需要隐藏文章的页面中的`front-matter`中加入
```yaml
hide: true
```