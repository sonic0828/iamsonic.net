---
title: 前端工作流程自动化—Grunt/Gulp 自动化
date: 2014-11-21 14:59:04
tags: automate,workflow,grunt,gulp
---

Grunt/Gulp 都是node.js下的模块，简单来说是自动化任务运行器，两者都有社区及大量的插件支撑，在所有的自动化工具领域里，这两者是最好的前端自动化构建工具。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/13.png)
> 那么问题来了，Grunt和Gulp到底哪家强？

在回答这个问题前，先给大家看一组下面的数据：(数据更新于：2016-8-28)

| 社区插件  | 配置  | API  |  构建系统 |
| -------- | -------- | -------- | -------- |
| Grunt  |  5,869 | 方便  |  任务式 |
| Gulp  |  2,604 |  更方便 |  流 |
				

#### 再看看实现同样功能的配置代码：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/16.png)


作者本人之前一直使用Grunt来做自动化构建的，在Gulp出来后，经过一段时间的试用感觉配置比Grunt方便多了，如果你两者还没接触过，本人推荐直接使用Gulp，毕竟简单实用门槛低才是硬道理。

#### 相比Grunt，Gulp具备以下优点：

- 配置更简洁，而且遵循代码优于配置策略，维护Gulp更像是写代码；
- 易学，核心API只有5个，通过管道流组合自己想要的任务；
- 一个插件只完成一个功能， 这也是Unix的设计原则之一，各个功能通过流进行整合并完成复杂的任务。

#### 当然也有劣势：

- 相对Grunt而言，插件相对较少；
- 自动化可配置性不够Grunt强。

基于目前重构/前端的工作内容，需用到自动化功能大多数还是文件的处理，如压缩，合并，打包、检测、构建……，以上提到的两点劣势在目前的工作层面感受不明显，况且Gulp出现的目的是希望能够取代Grunt，成为最流行的自动化任务运行器。

#### Gulp能为我们做什么？以下这张图可以告诉你（包括但不限于）
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/17.png)


#### Gulp的安装配置
由于文章篇幅的考虑，这里就不把 Gulp的安装配置展开讨论，大家有兴趣可以看看 kaireewu 的 前端构建工具 Gulp.js 上手实例 。里面有详细的介绍及上手实例。


#### Gulp在项目里的实践
目前本人负责游戏官网的网页重构工作，日常的项目的编码及构建都使用Gulp。主要有应用有如下：

#### 应用场景介绍

1. 开始一个项目（gulp init-simple）
新建一个项目文件夹，并把预设的目录及文件拷贝到新建的项目文件夹里。

2. 启动文件变更检测服务（gulp watch）
开始编码前先执行启动服务，打开http://localhost:8080查看页面，当项目里的 .html/.css/.js 文件发生变更时，浏览器自动对当前打开的 http://localhost:8080 下的页面进行耍新。

3. 线上版本编码构建（gulp build-all）
项目代码上线前的构建，这里的操作主要有：压缩所有的图片文件，html文件相对路径改为绝对路径，html文件编码转换，CSS/JS压缩并合并，所有处理过后的文件存放dist目录。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/14.gif)

参考链接:
[Grunt: The JavaScript Task Runner](http://gruntjs.com/)
[gulp.js - the streaming build system](http://gulpjs.com/)
