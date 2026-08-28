/**
 * autoplay.js — 视频进入视口自动循环播放、离开视口暂停
 *
 * 用法：<video data-autoplay src="..." muted loop playsinline>，
 * 脚本自动接管页面中所有带 data-autoplay 属性的视频。
 * 注意：自动播放依赖 muted（浏览器策略），请勿移除 muted 属性。
 */
(function () {
  'use strict';

  var VISIBILITY_THRESHOLD = 0.3; // 视频可见面积 ≥30% 时播放

  function init() {
    var videos = document.querySelectorAll('video[data-autoplay]');
    if (!videos.length) return;

    // 降级：不支持 IntersectionObserver 时保持 autoplay 自然行为
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
          var promise = video.play();
          if (promise && promise.catch) {
            promise.catch(function () {
              /* 自动播放策略限制时静默忽略，用户滚动交互后仍会触发 */
            });
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: [0, VISIBILITY_THRESHOLD, 1] });

    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
