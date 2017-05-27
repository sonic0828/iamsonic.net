---
title: gulp4.0 变化初探
date: 2016-03-10 14:25:11
tags:
---
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/glup4.0/gulp4.0-2x.png)
gulp4.0开发1年多了，但是一直没有做为最新的稳定版本对外发布，最近才得知，真是孤陋寡闻一回。初探了一下，发现任务系统的变化蛮大，而且不再兼容3.x 及之前版本的任务系统。个人感受最深的是增加了 `gulp.series()` 和 `gulp.parallel()` 方法用于组合任务，多个任务执行时，**可控制任务是异步（并行）或同步（串行），甚至是部分异步，部分同步。**

##全新的 gulp.task()
从 3.x 升级到 4.x 主要做的就是修改任务定义，以前的任务是这么写的：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/glup4.0/code1.png)

这样的任务写法在 Gulp 4.0 下要进行修改，要改成这样：
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/glup4.0/code2.png)

对比一下代码，这里有两点要强调说明一下：

- 为什么多了个`return`，是因为目前的任务组合可同步，也可异步，所以整个任务定义函数要做为一个返回值来设定，[详细请看文档](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#async-support "详细请看文档")
- `gulp.series()`里的任务是同步执行的，`gulp.parallel()`里的任务是异步执行的

>**所以之前3.x的`gulpfile.js` 切换到4.0版本是要修改一下的，否则执行时会报错。**

新的gulp.task 返回接受两种新的方式  `Return a child process`     `Return a RxJS observable`  这非常方便插件开发者进行 gulp插件定制。
**Return a child process**
``` js
gulp.task('clean', function() {
  return spawn('rm', ['-rf', path.join(__dirname, 'build')]);
});
```
**Return a RxJS observable**
``` js
var Observable = require('rx').Observable;

gulp.task('sometask', function() {
  return Observable.return(42);
});
```


##gulp同步执行任务
4.0之前 gulpr任务的执行都是异步的，但总有些场景是需要并行的
```javascript
gulp.task("build", ["clean", "js-min", "img-min", "css-min", "html", "zip"]);
```

``` bash
[10:22:54] Starting 'clean'...
[10:22:54] Starting 'js-min'...
[10:22:54] Starting 'img-min'...
[10:22:54] Starting 'css-min'...
[10:22:54] Starting 'html'...
[10:22:54] Starting 'zip'...
[10:22:54] Finished 'css-min' after 88 ms
[10:22:54] Finished 'html' after 86 ms
[10:22:54] Finished 'clean' after 255 ms
[10:22:54] Finished 'zip' after 549 ms
[10:22:55] Finished 'js-min' after 1.5 s
[10:22:56] gulp-imagemin: Minified 15 images (saved 337.01 kB - 30.8%)
[10:22:56] Finished 'img-min' after 2.46 s
[10:22:56] Starting 'build'...
[10:22:56] Finished 'build' after 14 μs
```
>ToT!!!这样的任务执行完全错乱了，执行zip压缩时，我前面的js压缩，图片压缩等文件还没完整。这个压缩包生成后文件不完整呀！我想要的是：圆括号里面串行，中括号里面并行。如下：

``` js
("clean", ["js-min","img-min", "css-min", "html"], "zip")
```
**有什么办法可以解决？**

- 标注依赖，但有时要处理多个依赖，依赖与依赖之间的依赖（麻烦，不推荐）
- 使用插件[gulp-sequence](https://github.com/teambition/gulp-sequence "gulp-sequence") （不想升4.0 但有同步执行的需求时可用）
- 使用gulp4.0 的 `gulp.series()`（超好用，推荐）

使用gulp4.0的新API，我们可以把任务改成如下
``` js
gulp.task("build", gulp.series("clean",  gulp.parallel("js-min","img-min", "css-min", "html"), "zip"));
```
>`gulp.series()`里的任务是同步执行的，`gulp.parallel()`里的任务是异步执行的。

再执行一次gulp build看看效果
``` bash
[15:36:53] Starting 'build'...
[15:36:53] Starting 'clean'...
[15:36:54] Finished 'clean' after 24 ms
[15:36:55] Starting 'parallel'...
[15:36:55] Starting 'js-min'...
[15:36:55] Starting 'img-min'...
[15:36:55] Starting 'css-min'...
[15:36:55] Starting 'html'...
[15:36:55] Finished 'js-min' after 88 s
[15:36:55] Finished 'css-min' after 67 ms
[15:36:55] Finished 'html' after 67 ms
[15:36:57] gulp-imagemin: Minified 15 images (saved 337.01 kB - 30.8%)
[15:36:57] Finished 'img-min' after 2.25 s
[15:36:57] Finished 'parallel' after 2.25 s
[15:36:57] Starting 'zip'...
[15:36:57] Finished 'zip' after 63 ms
[15:36:57] Finished 'build' after 3.62 s
```
太棒了，这才是我 想要的！


##gulp 4.0安装办法

####如果之前安装过gulp 4.0前的版本，需把原来的旧版本卸载掉，执行下面代码，没装过则跳过此步骤
``` shell
# 卸载全局的 gulp
$ npm uninstall 'gulp-cli' -g
$ npm uninstall 'gulp' -g
# 到项目目录里卸载本地的 gulp
$ npm uninstall 'gulp' --save-dev
```
####开始全新安装gulp 4.0
``` shell
# 安装全局的 gulp 4.0
$ npm install 'gulpjs/gulp-cli' -g
$ npm install 'gulpjs/gulp#4.0' -g
# 安装本地的 gulp 4.0
$ npm install 'gulpjs/gulp#4.0' --save-dev
```


##变新日志

我们来瞄一瞄4.0新版有什么不同（[CHANGELOG.md](https://github.com/gulpjs/gulp/blob/4.0/CHANGELOG.md "CHANGELOG.md")）：

###任务系统变化（基于 bach，替换掉了原先基于 orchestrator 的任务系统）

- 移除 `gulp.reset`
- `gulp.task` 不再支持三个参数的用法
- `gulp.task` 用字符串注册的任务必须是直接在命令行中调用的任务
- `gulp.task` 可以接受单参数语法，这个参数必须是一个命名函数，函数名会被作为任务名
- 添加了 `gulp.series` 和 `gulp.parallel` 方法用于组合任务
- 添加了 `gulp.tree` 方法用于获取任务树，传入 `{ deep: true }` 参数可以得到一个 `archy` 兼容的节点列表
- 添加了 `gulp.registry` 方法以定制注册表。

###命令行变化

- 将命令行分离出来成为一个独立模块，以便节约带宽/空间。用 `npm install gulp -g` 或 `npm install gulp-cli -g` 都可以安装命令行，只是 `gulp-cli` 不包含模块代码所以比较小
- 命令行添加了 `--tasks-json` 参数，可以导出整个任务树以供他用
- 命令行添加了 `—verify` 参数用以检查 `package.json` 中是否包含黑名单插件（违背准则而被禁入官方插件列表的可怜娃们）。

###文件系统变化

- 添加了 `gulp.symlink` 方法，功能和 `gulp.dest` 一致，不过是以软链接的方式
- `gulp.dest` 和 `gulp.symlink` 方法添加了 `dirMode` 参数允许对目标目录更好地控制
- `gulp.src` 接收的文件匹配字符串会顺序解释，所以你可以写成这样 `gulp.src(['*.js', '!b*.js', 'bad.js’])`（排除所有以 b 开头的 JS 文件但是除了 bad.js）
- `gulp.src` 性能进行极大的改进
- `gulp.src` 方法添加了 `since` 选项，筛选在特定时间点之后修改过的文件（用于增量编译）
- `gulp.dest` 方法添加了 `overwrite` 选项 允许你启用或禁用现有的文件覆盖



##参考
https://segmentfault.com/a/1190000002528547
http://www.gulpjs.com.cn/docs/recipes/running-tasks-in-series/
http://zhangruojun.com/gulpshun-xu-zhi-xing-ren-wu/