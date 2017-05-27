---
title: 前端工作流程自动化—PS脚本自动化(Photoshop Scripting)
date: 2014-11-18 19:58:21
tags: automate,workflow,ps,script
---


![](	http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/4.png)
提到PS的自动化，大家最先想到的应该是“录制动作”，但“录制动作”只能做一些模式非常固定的重复事情，比如对图片批量地加上水印，修改大小并保存这类操作。今天介绍的是PS脚本，相对于“录制动作”，它具备下面几点优势：

1.  **支持变量的使用**
动作无法使用变量，它只是忠实地记录了用户的操作，播放动作的时候也只能机械地重现这一操作过程。
2.  **流程控制**
脚本可以通过分支语句对实际情况进行逻辑判断，然后选择不同的流程。
3.  **同时操控多个应用程序**
可以在支持脚本的应用程序（如PS、AI、AE、BR）之间传递相关信息，进而同时操控这些应用程序

目前PS支持三种脚本语言，分别是`Apple Script`、`VBscript`、`JavaScript`。`Apple Script`只能在MAC平台上使用，`VBscript`只能在WINDOWS平台上使用，而`JavaScript`则是跨平台的。Adobe根据CS平台各软件的实际情况对JavaScript的功能进行了扩展，开发出了扩展版的JavaScript（即ExtandScript），相应脚本文件的扩展名为 .jsx 。PS自带的脚本的脚本可以在 PS菜单 =》 文件=》脚本 里找到。
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/5.png)


这里通过两个例子让大家对PS脚本有大概的了解：

### 例子1 - 自动导出所有图片
**【功能介绍】**
将来psd文件里所有图层一个一个倒出成图片，按图层名进行图片文件命名。可设置文件名前缀，图像类型。

**【功能截图】**
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/6.png)

### 例子2 - 自动生成辅助线**

**【功能介绍】**
- 接受用户输入的列数字
- 根据当前文档尺寸，生成平均宽度的垂直辅助线

**【功能截图】**
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/7.gif)

**【制作步骤】**
1.  新建1个 CreateGuideLine.jsx 文件
2.  存放在 {PS安装目录}\Presets\Scripts\
3.  重启PS，在菜单 文件-&gt; 脚本  即可看到新增的脚本CreateGuideLine


**【代码浏览】**
![](http://iamsonic-1253772978.cosgz.myqcloud.com/blog/automate-corpus/8.png)


**参考链接:**
 Adobe Photoshop Scripting
 [http://www.adobe.com/cn/devnet/photoshop/scripting.html](http://www.adobe.com/cn/devnet/photoshop/scripting.html)
 Introduction To Photoshop Scripting
 [http://www.smashingmagazine.com/2013/07/25/introduction-to-photoshop-scripting/](http://www.smashingmagazine.com/2013/07/25/introduction-to-photoshop-scripting/)



