/**
 * lazyload.js — 非首屏媒体延迟加载控制器
 *
 * 职责单一：只决定「何时发起下载」，不负责播放（播放由 autoplay.js 处理）。
 *
 * 用法：
 *   图片 <img data-src="..." loading="lazy" decoding="async">
 *   视频 <video data-src="..." preload="none" poster="..." data-autoplay>
 *
 * 机制：
 *   1. IntersectionObserver 提前 rootMargin 距离开始观察（图片 400px / 视频 600px，
 *      视频需更早缓冲，确保达到播放阈值前已可播）；
 *   2. 停留确认：进入观察范围后需连续停留 DWELL_MS 才真正装载 —— 首屏卡片锚点
 *      平滑滚动会高速穿过中间屏，借此避免沿途资源被无意义地全部下载；
 *   3. 装载后立即 unobserve，保证只装载一次；
 *   4. 无 IntersectionObserver 的旧浏览器：立即装载全部，功能不失效（仅退化为未优化）。
 */
(function () {
  'use strict';

  var IMG_MARGIN = '400px 0px';
  var VIDEO_MARGIN = '600px 0px';
  var DWELL_MS = 150; // 停留确认时长，过滤高速穿越

  /** 装载图片：data-src → src */
  function loadImage(img) {
    var src = img.getAttribute('data-src');
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
  }

  /**
   * 装载视频：先放开 preload 再设 src，否则 preload="none" 下
   * load() 不会真正缓冲数据，会导致进入视口时才开始下载而卡顿。
   */
  function loadVideo(video) {
    var src = video.getAttribute('data-src');
    if (!src) return;
    video.preload = 'auto';
    video.src = src;
    video.removeAttribute('data-src');
    video.load();
  }

  /**
   * 创建带停留确认的观察器
   * @param {string} rootMargin 提前触发距离
   * @param {Function} loader 装载函数
   */
  function createObserver(rootMargin, loader) {
    var timers = typeof WeakMap === 'function' ? new WeakMap() : null;

    return new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        var el = entry.target;

        if (!entry.isIntersecting) {
          // 离开观察范围：取消待装载计时（高速穿越场景）
          if (timers && timers.has(el)) {
            clearTimeout(timers.get(el));
            timers.delete(el);
          }
          return;
        }

        var load = function () {
          if (timers) timers.delete(el);
          loader(el);
          observer.unobserve(el);
        };

        if (!timers) {
          load(); // 无 WeakMap 支持时退化为立即装载
          return;
        }
        if (timers.has(el)) return; // 已在等待中，避免重复计时
        timers.set(el, setTimeout(load, DWELL_MS));
      });
    }, { rootMargin: rootMargin });
  }

  function init() {
    var images = document.querySelectorAll('img[data-src]');
    var videos = document.querySelectorAll('video[data-src]');
    if (!images.length && !videos.length) return;

    // 降级：立即装载全部，保证内容可见可播
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(images, loadImage);
      Array.prototype.forEach.call(videos, loadVideo);
      return;
    }

    if (images.length) {
      var imgObserver = createObserver(IMG_MARGIN, loadImage);
      Array.prototype.forEach.call(images, function (img) {
        imgObserver.observe(img);
      });
    }

    if (videos.length) {
      var videoObserver = createObserver(VIDEO_MARGIN, loadVideo);
      Array.prototype.forEach.call(videos, function (video) {
        videoObserver.observe(video);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
