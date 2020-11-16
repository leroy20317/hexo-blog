---
title: electron
date: 2019-10-28 09:13:12
tags: electron
---
`Electron` 是一个用 `HTML`，`CSS` 和 `JavaScript` 来构建跨平台桌面应用程序的一个开源库。

### 安装

<!-- more -->


```yaml
npm install electron -D
or
yarn add electron -D
```

### 配置

在项目的根目录建一个文件`main.js`
```javascript
// 引入electron并创建一个Browserwindow
const { app, BrowserWindow } = require('source/_posts/electron/electron');
const path = require('path');
const url = require('url');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

function createWindow() {
    // 创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({ width: 1366, height: 768 });

    // 加载应用 electron-quick-start中默认的加载入口
    // mainWindow.loadURL(
    //   url.format({
    //     pathname: path.join(__dirname, 'public/index.html'),
    //     protocol: 'file',
    //     slashes: true,
    //   })
    // );

    // 加载应用 适用于 (开发环境)
    mainWindow.loadURL('http://localhost:4000');

    // 打开开发者工具，默认不打开
    // mainWindow.webContents.openDevTools();

    // 关闭window时触发下列事件.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow();
    }
});

// 你可以在这个脚本中续写或者使用require引入独立的js文件.
```

然后在`package.json`文件中修改
```yaml
    "scripts": {
        "electron-start": "electron .",
    },
    "main": "main.js"
```

### 运行

运行以下代码即可
```yaml
yarn run electron-start
```

### 打包

#### 安装插件
```yaml
npm install electron-builder -D
or
yarn add electron-builder -D
```

#### 配置

在项目的根目录建一个文件`electron-builder.yml`
```yaml
productName: electron-blog # 项目名 这也是生成的exe文件的前缀名
appId: com.electron-blog # 包名  
directories: {output: dist} # 输出文件夹
asar: false
nsis: {
  oneClick: false, # 是否一键安装
  allowElevation: true, # 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序
  allowToChangeInstallationDirectory: true, # 允许修改安装目录
  installerIcon: dist/icons/icon.ico, # 安装图标
  uninstallerIcon: dist/icons/icon.ico, # 卸载图标
  installerHeaderIcon: dist/icons/icon.ico, # 安装时头部图标
  createDesktopShortcut: true, # 创建桌面图标
  createStartMenuShortcut: true, # 创建开始菜单图标
  shortcutName: electron-blog, # 图标名称
  include: dist/script/installer.nsh # 包含的自定义nsis脚本
}
files: [public/**, main.js] # 包含的文件
dmg:
  contents:
    - {x: 410, y: 150, type: link, path: /Applications}
    - {x: 130, y: 150, type: file}
mac: {icon: dist/icons/icon.icns}
win:
  icon: dist/icons/icon.ico
  target:
    - target: nsis
      arch: [ia32]
linux: {icon: build/icons}
```

然后在`package.json`文件中修改
```yaml
    "scripts": {
        "electron-build": "electron-builder build -c" # -c 为运行electron-builder.yml文件
    },
```

修改`main.js`文件在的入口文件
```javascript

    // 加载应用 electron-quick-start中默认的加载入口
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'public/index.html'),
        protocol: 'file',
        slashes: true,
      })
    );

    // 加载应用 适用于 (开发环境)
    // mainWindow.loadURL('http://localhost:4000');
```


#### 运行

运行以下代码即可
```yaml
yarn run electron-build
```


### 问题

1. 首次build的时候会在相关`GitHub`上下载一些包，会很慢，甚至会中断并抛出403错误。
2. electron打包后的程序会是以`file协议`读取文件而不是`web协议`
    
    所以会读取文件的绝对路径`file://D:\...`
    
    同时路由`..../tags/`并不能读取到`tags`文件夹下`index.html`文件
