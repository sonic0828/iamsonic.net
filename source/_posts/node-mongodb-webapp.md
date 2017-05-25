---
title: Node.js + MongoDB 构建Web应用
date: 2014-09-24 13:45:49
tags: node,mongodb
---

2013下半年在做中心【ideas需求管理系统】的Beta版本时，在当时缺乏开发人力的情况下，身兼多职，尝试用 Node.js+MongoDB来做平台的构建，由于当时也是第一次接触Express和MongoDB，平时日常的需求又狂轰乱炸，只能利用平时中午少撸一发“德玛西亚”的时间（小撸怡情，大撸伤身）及周未攒出来的宝贵时间，现学现用。系统在2013年下半年的11月份成功上线，供中心所有重构记录需求，生成周报，为【ideas需求管理系统】奠定基础。时及今日，给大家做下分享：
 ![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/1.jpeg)
 
 对于1个网页重构的同学，使用Node.js来做前后端构建是有一定优势的，因为你可以不用懂PHP，CGI等开发语言就可以一人搞定前后端，完成一套系统的编码构建，当然如果能懂一些自然最好，在解决一些服务器运维问题时，会更加有方向。当然您需要具备简单的Node.js安装，APP执行，读懂报错的能力，还有较好的 javascript编码能力。好吧，序章已经足够长了，下面开始，
 
##【目录】构建一个Web 应用大概会有6大步骤
 ![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/2.jpeg)

### 1. 搭建node.js、npm环境
 提起node.js对于没有开发基础的同学来说，可能会有点排斥，觉得光搞定环境搭建及配置就够头痛的。其实现在的node.js在window环境下的安装已经不像2年前要先装个cybwin后再手动配window全局变量名那么麻烦，真心不难，直接官网下一个.exe文件，装完node.js及npm环境就已经齐了。So Easy!&nbsp;下面介绍一个非常simple的小程序带你了解node和npm环境。
 
#### 1.1 确定官方的安装包装上后，确认上node和npm已经装上：
终端下敲入
``` shell
 node -v
 npm -v
```
如果有正常打印出类似的东东则成功
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/3.jpg)
 
#### 1.2 以下是一个simple node小程序
 功能：在当前目录下生成一个 test.txt 的文本文件，并对此文件上填入文字 “Hello Node”.
> 以下为main.js 内容————————————————————+

``` javascript
    //（示例）调用File System模块 
var fs = require('fs'); 
fs.writeFile('test.txt', 'Hello Node', function () { 
  console.log('It\'s saved!'); 
});
```
运行后结果如下：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/4.jpeg)


#### 1.3 npm介绍及使用npm安装node模块**
Npm是node.js的包管理器。用于安装、卸载、发布模块等。（像express/mongoose/grunt这些都是nodejs的模块）
> 以下在终端下运行: ————————————————————+

``` shell
// 全局安装（当前在系统目录）
$npm install express -g

// 本地安装（安装在当前目录）
$npm install express
```

本地安装：如果想在程序中调用该模块，则使用本地安装。
全局安装：如果想在命令行中调用该模块，应该使用全局安装。
     
     
     
## 2. 安装配置MongoDB数据库
MongoDB 是一个基于分布式文件存储的数据库，由C++语言编写，旨在为WEB应用提供可扩展的高性能数据存储解决方案。下面是安排及配置方法：
     
### 2.1 先从官网下载系统文件（[http://www.mongodb.org/downloads](http://www.mongodb.org/downloads)）并解压缩文件。
将压缩包解压，在D盘创建文件夹MongoDB,将压缩包中所有的.exe文件拷到D:MongoDB文件夹中。 

### 2.2 建立工作目录。 　　
- 1、建立数据存放目录&nbsp;&nbsp;D:\mongodb\data 　　
- 2、建立日志文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D:\mongodb\log\mongodb.log 

### 2.3 设置系统变量。为了方便从控制台中管理mongodb，不用每次都进入到D:MongoDB中。 
我的电脑--属性--高级--环境变量--系统变量中的path,加上;D:\MongoDB ，注意前面加上分号。如下图： 
 [](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/5.png)

