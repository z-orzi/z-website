# Personal Portfolio Website — PRD for AI Development

## 1. 项目目标

创建一个个人作品集网站，用来展示：

- 正在开发中的项目
- 已发布项目
- 原型项目
- 暂停维护 / 归档项目
- 个人简介
- 当前正在做的事情
- 可合作 / 接小型项目的信息

网站整体要有明显个人特色，但不能过度炫技。

核心气质：

**Creative Technologist / Independent Maker**

关键词：

**温暖、灵动、有创意、克制、个人化、轻手绘感、创意工作台、持续成长中**

不要做成：

- 传统程序员 Portfolio
- 黑底霓虹赛博朋克
- Apple 官网仿制
- 大量玻璃拟态
- 过度复杂 3D
- 大量滚动特效
- 很像 SaaS 官网
- 纯卡片堆叠式模板网站

---

# 2. 技术要求

优先使用：

- Astro
- TypeScript
- CSS / CSS Modules
- Markdown 或 MDX
- GitHub 代码仓库
- Cloudflare Pages / Vercel / GitHub Pages 均可部署

网站主要为静态网站。

不要为了视觉效果引入复杂后端。

尽量减少第三方依赖。

如果需要动画，优先使用：

- CSS animation
- CSS transition
- 少量原生 JavaScript

除非必要，不要引入大型动画库。

---

# 3. AI 可维护性要求

这是非常重要的要求。

网站必须采用：

**数据驱动 + 组件化 + 内容与 UI 分离**

目的是以后只修改一个项目时，AI 不需要读取整个代码仓库。

建议目录：

```text
portfolio/
├─ src/
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Hero.astro
│  │  ├─ CurrentlyBar.astro
│  │  ├─ ProjectCard.astro
│  │  ├─ ProjectGrid.astro
│  │  ├─ StatusBadge.astro
│  │  ├─ AboutPreview.astro
│  │  └─ Footer.astro
│  │
│  ├─ data/
│  │  ├─ projects.ts
│  │  ├─ currently.ts
│  │  └─ site.ts
│  │
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ about.astro
│  │  └─ projects/
│  │
│  └─ styles/
│     ├─ global.css
│     └─ tokens.css
│
├─ content/
│  └─ projects/
│
├─ public/
│  ├─ images/
│  └─ projects/
│
├─ AI_GUIDE.md
└─ README.md
```

不要把所有页面写进一个大文件。

不要把所有项目内容直接硬编码在首页。

---

# 4. 项目数据结构

所有项目基础信息统一存储在：

`src/data/projects.ts`

例如：

```ts
export type ProjectStatus =
  | "building"
  | "prototype"
  | "released"
  | "archived";

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  status: ProjectStatus;
  year: number;
  featured: boolean;
  tags: string[];
  cover: string;
  shortDescription: string;
  currentFocus?: string;
  nextStep?: string;
}

export const projects: Project[] = [
  {
    slug: "ceramic-fish",
    title: "Ceramic Fish Studio",
    status: "released",
    year: 2026,
    featured: true,
    tags: ["Web", "Mini Game", "Creative"],
    cover: "/projects/ceramic-fish.jpg",
    shortDescription:
      "A small interactive experience about collecting and caring for ceramic fish."
  }
];
```

项目详细内容放：

`content/projects/[slug].md`

或 MDX。

---

# 5. 项目状态系统

不要使用简单的：

Completed / Unfinished

改成四种状态：

### Building
目前正在积极开发。

视觉建议：
黄色。

### Prototype
核心概念已验证，但不是成熟产品。

视觉建议：
浅蓝 / 灰蓝。

### Released
已经公开发布，可以使用或体验。

视觉建议：
浅绿色或低饱和蓝绿色。

### Archived
已经停止或暂缓维护，但项目仍有展示价值。

视觉建议：
灰色。

状态必须明显，但不能像企业后台标签。

---

# 6. 首页结构

## 6.1 Header

左侧：

`mi.`

建议放在一个不规则黄色手绘形状上。

导航：

- Home
- Projects
- Notes
- About

右侧：

`Get in touch →`

导航整体保持轻量。

不要固定巨大导航栏。

---

# 6.2 Hero

整体为左右布局。

### 左侧

小标签：

`CREATIVE TECHNOLOGIST`

下一行：

`IN PROGRESS...`

