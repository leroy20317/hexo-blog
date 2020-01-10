---
title: jenkins-部署git项目
date: 2019-10-23 16:08:47
tags:
    - jenkins
    - 部署
    - 服务器
---
运用jenkins部署git项目

### 创建任务

在jenkins页面中点击`新建任务`


<!-- more -->


输入`任务名`并`构建一个自由风格的软件项目`


### 配置

进入建好的项目中并进入`配置`页面

找到`源码管理`部分

![config_git](/images/jenkins/config_git.png)

选择`git`选项并配置相关参数 {% post_link jenkins-配置 如何配置git %}


### 构建

在`配置`页面找到`构建`部分

1. 选择`增加构建步骤 -> 执行 shell`

    ![config_shell](/images/jenkins/config_shell.png)

    执行shell脚本构建项目

2. 选择`增加构建步骤 -> Send files or execute commands over SHH`

    ![config_ssh](/images/jenkins/config_ssh.png)
    
    选择之前配置好的服务器 {% post_link jenkins-配置 如何配置SHH %}
    
    参数说明：
    
    - Source files： 发送给服务器的文件
    - Remote directory： 保存在服务器中的文件夹路径
    - Exec command： 在服务器执行的操作
    
3. 保存


### 运行

返回`项目页面`并点击`立即构建`即可
    

