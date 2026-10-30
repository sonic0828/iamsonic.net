/**
 * iamsonic.net Workflow Automation
 * 
 * Author: Sonic
 * LastModify: 2017-05-21 
 */

var gulp = require('gulp');
var Hexo = require('hexo');

/* ---------------------------------------------------
 * Task website Build [生成 public 目录中的网页文件]
 */
gulp.task('build-blog', function(){
  var hexo = new Hexo(__dirname, {});
  return hexo.init()
    .then(function(){ return hexo.call('clean'); })
    .then(function(){ return hexo.call('generate', {bail: true}); })
    .finally(function(){ return hexo.exit(); });
});
