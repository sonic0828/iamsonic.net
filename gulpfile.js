/**
 * iamsonic.net Workflow Automation
 * 
 * Author: Sonic
 * LastModify: 2017-05-21 
 */

var gulp 		  = require('gulp');

/*
 * Setting Pathsstella
 */
var paths = {
  web  :  "public/"
};

/* ---------------------------------------------------
 * Task website Build [向/ 目录输出public网页文件]
 */
gulp.task('build-blog', function(){
  return gulp.src([paths.web+'**/*'])
    .pipe(gulp.dest('./'))
})