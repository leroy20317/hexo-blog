---
title: rem布局
date: 2020-11-24 09:45:06
tags:
    - 软技能
    - css
---
### rem布局方式

<!--more-->

移动端的屏幕大小各异,尤其是安卓机,千奇百怪,各种尺寸的机型都有,而且有1倍屏,2倍屏，3倍屏之分，我们希望找到一种完美适配各种机型的方案。rem是现在主流的移动端自适应布局方案。

#### 媒体查询
媒体查询, 设定每种屏幕对应的font-size
```css
@media screen and (min-width: 375px){
    html {
        font-size: 14.0625px;   
    }
}
@media screen and (min-width: 360px){
    html {
        font-size: 13.5px;
    }
}
@media screen and (min-width: 320px){
    html {
        font-size: 12px;
    }
}
html {
    font-size: 16px;
}
```

#### js设置
```javascript
document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 + 'px';
```

#### vw
```css
/* 750设计图 */
html{font-size: 13.333333vw}
```
计算： 100vw / 750px * 100倍 = 13.33333
即： 100px = 13.33333333vw

提示
- 屏幕宽度除以 750 的时候，这个比例的值可能非常小，而浏览器都有最小字体的限制，所以一般我们都是放大一百倍

### 局限
 iOS与Android平台的适配方式背后隐藏的设计哲学是这样的：**阅读文字时**，可读性较好的文字字号行距等绝对尺寸数值组合与文字所在媒介的绝对尺寸关系不大。（可以这样简单理解：A4大小的报纸和A3大小甚至更大的报纸，舒适的阅读字号绝对尺寸是一样的，因为他们都需要拿在手里阅读，在手机也是上同理）；**在看图片视频时**，图片、视频的比例应该是固定的，不应该出现拉伸变形的情况。而rem用在字号时，使字号在不同屏幕上的绝对尺寸不一致，违背了设计哲学。
