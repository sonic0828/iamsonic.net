/**
 * scale.js — 16:9 等比缩放引擎
 *
 * 原理：每页内部是固定 1920×1080 的 .canvas（绝对定位、transform-origin: top center），
 * 根据窗口宽度计算 scale = 视口宽度 / 1920，写入 CSS 变量 --scale，
 * 并同步设置每个 .page 的高度为 1080 × scale，使各页纵向堆叠成长滚动。
 *
 * 画布内所有元素按视觉稿 px 1:1 编写，无需关心适配。
 */
(function () {
  'use strict';

  var BASE_W = 1920;
  var BASE_H = 1080;
  var DEBOUNCE_MS = 80;

  function applyScale() {
    // 以第一个 .page 的实际宽度为缩放基准（CSS 已将其钳制在 1000-1920 之间）
    var probe = document.querySelector('.page');
    var containerW = probe ? probe.clientWidth : document.documentElement.clientWidth;
    if (containerW <= 0) return;

    var scale = containerW / BASE_W;
    document.documentElement.style.setProperty('--scale', String(scale));

    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      // 支持 per-page 画布高度：<section class="page" data-height="1140">，缺省 1080
      var height = parseInt(page.getAttribute('data-height'), 10);
      if (!height || height <= 0) height = BASE_H;
      var canvas = page.querySelector('.canvas');
      if (canvas) canvas.style.height = height + 'px';
      page.style.height = height * scale + 'px';
    }
  }

  var timer = null;
  function onResize() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(applyScale, DEBOUNCE_MS);
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('load', applyScale);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(applyScale);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyScale);
  } else {
    applyScale();
  }
})();
