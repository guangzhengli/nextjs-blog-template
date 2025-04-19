import { allBlogs } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const blogs = allBlogs
    .filter((blog: any) => blog.featured === true)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const socialLinks = [
    { name: "赞赏", key: "buyMeACoffee" },
    { name: "X", key: "x" },
    { name: "小红书", key: "xiaohongshu" },
    { name: "微信公众号", key: "wechat" },
  ]
    .map(item => ({
      name: item.name,
      href: config.social && config.social[item.key as keyof typeof config.social]
    }))
    .filter(link => !!link.href);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 个人介绍部分 */}
      <div className="mb-16 space-y-4">
        <h1 className="text-4xl font-bold">{config.site.title}</h1>
        <p className="text-md text-gray-600">{config.author.bio}</p>
        
        {/* 社交链接 - 仅当有链接时才显示 */}
        {socialLinks.length > 0 && (
          <div className="flex space-x-2 text-gray-600">
            {socialLinks.map((link, index) => (
              <div key={link.name} className="flex items-center">
                {index > 0 && <span className="mx-1">·</span>}
                <Link href={link.href} className="underline underline-offset-4">
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-8">推荐阅读</h2>
        <div className="space-y-8">
          {blogs.map((blog: any) => (
            <article key={blog.slug} className="">
              <Link href={`/blog/${blog.slug}`}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold underline underline-offset-4">
                      {blog.title}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {formatDate(blog.date)} · {count(blog.content)} 字
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {blog.summary}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
