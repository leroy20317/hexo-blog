---
title: jenkins
date: 2019-10-17 19:00:31
tags:
    - jenkins
    - 部署
    - 服务器
---

### 概述
<a href="https://jenkins.io/zh/">Jenkins</a>是一款开源 CI&CD 软件，用于自动化各种任务，包括构建、测试和部署软件。

官方文档: https://jenkins.io/zh/doc/

### 安装

<!-- more -->

#### window系统
在jenkins官网<a href="https://jenkins.io/zh/download/">下载</a>选择window版本安装包安装即可。

### linux系统

#### jdk
由于jenkins基于java，所以需要安装jdk包

1. 查看系统版本命令
    ```yaml
    cat /etc/issue
    ```

2. 查看yum包含的jdk版本
    ```yaml
    yum search java 或者 yum list java*
    ```
   
3. 安装jdk
    选择查找到的jdk版本然后安装
    ```yaml
    yum install java-xxxxxx
    ```
   
4. 配置全局变量
    ```yaml
    vim /etc/profile
    ```
   复制以下三行到文件中，按esc退出编辑模式，输入:wq保存退出（这里的JAVA_HOME以自己实际的目录为准）
   ```yaml
    export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.171-8.b10.el6_9.x86_64
    export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
    export PATH=$PATH:$JAVA_HOME/bin
    ```
   全局变量立即生效
    ```yaml
    source /etc/profile
    ```
   
5. 查看安装jdk是否成功
    ```yaml
    vim /etc/profile
    ```
   
#### Yum安装jenkins

1. yum源导入
    ```yaml
    #添加Yum源
    sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
    
    #导入密钥
    sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
    ```
   
2. 安装
    ```yaml
    sudo yum install -y jenkins
    ```
   
3. 开放端口

    Jenkins站点的默认监听端口是8080
    ```yaml
    # CentOS 7
    sudo firewall-cmd --add-port=8080/tcp --permanent
    sudo firewall-cmd --reload
   
    # CentOS 6
    /sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
    /etc/init.d/iptables save      # 保存
    /etc/init.d/iptables restart
    ```
   若防火墙关闭则不需要开放
   
4. 启动

    浏览器输入 http://ip address:8080 即可访问Jenkins。
    
5. 使用

    根据浏览器页面中的引导流程配置即可。
    
6. 配置域名
    
    如需用nginx配置域名，只需在nginx中配置端口转发即可。
    
     {% post_link nginx 移步nginx %}