主标题：

**Small ideas,  
Brighter days.**

标题使用较有手写感但仍可读的字体。

黄色手绘下划线。

正文：

`I turn ideas into small interactive things — games, tools, and digital experiments.`

可加入中文小字：

`把一些小小的想法，变成可以玩的东西。`

CTA：

`Explore my work ↓`

---

## 6.3 Hero 右侧视觉

不要出现人物。

做成一个温暖的创作工作台：

- 桌面
- 显示器 / 笔记本
- 书
- 植物
- 台灯
- 笔筒
- 小猫
- 便签
- 少量项目相关小物件

整体视觉：

**warm creative workspace**

不要照片级真实。

略带插画感。

可以使用静态插画或 CSS / SVG 组合。

可加入极轻微互动：

- 台灯光晕变化
- 猫尾巴轻微移动
- 便签轻晃
- hover 时小星星出现

动画频率必须低。

禁止持续晃动大量元素。

---

# 7. Currently 状态栏

Hero 下方放一条横向状态栏。

类似个人创作系统的实时状态。

标题：

`CURRENTLY:`

数据来源：

`src/data/currently.ts`

例如：

```ts
export const currently = [
  "Building a click-to-solve game",
  "Preparing reusable Game Jam modules",
  "Exploring ideas for Anker Hackathon"
];
```

视觉上可类似 ticker，但不要快速滚动。

桌面端横向排列。

移动端可上下排列。

---

# 8. Projects 主区域

标题：

`Projects ✦`

副标题：

`Different stages, same curiosity.`

增加筛选：

- All
- Building
- Prototype
- Released
- Archive

点击筛选后只显示对应项目。

尽量使用前端轻量过滤，不刷新页面。

---

# 9. Project Card

每张项目卡片包含：

- cover image
- status
- title
- short description
- tags
- 箭头按钮

可选：

`currentFocus`

例如：

`Currently: interaction polish`

卡片 hover：

不要大幅悬浮。

只允许：

- 图片轻微移动 4–8px
- 卡片背景轻微变暖
- 箭头轻微移动
- 状态标签强调
- 出现一句非常短的手写注释

例如：

`still figuring this out...`

`this one actually shipped :)`

`paused, but learned a lot.`

这些注释要体现个人感。

---

# 10. 项目详情页

项目详情页不是传统产品介绍页。

更像：

**creative case study / working notebook**

建议结构：

## Overview

- 项目是什么
- 为什么做
- Status
- Year
- Role
- Stack

## The Idea

为什么会产生这个想法。

## What I Built

具体做了什么。

## Process

可以展示：

- 草图
- UI
- 迭代
- Demo
- screenshots

## Current Status

例如：

`Prototype`

说明：

`The core interaction works, but the project is not actively maintained at the moment.`

## What I Learned

强调过程和收获。

这样即使项目不成熟，也不会像“失败项目”。

---

# 11. About

About 不要写成传统 CV。

建议文案方向：

`I'm mi.`

`I come from a language and humanities background, and now I build small games, tools and interactive experiments.`

`I'm interested in how ideas, technology and everyday life can meet — especially things that feel a little kinder, more playful, and more human.`

不要出现：

- 学校名称
- 真实姓名
- 具体毕业年份
- 具体所在地
- 过多可识别身份的信息

网站采用半匿名职业身份。

---

# 12. 视觉系统

核心配色：

```css
:root {
  --cream: #F7F2E7;
  --yellow: #F4C84A;
  --yellow-soft: #F9E7A5;
  --blue: #3157C8;
  --blue-soft: #DCE6FA;
  --ink: #1A1A1A;
  --gray: #77736B;
  --white: #FFFDF8;
}
```

允许在实际开发中微调。

比例建议：

- 65% cream / white
- 15% black / gray
- 12% yellow
- 8% blue

黄色是品牌识别色。

蓝色只做辅助。

不要大面积同时使用高饱和黄蓝。

---

# 13. 排版

正文：

清晰现代 Sans Serif。

标题：

可使用带一点手写 / editorial 性格的字体。

原则：

手写字体只能用于：

- 大标题
- 小注释
- 装饰文字

正文必须易读。

不要全站手写字体。

---

# 14. UI 风格

整体关键词：

**Editorial + Creative Workspace + Hand-drawn Detail**

可以加入：

