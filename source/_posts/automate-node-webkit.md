---
title: 前端工作流程自动化—node-webkit打包自动化工具
date: 2015-06-23 15:24:34
tags: automate,workflow,node-webkit
---

![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/21.png)
## 这货能干嘛？
> node-webkit（现改名为[NW.js](https://nwjs.io/)）是基于 [Chromium](https://www.chromium.org/) 和 [node.js](https://nodejs.org/en/) 开发的应用。通过它，你可以使用HTML5、JavaScript、node.js模块来编写本地应用程序。

## 然它的好处还有这些：

- 解除了浏览器 沙盒 限制  
  跨域操作，本地文件写入操作，这些原本前端无法解决的问题。
- 可使用node.js 
  除了node.js本身的特性，意味着npm中那么多的扩展可以供你使用。
- node-webkit还实现了本地化的API 
  例如菜单栏，系统的托盘图标支持，系统剪贴板等。
- 跨平台  
  支持 Linux, Mac OS X 和 Windows

### 我们用它做了什么？
通过这个神器，我们把一些内部的繁琐的工作封装打包成可执行的桌面应用，一次打开即可使，无需安装。

### 如何用它来开发一个本地应用？

#### 1.下载最新版本[node-webkit](https://nwjs.io/)，并解压，解开后目录如下：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/22.png)

#### 2.在源码根目录下需要建立 package.json 进行配置，用于指定启动读取页面，窗体宽高等等，详细的参数和介绍可以看 [官方文档](https://github.com/nwjs/nw.js/wiki/Manifest-format)
``` javascript
{
	"main": "main.html",     // 启动页面
	"name": "项目名称",     
	"window": {
		"toolbar": false,    // 工具栏
		"frame": false,      // 框架
		"width": 430,        // 窗体宽度
		"height": 450,       // 窗体高度
		"resizable": false   // 窗体是否允许改变尺寸  
	}
} 
```

#### 3.在框架目录基础上进行开发


## 如何本地开发及调试？

本地开发时，可以把 package.json 里 "toolbar" 设置为 true ，这样就可以浏览器的开发者工具
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/23.gif)

如何封包成单一可执行文件？

### 有3个布骤：

#### 1. 项目相关的所有文件打包成一个.zip文件  
将项目的入口文件 main.html  配置文件 package.json 及所有页面的资源（images css js node_modules ） 打包成 src.zip 
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/24.png)

#### 2. 项目文件压缩包与nw.exe合体
把刚才打包生成的src.zip放到 node-webkit 项目目录里，执行合并的命令，生成 app.exe（这个步骤是打包生成一个exe可执行文件，但执行这个exe文件还依赖目录里的.dll .dat .pak文件）
``` bash
copy /b nw.exe+src.zip app.exe
```

![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/25.gif)

#### 3. 压缩并打包成单一可执行文件
把执行这个exe文件所依赖的 .dll等文件再次打包进exe文件里，这里需要使用一个工具：[Enigma Virtual Box](http://enigmaprotector.com/en/aboutvb.html)。

#### 使用方法：

- 下载，安装并打开。
- 对于中文用户可以在Language菜单中选择Chinese
- 在请选择待封包的主程中浏览和选择主程序，如app.exe。
- 拖拽（或者单击Add按钮）所有依赖项，包括*.dll *.dat 和nw.pak到File选项卡的空白处。
- 选择选择文件选项，选择压缩文件来压缩。（压缩可以减少最终的exe文件大小，但程序的执行会相应变慢，是否压缩可按具体情况而定）
- 点击执行封包。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/26.png)

## 如何修改可执行文件图标？

好不容易做完的工具封装打包完成，你发现图标还是nw.exe的默认图标，这就需要我们对图标进行自定义。这里又用一个工具 [Resource Hacker](http://www.angusj.com/resourcehacker/)

- 安装Resouce Hacker并打开程序
- 把要更新icon的应用程序拖放在左边区域，并在左边的面板中选择  Icon Group> IDR_MAINFRAME 
- 选择新的icon用于替换旧的icon  菜单 Action > Replace Icon 
- 保存修改 File > Save （**由于旧Icon有缓存，需要过一会再刷新才能看到更换后的效果**）
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/27.gif)

> 以上就是通过 node-webkit 封装打包桌面工具的整个流程，布骤有点繁琐。

node.js 有个模块node-webkit-builder可以进行项目的构建，可以选择构建成win和osx 平台，并选择node-webkit的版本。（不足的是：不能完成单一执行文件封装和图标修改）

## 参考文献：

http://nwjs.io/
https://github.com/nwjs/nw.js/wiki/How-to-run-apps
https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps
http://www.techtalkz.com/tips-n-tricks/3866-how-change-default-icon-exe-using-resource-editor-resource-hacker.html
https://github.com/mllrsohn/node-webkit-builder
http://blog.inching.org/2014/03/19/node-webkit-package/
https://cnodejs.org/topic/53233277bfb7097d7a00059e