---
title: Grunt打造前端自动化工作流
date: 2013-07-15 14:28:39
tags: grunt
---


![blog-img](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/grunt-intro/grunt-1.jpg)

## Grunt这货是啥？

最近很火的前端自动化小工具，基于任务的命令行构建工具 [http://gruntjs.com](http://gruntjs.com)

&nbsp;

## Grunt能帮我们干啥？

### 在开始介绍前，先向大家描述下面的场景:

#### 【场景1：项目开始前】

1.  先建立一个 projA 的文件夹 再建 html css js images （建5个或以上文件夹，花费1分钟）
2.  拷贝 CSS库（Yui Reset | bootstrap）JS库（Requiet.js | Seajs | jQuery | jQuery插件 ） 进相应目录（拷贝 N个文件，花费N分钟）
3.  再新建 html/index.html js/comm.js css/base.css css/comm.css css/module-A.css …… （建N个文件，花费N分钟）

#### 【场景2：编码中】

编辑器编码 =&gt; 切换到浏览器F5 =&gt; 编辑器编码 =&gt; 切换到浏览器F5 =&gt; 编辑器编码 =&gt; 切换到浏览器F5 =&gt; 编辑器编码 =&gt; 切换到浏览器F5 …………

![F5按爆](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/grunt-intro/grunt-2.jpg)

键盘就这样杯具了….

#### 【场景3：编码完成】

1.  HTML去掉注析、换行符 - HtmlMin
2.  CSS文件压缩合并 – CssMinify
3.  JS代码风格检查 – JsHint
4.  JS代码压缩 – Uglyfy
5.  image压缩 - imagemin

&nbsp;

在一个项目过程中，重复而枯燥的工作太多了…. **绳命就这样浪费了。**

我们需要一个自动化的工作流程，让我们更专注于coding，而不是coding外的繁琐工作。于是Grunt应运而生。可以想像，如果在node环境下，一行命令搞定一个场景，So Cool…

&nbsp;

## Grunt安装配置

### 安装 grunt-cli

1.  1. 自备node环境(&gt;0.8.0), npm包管理
2.  2. 卸载旧版本grunt（&lt;0.4.0） (没装过请忽略)

    npm uninstall grunt -g`</pre>
3.  安装grunt-cli
    <pre>`npm install grunt-cli -g`</pre>

    &nbsp;

    ### 安装 grunt-init(可选)

    `npm install grunt-init -g`

    可选安装，grunt-init是个脚手架工具，它可以帮你完成项目的自动化创建，包括项目的目录结构，每个目录里的文件等。具体情况要看你运行grunt-init指定的模板，以及创建过程中你对问题的回答。由于篇幅且配置 grunt-init 模板较为复杂，本章暂不展开讨论，有兴趣的童鞋可私下了解。

    &nbsp;

    ### 配置 grunt

    从官网下载package.json Gruntfile.js 文件放到项目根目录，并对文件进行修改配置.

    ![Directory](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/grunt-intro/directory1.png)

*   `package.json` //项目自动化所依赖的相关插件。
*   `Gruntfile.js` //项目自动化工作流配置文件，重要

    &nbsp;

    #### 1. package.json 文件修改 [官方文件地址](http://gruntjs.com/getting-started#package.json)

    ![package.json](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/grunt-intro/grunt-3.png)

    #### 2. Gruntfile.js 文件修改 [官方文件地址](http://gruntjs.com/getting-started#an-example-gruntfile)

    ![Gruntfile.js](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/grunt-intro/grunt-4.png)

    &nbsp;

    ## 开始一个实例

    ### 这里以projA为例子，实现的自动化功能如下：

*   编码过程中自动监控projA目录，如果 .html/ .css/ .js文件变更时，自动刷新浏览器。
*   编码完成后，压缩html、css、js、img文件,并存放到dist/目录下。

    ![Directory](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/grunt-intro/grunt-5.png)

    &nbsp;

    ### 对应的操作步骤如下：

1.  1. 先配置好package.json、Gruntfile.js两个文件，[projA文件打包下载
    ](http://share.weiyun.com/68d8de76b4c09f7c8afab92e0de87cf4)
2.  2. 执行命令自动下载相对应的Grunt插件[【视频演示戳这里】](http://dwz.cn/9b8lk)
    **命令行执行:**
    <pre>`npm install`</pre>
3.  3. 启动文件变更监控(livereload)[【视频演示戳这里】](http://dwz.cn/9b8pJ)
    **命令行执行:**
    <pre>`grunt live`</pre>
4.  4. 编码完成后Build[【视频演示戳这里】](http://dwz.cn/9b8yw)
    **命令行执行:**
    <pre>`grunt build

&nbsp;

## Grunt使用总结

1.  配置简单，配置文件Gruntfile.js是JS格式，比较贴近前端知识点。相对Ant之类基于JAVA,又是xml配置，相对来说学习成本低。
2.  Grunt能为我们做的远不只这么多,很多Grunt插件待我们去挖掘使用。
> 比如：haml less coffeeScript dataURI html2json
3.  每个人的具体需求不一样，可以按自己的习惯合理配置，组合成最适合自己的自动化工作流。
4.  Grunt团队很勤劳，社区活跃，有兴趣可以持续关注。


