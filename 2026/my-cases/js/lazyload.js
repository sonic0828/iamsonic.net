/**
 * lazyload.js — 媒体分级加载调度器
 *
 * 三条通道，各自触发时机与带宽策略不同：
 *
 *   1. poster 通道：全部视频的 data-poster → poster 属性。
 *      临近视口 1000px 装载。首帧图体积小（21-704KB），先于视频数据出现，
 *      也是大素材在队列未轮到期间唯一的视觉内容。
 *
 *   2. 常规通道：非大文件的图片与视频（data-src，不带 data-heavy）。
 *      临近视口（图 400px / 视频 600px）+ 停留确认后装载。
 *
 *   3. 重通道：>2MB 的大素材（data-heavy + data-weight）。
 *      完全脱离滚动位置，在 window.load（首屏资源全部就绪）且浏览器空闲后，
 *      按 data-weight 降序（越大越靠后）串行下载，并发上限 1。
 *      滚动到对应屏时不提前——由 poster 首帧图托底，队列轮到后由
 *      autoplay.js 的 canplay 回调自动激活播放。
 *
 * 标签契约：
 *   <video data-src="..." data-poster="..." preload="none" data-autoplay>
 *   <video data-src="..." data-poster="..." data-heavy data-weight="8306" ...>
 *   <img   data-src="..." data-heavy data-weight="2887" loading="lazy">
 *
 * 体积权重写在 HTML 属性上，脚本不硬编码文件名：替换素材只改 HTML。
 */
(function () {
  'use strict';

  var IMG_MARGIN = '400px 0px';
  var VIDEO_MARGIN = '600px 0px';
  var POSTER_MARGIN = '1000px 0px'; // 首帧图更早就位
  var DWELL_MS = 150;               // 停留确认，过滤平滑滚动的高速穿越
  var IDLE_DELAY_MS = 1500;         // 无 requestIdleCallback 时的兜底延迟
  var TASK_TIMEOUT_MS = 20000;      // 单任务超时守卫，防止队列被卡住的请求堵死

  /* ---------------- 装载动作 ---------------- */

  /** 应用首帧图：data-poster → poster */
  function applyPoster(video) {
    var poster = video.getAttribute('data-poster');
    if (!poster) return;
    video.poster = poster;
    video.removeAttribute('data-poster');
  }

  /** 装载图片：data-src → src */
  function loadImage(img) {
    var src = img.getAttribute('data-src');
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
  }

  /**
   * 装载视频：先出首帧图，再放开 preload 并设 src。
   * 必须先置 preload='auto'，否则 preload="none" 下 load() 不会真正缓冲数据。
   */
  function loadVideo(video) {
    var src = video.getAttribute('data-src');
    if (!src) return;
    applyPoster(video);
    video.preload = 'auto';
    video.src = src;
    video.removeAttribute('data-src');
    video.load();
  }

  /* ---------------- 通道 1 & 2：视口驱动 ---------------- */

  /**
   * 创建带停留确认的观察器：进入范围后需连续停留 DWELL_MS 才装载，
   * 期间离开则取消——避免首屏卡片平滑滚动穿越中间屏时批量触发下载。
   */
  function createObserver(rootMargin, loader) {
    var timers = typeof WeakMap === 'function' ? new WeakMap() : null;

    return new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        var el = entry.target;

        if (!entry.isIntersecting) {
          if (timers && timers.has(el)) {
            clearTimeout(timers.get(el));
            timers.delete(el);
          }
          return;
        }

        var run = function () {
          if (timers) timers.delete(el);
          loader(el);
          observer.unobserve(el);
        };

        if (!timers) { run(); return; }
        if (timers.has(el)) return; // 已在等待中
        timers.set(el, setTimeout(run, DWELL_MS));
      });
    }, { rootMargin: rootMargin });
  }

  function observeAll(elements, rootMargin, loader) {
    if (!elements.length) return;
    var observer = createObserver(rootMargin, loader);
    Array.prototype.forEach.call(elements, function (el) {
      observer.observe(el);
    });
  }

  /* ---------------- 通道 3：大文件串行队列 ---------------- */

  /**
   * 大文件串行加载队列（并发上限 1）
   * @param {Array} items 已按 data-weight 降序排列的 [data-heavy] 元素
   */
  function createHeavyQueue(items) {
    var queue = items.slice();
    var busy = false;

    function next() {
      if (busy) return;
      var el = queue.shift();
      if (!el) return; // 队列完成
      busy = true;

      var done = false;
      var timer = null;

      function finish() {
        if (done) return;
        done = true;
        if (timer) clearTimeout(timer);
        cleanup();
        busy = false;
        next(); // 串行推进下一个
      }

      // img 用 load/error；video 用 canplaythrough（已缓冲足够连续播放）
      var isVideo = el.tagName === 'VIDEO';
      var successEvent = isVideo ? 'canplaythrough' : 'load';

      function cleanup() {
        el.removeEventListener(successEvent, finish);
        el.removeEventListener('error', finish);
      }

      el.addEventListener(successEvent, finish);
      el.addEventListener('error', finish);
      // 超时守卫：canplaythrough 在部分浏览器可能不触发，避免队列停滞
      timer = setTimeout(finish, TASK_TIMEOUT_MS);

      if (isVideo) loadVideo(el); else loadImage(el);
    }

    return {
      /** window.load + 浏览器空闲后调用，开始串行消费队列 */
      start: function () { next(); }
    };
  }

  /** 在首屏资源全部就绪且主线程空闲后启动队列 */
  function startWhenIdle(queue) {
    function schedule() {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(function () { queue.start(); }, { timeout: IDLE_DELAY_MS });
      } else {
        setTimeout(function () { queue.start(); }, IDLE_DELAY_MS);
      }
    }
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule);
  }

  /* ---------------- 初始化 ---------------- */

  function init() {
    var posters = document.querySelectorAll('video[data-poster]');
    var images = document.querySelectorAll('img[data-src]:not([data-heavy])');
    var videos = document.querySelectorAll('video[data-src]:not([data-heavy])');
    var heavies = document.querySelectorAll('[data-heavy][data-src]');

    // 大素材按体积降序排队（越大越靠后加载）
    var heavyList = Array.prototype.slice.call(heavies).sort(function (a, b) {
      return (parseInt(b.getAttribute('data-weight'), 10) || 0) -
             (parseInt(a.getAttribute('data-weight'), 10) || 0);
    });

    // 降级：无 IntersectionObserver 时视口相关通道全量装载；
    // 大文件仍走串行队列，避免老浏览器一次性并发十几 MB。
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(posters, applyPoster);
      Array.prototype.forEach.call(images, loadImage);
      Array.prototype.forEach.call(videos, loadVideo);
      if (heavyList.length) startWhenIdle(createHeavyQueue(heavyList));
      return;
    }

    observeAll(posters, POSTER_MARGIN, applyPoster);
    observeAll(images, IMG_MARGIN, loadImage);
    observeAll(videos, VIDEO_MARGIN, loadVideo);

    if (heavyList.length) startWhenIdle(createHeavyQueue(heavyList));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
