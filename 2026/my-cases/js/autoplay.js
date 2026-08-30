/**
 * autoplay.js — 视频进入视口自动循环播放、离开视口暂停
 *
 * 用法：<video data-autoplay muted loop playsinline>（源由 lazyload.js 延迟装载）
 * 注意：自动播放依赖 muted（浏览器策略），请勿移除 muted 属性。
 *
 * 与 lazyload.js 的协作：
 *   视频源是延迟装载的，若某个视频在「已经可见」之后才拿到 src，
 *   IntersectionObserver 不会再次回调，仅靠 IO 会导致永不播放。
 *   因此这里额外监听 canplay：可播放时若当前确实在视口内，则补一次播放。
 */
(function () {
  'use strict';

  var VISIBILITY_THRESHOLD = 0.3; // 视频可见面积 ≥30% 时播放

  /** 尝试播放，静默忽略浏览器自动播放策略导致的拒绝 */
  function tryPlay(video) {
    // 源尚未装载时不播放，交给 canplay 回调兜底
    if (!video.currentSrc && video.getAttribute('data-src')) return;
    var promise = video.play();
    if (promise && promise.catch) {
      promise.catch(function () {
        /* 自动播放策略限制时静默忽略，用户交互后仍会触发 */
      });
    }
  }

  /** 计算元素在视口内的可见比例（0-1） */
  function visibleRatio(el) {
    var rect = el.getBoundingClientRect();
    var viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.height <= 0) return 0;
    var visible = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
    return Math.max(0, visible) / rect.height;
  }

  function init() {
    var videos = document.querySelectorAll('video[data-autoplay]');
    if (!videos.length) return;

    // 源装载完成时补一次播放判定（覆盖「装载晚于可见」的竞态）
    Array.prototype.forEach.call(videos, function (video) {
      video.addEventListener('canplay', function onCanPlay() {
        video.removeEventListener('canplay', onCanPlay);
        if (visibleRatio(video) >= VISIBILITY_THRESHOLD) tryPlay(video);
      });
    });

    // 降级：不支持 IntersectionObserver 时，lazyload 已全量装载，依赖原生 autoplay
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
          tryPlay(video);
        } else {
          video.pause();
        }
      });
    }, { threshold: [0, VISIBILITY_THRESHOLD, 1] });

    Array.prototype.forEach.call(videos, function (video) {
      observer.observe(video);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
