---
title: ie hack在某些CSS属性下失效
date: 2011-06-30 14:32:35
tags: ie, font-family
---

最近项目碰到一个问题，要在CSS里用IE hack取分使用的字体。在IE6-9浏览器下使用宋体，ie9/FF/Safari 使用雅黑字体。按理来讲应该这样写:
```css
	font-family:Microsoft YaHei, YouYuan;
	font-family:Arial\9; /* targets ie9 and below*/
```

 > 关于IE Hack可以参考[@码头兄](http://t.qq.com/feiwen8772)的 [IE9的css hack](http://www.css88.com/archives/3746 "IE9的css hack") ）

 结果却是所有游览器都使用了”Arial”字体,也就是说这个”\9″ 的hack失效了，请教了几位同行均没能解决这个问题，有建议用[条件注释](http://davidbcalhoun.com/tag/ie-hack)
 的方式，虽然这是一种趋势，往后的页面都会逐渐采用这种方法来做!但这也暴露了css hack在某下CSS属性下会失效这个事实。
 于是搜索了一下，找到国外这篇[Quick Tip: How to Target IE6, IE7, and IE8 Uniquely with 4 Characters](http://net.tutsplus.com/tutorials/html-css-techniques/quick-tip-how-to-target-ie6-ie7-and-ie8-uniquely-with-4-characters/)
 里面的论坛也有人遇到的一样的问题!


 使用”\9″对某些css属性作品失效时，要增加
 ``` css
 **
  “/!important”
 **
 ```
经测试发现，这个方法能解决ie6-8,唯独ie9依然不行，试过对字体加””,修改/!important的位置，都不行，如果有解决ie9的方法。欢迎讨论!


