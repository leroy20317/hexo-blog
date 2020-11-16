---
title: jenkins-配置
date: 2019-10-18 16:59:25
tags:
    - jenkins
    - 部署
    - 服务器
---
jenkins相关配置

### 更改默认端口8080


#### 编辑文件`/etc/sysconfig/jenkins`
进入服务器，输入以下命令:

<!-- more -->


```yaml
vim /etc/sysconfig/jenkins
```
找到代码
```yaml
JENKINS_PORT='8080'
```
修改成需要的端口，保存，退出
 
  
#### 重启jenkins服务
```yaml
service jenkins restart
```
    
### 安装git
#### 在服务器用`yum`安装`git`
```yaml
yum install git
```
输入`git --version`检查git是否安全完成，以及查看其版本号。

yum安装git被安装在`/usr/libexec/git-core`目录下。
   
#### 配置`jenkins git`
1. 在服务器生成密钥

    生成的公钥文件在`/root/.ssh/id_rsa.pub`

    私钥文件在`/root/.ssh/id_rsa.pub`

2. 将公钥加入到`github`项目中

    并进入jenkins页面

    `jenkins -> 凭据 -> 系统 -> 全局凭据 -> 添加凭据`

    选择 `SSH Username with private key` 
    
    在`key框内`填写公钥并保存
    ![git_key](/images/jenkins/git_key.png)
   
#### 配置`SSH Server`
1. 安装插件

    进入`Jenkins`的`系统管理 -> 管理插件`页面，选择`可选插件`
    
    搜索`Publish over SSH`，并按流程安装好。
    
2. 配置ssh

    进入`Jenkins`的`系统管理 -> 系统设置`页面并找到`Publish over SSH`项
    ![ssh_server](/images/jenkins/ssh_server.png)
    
    参数说明：
    
    - Name：SSH节点配置的名称
    - Hostname：通过SSH连接到的机器的主机名或IP
    - Username：SSH服务使用的用户名，使用key进行连接时为key指定的用户名
    - Remote Derictory：运程机器上真实存在的目录，并且“Username”指定的用户要有访问此目录的权限，插件将把文件传送到此目录下。
    - Passphrase：SSH的密码
    - key：SSH私钥
    
    
3. 保存后退出