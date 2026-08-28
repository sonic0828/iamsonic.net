# 素材规范与清单

视觉稿中的截图 / 动图 / 视频统一放在本目录（`assets/images/`），命名规则：
`p{页码}-{内容含义}.{扩展名}`（小写、连字符分隔）。后续新页素材沿用同一规则。

## 已接入素材清单（第 1-2 页）

| 页面 | 位置 | 文件名 | 原始尺寸 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 第 1 页 | 卡片1 封面 | `p1-card-ue.jpg` | 1090×712 | UE 编辑器截图 |
| 第 1 页 | 卡片2 封面 | `p1-card-miniprogram.jpg` | 1090×712 | 小程序活动截图墙 |
| 第 1 页 | 卡片3 封面 | `p1-card-aicoding.jpg` | 1090×714 | AI Coding 界面截图 |
| 第 2 页 | 上部横条（图卡1-3 合并） | `p2-assets-character.jpg` | 3230×1004 | 角色/建筑、场景资产、功能交互 合成横条，文字标签已含在图内 |
| 第 2 页 | 底部左图 编辑器演示 | `p2-ue-editor.jpg` | 1760×1008 | 静态图（如后续换成视频，改回 `<video>` 即可） |
| 第 2 页 | 底部右图 排期表 | `p2-schedule.jpg` | 1760×1078 | 项目排期表截图 |
| 第 2 页 | Unreal 徽章 | `p2-unreal-logo.png` | 403×605 | 透明底完整徽章（含上下三角） |

> 页面中每个 `<img>` 均保留 `data-asset` 属性标注对应文件名，方便全局检索定位；
> 图位尺寸按图片原始宽高比等比推导（不拉伸、不裁剪），细节见各页 css。

## 已接入素材清单（第 3-7 页）

| 页面 | 位置 | 文件名 | 原始尺寸 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 第 3 页 | 难点1 分工约定 | `p3-nodus-1.png` | 995×1600 | 压字已含在图内 |
| 第 3 页 | 难点2 纹理遮照 | `p3-nodus-2.jpg` | 902×1600 | 同上 |
| 第 3 页 | 难点3 AI行为树 | `p3-nodus-3.png` | 1191×1600 | 同上 |
| 第 4 页 | 演示视频 | `p4-demo-video-6s-compressed.mp4` | — | 进入视口自动循环播放、离开暂停（js/autoplay.js） |
| 第 5 页 | 站点矩阵全景 | `p5-roadmap.jpg` | 2693×1500 | 单图完整替代 8 分组矩阵 + 时间轴 |
| 第 6 页 | 需求流程简化 | `p6-process.png` | 1590×1544 | 闭环前/后需求流程 |
| 第 6 页 | 开发周期缩短 | `p6-cycle.png` | 1842×1544 | 开发闭环前后对比 + 全链路支持 |
| 第 7 页 | 活动数据反馈 | `p7-feedback-1.jpg` | 3163×828 | 数据总览与结论标注 |
| 第 7 页 | 用研报告反馈 | `p7-feedback-2.jpg` | 1906×691 | — |
| 第 7 页 | 运营同学反馈 | `p7-feedback-3.jpg` | 1191×655 | — |

## 已接入素材清单（第 8-11 页）

| 页面 | 位置 | 文件名 | 原始尺寸 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 第 8 页 | 左面板 拥抱AI编码 | `p8-ai-ide.png` | 1678×1608 | 常用 AI IDE / 模型 / 额度总览 |
| 第 8 页 | 步骤1 文字描述需求 | `p8-step-1.gif` | 800×143 | GIF 动图 |
| 第 8 页 | 步骤2 AI编码自动生成 | `p8-step-2.gif` | 1090×565 | GIF 动图 |
| 第 8 页 | 步骤3 调试修改 | `p8-step-3.mp4` | — | 视频（data-autoplay） |
| 第 8 页 | 步骤4 效果运用 | `p8-step-4.mp4` | — | 视频（data-autoplay） |
| 第 8 页 | 编码方式演进图 | `p8-timeline.png` | 1848×794 | 过去 / 25年 / 26年 |
| 第 9 页 | 演示视频 | `p9-canvas-demo.mp4` | — | 视频（data-autoplay） |
| 第 9 页 | 图生3D 截图 | `p9-canvas-3d.jpg` | 1051×765 | — |
| 第 10 页 | 可配置LLM、语音、人设 | `p10-robot-config.mp4` | — | 视频（data-autoplay） |
| 第 10 页 | 中文/语音 对话 | `p10-robot-dialogue.mp4` | — | 视频（data-autoplay） |
| 第 10 页 | 外观模型可替换 | `p10-robot-appearance.mp4` | — | 视频（data-autoplay） |
| 第 10 页 | 绑定骨骼动画 | `p10-robot-skeleton.mp4` | — | 视频（data-autoplay） |
| 第 10 页 | 可感知屏幕并语音反馈 | `p10-robot-screen.mp4` | — | 视频（data-autoplay） |
| 第 11 页 | V1.0 基础框架 | `p11-v10-framework.gif` | 546×360 | GIF 动图 |
| 第 11 页 | 规则设定 | `p11-rules.png` | 675×800 | — |
| 第 11 页 | V1.1 背景素材 | `p11-v11-bg.png` | 832×749 | — |
| 第 11 页 | V1.2 怪物素材 | `p11-v12-monster.png` | 832×804 | — |
| 第 11 页 | V1.3 主角素材 | `p11-v13-hero.mp4` | — | 视频（另有同名 .gif 备选） |
| 第 11 页 | 特效序列帧 | `p11-effects-frame.mp4` | — | 视频（另有同名 .gif 备选） |

> 所有 `<video data-autoplay>` 进入视口自动循环播放、离开视口暂停（js/autoplay.js）；
> GIF 走原生 `<img>`；双格式槽（v13-hero、effects-frame）按约定优先 mp4。

## 后续页素材接入方式

把素材文件按命名规则放入本目录，然后在 `index.html` 对应位置使用：

```html
<!-- 图片 -->
<img src="assets/images/pX-xxx.jpg" alt="…" loading="lazy" onerror="this.style.display='none'" />
<!-- 视频 -->
<video src="assets/images/pX-xxx.mp4" autoplay muted loop playsinline preload="none"></video>
```