### 2.4 启动mongdb服务。 　　
进入控制台中，输入
``` shell
mongod.exe --dbpath=D:\MongoDB\data 。
```
如下图：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/52.png)
这样服务就启动了，正常情况下会显示如下：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/53.png)
如果你觉得每次启动都要在终端敲入那么长的代码，可以选择在mongoDB的安装目录下做个 starMongo.bat 文件，把启动代码写在里面，下次启动时，在终端敲入 starMongo 即可，当然你还可以把文件放在启动目录里，这样下次开机启动去MongoDB的服务也启动了。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/6.jpg)
在浏览器中输入[http://localhost:27017/](http://localhost:27017/)。
会出现 You are trying to access MongoDB on the native driver port. For http diagnostic access, add 1000 to the port number 

表示服务已经启动。 
不要关闭当前这个控制台窗口，另起一个控制台，输入mongo.如下图：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/62.png)
表示已成功连接到mongdb.

## 3. npm安装express + jade + mongoose 模块
npm模块安装直接按上面介绍的方法安装即可，这里简单介绍下这三个模块：

#### 1.express
Express 是一个简洁而灵活的 node.js Web应用框架, 基于MVC架构，提供一系列强大特性帮助你创建各种Web应用。
（这就好像PHP有 YII thinkPHP 框架）安装 express 需要要 –g全局安装，便于在命令行里创建项目骨架。

#### 2.jade
node下的模板引擎，可用于变量值输出和简化HTML代码，Express 框架默认使用的就是jade, 同类模板引擎有 Ejs Handlebars 可选，语法略有不同，可以按自己的编码喜欢好选择，这里推荐使用jade。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/7.jpeg)

#### 3.mongoose
Node.js下对MongoDB进行对像建模的工具，工作于异部环境下。方便创建集合模型、数据库连接、关闭，数据操作。与其它同类工具相比，它所提供的API灵活友好，（如果把mongoDB提供的原生接口比做js原生API。那么Mongoose就像jQuery。）同等工具有 MongoSkin，MongoLian，以及原生驱动 node-mongodb-native等。

以下是使用原生的MongoDB API 对比 Mongoose 实现通过id更新数据的功能。可以看出实现同样功能，Mongoose写出来的代码精简很多。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/8.jpeg)


## 4. Express初始化项目骨架，并在骨架上进行编码

上面3个模块成功安装后，项目所需的Node模块就齐了。接下来就是用Express生成项目骨架，并在骨架的基础上增加代码。

### 4.1 生成项目骨架
直接在终端下敲入下面代码，express会自动生成项目的代码
> +—以下在终端下运行: ————————————————————+

``` shell
$express project-name
```

运行后，express将自动生成如下文件夹及文件：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/9.jpeg)

### 4.2 项目骨架目录结构及文件介绍
- /public&nbsp; —— 图片、css、js等静态资源存放目录
- /routes&nbsp; —— 路由 /views&nbsp; &nbsp;—— 模版 /app.js&nbsp; —— Web服务器
 
### 4.3 一个简单的例子 Express + MongoDB 读取数据库并做CRUD操作
 
这是直接在express生成的项目骨架上进行编码的小Demo，代码非常简洁，有兴趣的同学可以下载源码在正地测试运行一下。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/10.jpeg)
Demo地址：[http://url.cn/Vn7owS](http://url.cn/Vn7owS)
 
 
## 5. 执行入口文件 $node app，并在浏览器下测试效果
 
完成对项目的编码后，我们要在浏览器测试下对项目页面的效果及功能进行测试，有3个步骤：
 
1. 启动MongoDB服务（具休做法见上面的 2.4）
2. 在项目目录下终端窗口下运行 $node app
   ![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/11.jpg)
3. 浏览器下输入 localhost:3001
   ![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/node-mongodb/12.jpg)
以上运行的是4.3提供的小demo项目(Simple Todo List)
 
## 6. 部署到服务器上线
 
项目编码完成并在本地测试无问题后，既可部署到服务器上，当时做“ideas需求管理系统Beta”服务器的部署是kaireewu部署的，有兴趣的同事可以私下骚扰，国内外支持 node.js的虚拟主机很多，可以从&nbsp;[node wiki主机列表](https://github.com/joyent/node/wiki/Node-Hosting)&nbsp;查询，但界面方便使用上，个人推荐以下3个：

1. &nbsp;[appfog](http://www.appfog.com)
2. &nbsp;[Nitrous.IO](https://www.nitrous.io/)
3. &nbsp;[openshift](https://www.openshift.com/)
