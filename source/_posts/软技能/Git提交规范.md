---
title: Git提交规范
date: 2020-11-19 09:19:02
tags: 软技能
---
### 意义及现状

在开发过程中，Git每次提交代码，都需要写Commit message（提交说明），规范的Commit message有很多好处：

- 方便快速浏览查找，回溯之前的工作内容
- 可以直接从commit 生成Change log(发布时用于说明版本差异)

目前我们并没有对commit message进行规范，造成以下麻烦：

- 每个人风格不同，格式凌乱，查看很不方便
- 部分commit没有填写message，事后难以得知对应修改的作用

### 规范方式
为了方便使用，我们避免了过于复杂的规定，格式较为简单且不限制中英文：
```
<type>(<scope>): <subject>
// 注意冒号 : 后有空格
// 如 feat(miniprogram): 增加了小程序模板消息相关功能
```
**scope**选填表示commit的作用范围，如数据层、视图层，也可以是目录名称 **subject**用于对commit进行简短的描述 **type**表示提交类型，值有以下几种：
- feature - 新功能
- fix - 修复 bug
- docs - 文档注释
- style - 代码格式(不影响代码运行的变动)
- refactor - 重构、优化(既不增加新功能，也不是修复bug)
- perf - 性能优化
- test - 增加测试
- chore - 构建过程或辅助工具的变动
- revert - 回退
- build - 打包