- 手绘箭头
- 小星星
- 便签
- 手绘下划线
- 猫的小插画
- scribble
- 小括号文字
- 不完全规则的装饰边缘

但必须克制。

每个屏幕最多出现 2–4 个明显装饰元素。

---

# 15. 动效

目标：

**灵动，而不是炫技。**

允许：

- fade in
- subtle slide
- handwritten underline reveal
- small hover movement
- lamp glow
- tiny doodle animation

禁止：

- 大量 parallax
- WebGL
- 复杂 3D
- 夸张鼠标跟随
- 每个元素都运动
- 长时间 loading intro
- scroll hijacking

所有动画必须支持：

`prefers-reduced-motion`

---

# 16. 响应式

重点尺寸：

- desktop
- tablet
- mobile

移动端不得只是缩小桌面版本。

Hero 在手机上：

文字在上。

工作台视觉在下。

Projects 变成单列或双列。

保证：

- 字体可读
- 点击区域足够大
- 不横向溢出

---

# 17. 性能

首页目标：

尽可能轻。

要求：

- 图片使用 WebP / AVIF
- lazy loading
- 不加载不必要 JS
- 不使用重型框架逻辑
- 避免自动播放视频
- 尽量静态生成

---

# 18. SEO

每个项目页面必须有：

- title
- description
- Open Graph image
- canonical URL

主页 title 建议：

`mi. — Creative Technologist & Independent Maker`

但不要过度 SEO 化。

---

# 19. AI_GUIDE.md

项目根目录必须生成：

`AI_GUIDE.md`

内容：

```md
# AI Maintenance Guide

## Tech Stack

Astro + TypeScript + CSS.

## Architecture

Project metadata:
src/data/projects.ts

Current activities:
src/data/currently.ts

Site-level text:
src/data/site.ts

Detailed project content:
content/projects/

Reusable UI:
src/components/

Global design tokens:
src/styles/tokens.css

## Maintenance Rules

1. Do not scan the entire repository unless required.
2. For project content updates, check data/content files first.
3. Do not modify global styles for a local component request.
4. Do not refactor unrelated code.
5. Preserve the yellow / blue / cream visual system.
6. Preserve current responsive behavior.
7. Preserve accessibility.
8. Project statuses can only be:

- building
- prototype
- released
- archived

## Common Tasks

Change project status:
Only modify src/data/projects.ts.

Add a project:
Add metadata to projects.ts and create one content file.

Edit project article:
Only edit its Markdown/MDX file.

Change site colors:
Edit tokens.css first.

Change project card:
Read ProjectCard.astro and StatusBadge.astro only unless dependencies require more files.

Change hero:
Read Hero.astro and site.ts only.

Change Currently bar:
Edit currently.ts first.

## Token Efficiency

When performing AI-assisted edits:
Read only the smallest relevant set of files.

Do not automatically inspect:
- all project files
- all images
- unrelated components
- build output
- node_modules
```

---

# 20. README

README 面向人。

AI_GUIDE 面向 AI。

不要混在一起。

README 只需包含：

- 本地运行
- build
- deploy
- 技术栈
- 项目结构简述

---

# 21. 初始项目分类

初始界面里可以先使用占位内容。

示例：

### Building

- Click-to-Solve Game
- VN Editor
- Anker Hackathon Concept

### Released

- Ceramic Fish Studio

### Prototype

- experimental tools

### Archived

- older software / paused experiments

不要假装所有项目都是成熟产品。

---

# 22. 网站人格

网站不是：

`Look how professional I am.`

而是：

`Here are the things I'm making, learning and exploring.`

访客应该感觉：

这个人：

- 有想法
- 会动手实现
- 有自己的审美
- 项目不一定都成熟
- 但一直在认真制作东西
- 愿意探索
- 有一点幽默
- 很有人味

---

# 23. 最终开发要求

请先完成：

1. 网站整体文件结构
2. Design tokens
3. 首页
4. Projects filtering
5. Project detail template
6. About
7. 响应式
8. AI_GUIDE.md
9. README

开发过程中：

不要为了“酷”牺牲可维护性。

不要为了动画建立复杂架构。

优先保证：

**视觉特色 > 清晰结构 > 易维护 > 动画复杂度**

如果某个视觉效果会显著增加未来 AI 修改成本，请选择更简单的实现。