---
title: nginx
date: 2019-10-23 17:17:52
tags:
    - 部署
    - 服务器
---
CENTOS 6.x/7.x yum安装配置Nginx

### 安装

使用 `yum` 安装是在线安装，直接使用命令 `yum -y install nginx` 安装即可


<!-- more -->


### 启动
```yaml
service nginx start
```

### 停止
```yaml
service nginx stop 
```

### 重启
```yaml
service nginx restart
```

### Nginx 目录
```yaml
/etc/nginx/conf.d # 配置文件目录 
/usr/share/nginx/html/ # 静态资源目录
```

### 配置
1. 打开 `Nginx` 配置文件 `/etc/nginx/conf/nginx.conf`, 在 `http` 范围引入虚拟主机配置文件如下:
    ```yaml
    vim /etc/nginx/conf/nginx.conf
    # 引入虚拟服务器配置文件
    include conf/conf.d/*.conf;
    ```
   
2. 进入 `/etc/nginx/conf` 目录,创建虚拟主机配置文件目录 `conf.d`
    ```yaml
    cd /usr/local/nginx/conf
    mkdir conf.d
    ```
   
3. 添加配置文件
    ```yaml
    touch  $host.conf
    ```
    内容如下：
    ```yaml
    server {
        listen       80;
        server_name  blog.leroy.net.cn;
    
        #access_log  /var/log/nginx/host.access.log  main;
        #charset koi8-r;
    
        location / {
            root   /usr/share/nginx/html/blog;
            index  index.html index.htm index.php;
        }
    
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html/blog
        }
        location ~ \.php$ {
            root           /usr/share/nginx/html/blog;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  /usr/share/nginx/html/blog$fastcgi_script_name;
            include        fastcgi_params;
        }
    }
    ```
   如需要端口的转发则需配置：
   ```yaml
    server
        {
            listen 80;
            #listen [::]:80;
            server_name jenkins.leroy.net.cn ;
    
            index index.html index.htm index.php default.html default.htm default.php;
    
            include rewrite/none.conf;
            #error_page   404   /404.html;
    
            # Deny access to PHP files in specific directory
            #location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }
    
            include enable-php.conf;
    
            proxy_set_header        Host $host:$server_port;
            proxy_set_header        X-Real-IP $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header        X-Forwarded-Proto $scheme;
    
             location / {
    
        # Fix the "It appears that your reverse proxy set up is broken" error.
            proxy_pass http://127.0.0.1:20317;
        proxy_read_timeout  90;
    
        proxy_redirect      http://127.0.0.1:20317 http://jenkins.leroy.net.cn;
    
        # Required for new HTTP-based CLI
        proxy_http_version 1.1;
        proxy_request_buffering off;
        # workaround for https://issues.jenkins-ci.org/browse/JENKINS-45651
        add_header 'X-SSH-Endpoint' 'jenkins.domain.tld:50022' always;
            }
    
            location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
            {
                proxy_pass http://127.0.0.1:20317;
                expires      30d;
            }
    
            location ~ .*\.(js|css)?$
            {
                proxy_pass http://127.0.0.1:20317;
                expires      12h;
            }
    
            location ~ /.well-known {
                allow all;
            }
    
            location ~ /\.
            {
                deny all;
            }
    
            access_log  /home/wwwlogs/jenkins.leroy.net.cn.log;
        }
    
    ```
   
4. 重启服务
```yaml
nginx -s reload
```