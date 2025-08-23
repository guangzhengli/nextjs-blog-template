---
title: 博客模板使用介绍
date: 2025-04-05T21:10:00+08:00
updated: 2025-04-05T21:10:00+08:00
keywords: ["hello", "world"]
featured: true
summary: "这是一个 Nextjs 博客模板，本文会介绍这个模板的一些基本用法"
category: "guide"
categoryDisplay: "指南"
tags: ["nextjs", "blog", "template"]
tagsDisplay: ["Next.js", "博客", "模板"]
---

这是一个 Nextjs 博客模板，本文会介绍这个模板的一些基本用法。

## 1. 如何编写博客

这个仓库的博客文件需要放在 `src/content/blog` 目录下，可以是 markdown 文件，也可以是 mdx 文件。

有以下这些元数据需要用户自行根据需要进行配置：

- `title`: 博客标题
- `date`: 博客发布日期
- `updated`: 博客更新日期
- `keywords`: 博客关键词，优化 SEO
- `featured`: 是否放在首页
- `summary`: 博客摘要

## 2. 博客配置

博客的所有配置都集中在 `src/lib/config.ts` 文件中，这样做的好处是：

1. 集中管理：所有配置都在一个文件中，方便维护和修改
2. 类型安全：使用 TypeScript 可以获得类型检查和自动补全
3. 复用性：避免重复的配置散落在各个文件中
4. 一致性：确保所有地方使用相同的配置值

### 2.1 站点基本配置

```typescript
site: {
  title: "你的博客标题",
  name: "你的博客名称",
  description: "博客描述",
  keywords: ["关键词1", "关键词2"],
  url: "https://你的域名.com",
  baseUrl: "https://你的域名.com",
  image: "https://你的域名.com/og-image.png",
  favicon: {
    ico: "/favicon.ico",
    png: "/favicon.png",
    svg: "/favicon.svg",
    appleTouchIcon: "/favicon.png",
  },
  manifest: "/site.webmanifest",
}
```

这些配置用于：
- 网站的基本信息展示
- SEO 优化
- 浏览器标签页图标
- 社交媒体分享预览

### 2.2 作者信息配置

```typescript
author: {
  name: "你的名字",
  email: "你的邮箱",
  bio: "个人简介",
}
```

作者信息会用于：
- 首页展示
- RSS 订阅源信息
- 博客文章的作者信息

### 2.3 社交媒体配置

```typescript
social: {
  github: "https://github.com/你的用户名",
  x: "https://x.com/你的用户名",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/你的ID",
  wechat: "你的微信二维码图片链接",
  buyMeACoffee: "https://www.buymeacoffee.com/你的用户名",
}
```

这些链接会显示在：
- 首页的社交媒体链接区域
- 导航栏的社交媒体图标

### 2.4 评论系统配置

```typescript
giscus: {
  repo: "你的GitHub仓库名",
  repoId: "仓库ID",
  categoryId: "分类ID",
}
```

使用 Giscus 作为评论系统，需要：
1. 在 GitHub 上安装 Giscus 应用
2. 在你的仓库中启用 Discussions
3. 获取配置信息并填入这里

### 2.5 导航菜单配置

```typescript
navigation: {
  main: [
    { 
      title: "文章", 
      href: "/blog",
    },
    // 可以添加更多导航项
  ],
}
```

这里配置网站的导航菜单，支持：
- 普通链接
- 带子菜单的下拉菜单

### 2.6 SEO 配置

```typescript
seo: {
  metadataBase: new URL("https://你的域名.com"),
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: "website" as const,
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image" as const,
    creator: "@你的推特用户名",
  },
}
```

这些配置用于：
- 搜索引擎优化
- 社交媒体分享卡片
- 网站元数据

### 2.7 RSS 订阅配置

```typescript
rss: {
  title: "你的博客标题",
  description: "博客描述",
  feedLinks: {
    rss2: "/rss.xml",
    json: "/feed.json",
    atom: "/atom.xml",
  },
}
```

这些配置用于生成：
- RSS 2.0 订阅源
- JSON Feed
- Atom 订阅源

## 3. 如何修改配置

1. 打开 `src/lib/config.ts` 文件
2. 根据你的需求修改相应的配置项
3. 保存文件后，Next.js 会自动重新构建并应用新的配置

注意事项：
- 确保所有 URL 都是有效的
- 图片链接应该是可访问的
- 社交媒体链接要填写完整的 URL
- 配置修改后，建议检查网站的：
  - 首页展示
  - 导航菜单
  - SEO 信息
  - 社交媒体分享效果
  - RSS 订阅源

## 4. 如何生成 RSS 订阅源

修改 scripts/generate-rss.js 文件中的配置，然后运行：

```bash
npm run generate-rss
```

## 5. 如何生成 Sitemap

修改 scripts/generate-sitemap.js 文件中的配置，然后运行：

```bash
npm run generate-sitemap
```

