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
    logo: {
      type: "img", // icon: 使用 Lucide 图标, svg: 使用 SVG 文件, img: 使用图片文件
      icon: "SquareTerminal", // 当 type 为 "icon" 时使用的 Lucide 图标名称
      svg: "/logo.svg", // 当 type 为 "svg" 时使用的 SVG 文件路径
      img: "/favicon.png", // 当 type 为 "img" 时使用的图片文件路径
      alt: "wangxiaotao's blog", // 图片的 alt 文本
      width: 100, // logo 宽度
      height: 100, // logo 高度
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
    ],
  },
  seo: {
    metadataBase: new URL("https://xxx.com"),
    alternates: {
      canonical: "./",
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
