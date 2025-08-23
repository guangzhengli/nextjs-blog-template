export const config = {
  site: {
    title: "Nextjs Blog Template",
    name: "Nextjs Blog Template",
    description: "Nextjs Blog Template",
    keywords: ["Nextjs Blog Template", "AI", "Full Stack Developer"],
    url: "https://xxx.com",
    baseUrl: "https://xxx.com",
    image: "https://xxx.com/og-image.png",
    favicon: {
      ico: "/favicon.ico",
      png: "/favicon.png",
      svg: "/favicon.svg",
      appleTouchIcon: "/favicon.png",
    },
    manifest: "/site.webmanifest",
    rss: {
      title: "Nextjs Blog Template",
      description: "Thoughts on Full-stack development, AI",
      feedLinks: {
        rss2: "/rss.xml",
        json: "/feed.json",
        atom: "/atom.xml",
      },
    },
  },
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    bio: "这是一个 Nextjs 博客模板",
  },
  // 文章分类显示控制
  article_category: {
    navbar: true,  // 在导航栏中显示分类
    sidebar: true, // 在侧边栏中显示分类
  },
  // 文章标签显示控制
  article_tag: {
    navbar: true,  // 在导航栏中显示标签
    sidebar: true, // 在侧边栏中显示标签
  },
  social: {
    github: "https://github.com/xxx",
    x: "https://x.com/xxx",
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/xxx",
    wechat: "https://storage.xxx.com/images/wechat-official-account.png",
    buyMeACoffee: "https://www.buymeacoffee.com/xxx",
  },
  giscus: {
    repo: "guangzhengli/hugo-ladder-exampleSite",
    repoId: "R_kgDOHyVOjg",
    categoryId: "DIC_kwDOHyVOjs4CQsH7",
  },
  navigation: {
    main: [
      { 
        title: "文章", 
        href: "/blog",
      },
      {
        title: "分类",
        href: "#",
        submenu: [
          // 这里会动态生成分类菜单项
        ]
      },
      {
        title: "标签", 
        href: "/tag",
      },
    ],
  },
  seo: {
    metadataBase: new URL("https://xxx.com"),
    alternates: {
      canonical: './',
    },
    openGraph: {
      type: "website" as const,
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image" as const,
      creator: "@xxx",
    },
  },
};
