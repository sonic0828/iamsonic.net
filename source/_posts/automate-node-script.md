---
title: 前端工作流程自动化—Node.js编写小工具
date: 2014-11-25 07:16:34
tags:
---

![](	http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/9.jpeg)
关于node.js就不多介绍了。node.js具备文件操作的功能，这其实就能够来做很多事情，比如：文件的批量重命名，数据分析、数据爬虫脚本……这里提供两个简单的例子，主要用到以下两个原生模块：

- **(file system)模块**
实现文件的创建、读取、写入、编辑、删除
- **path模块**
实现文件路径的生成和管理


### 例子1 - 超简单实例认识fs path

#### 功能介绍
*  当前目录创建hello.txt；
*  在hello.txt里写入文字“Hello Node”；
*  成功后打印出hello.txt的目录。

#### 功能截图
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/10.gif)
 
#### 代码浏览

``` javascript
var path = require("path");
var fs = require("fs");
var rootPath = path.dirname(__filename);

fs.writeFile('hello.txt', 'Hello Node', function () {
	console.log('hello.txt 创建成功，文件地址如下：')
	console.log(rootPath + '/hello.txt');
	fs.open('hello.txt','rs+');
});
```


     
     
### 例子2 -生成文件URL列表**
#### 功能介绍

- 把当前目录下所有文件记录进url.txt
- 支持递归，子目录下的文件也能记录

#### 功能截图
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/12.gif)
     
#### 代码浏览
``` javascript
var path = require("path");
var fs = require("fs");
var fileList = [];
var rootPath = path.dirname(__filename)
var curPath = rootPath.split(path.sep);
    curPath = curPath[curPath.length-1];
function walk(dir){  
    var dirList = fs.readdirSync(dir);
    dirList.forEach(function(item){
        if(item == ".DS_Store") return
        if(fs.statSync(dir + '/' + item).isDirectory()){
            walk(dir + '/' + item);
        }else{
            var pp = dir.substr(dir.indexOf(curPath));
            fileList.push(pp + '/' + item);
        }
    });
}
function whiteInToTxt(list){
    walk(rootPath);
    console.log("当前目录下的文件列表如下------")
    console.log(fileList);
    if (list){
        fs.writeFile('url.txt', '---File Url List---', function () {
            list.forEach(function(item){
                fs.appendFile('url.txt', '\n'+item, function() {

                });
            })
            console.log(list.length + ' 个文件已记录进url.txt' )
        });
    }
}
whiteInToTxt(fileList);
```

### 参考链接:
Node.js fs path
[http://nodejs.org/](http://nodejs.org/) 
[http://nodejs.org/api/fs.html](http://nodejs.org/api/fs.html) 
[http://nodejs.org/api/path.html](http://nodejs.org/api/path.html)

