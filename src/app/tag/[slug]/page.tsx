import { type Metadata } from "next";
import { allBlogs } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

type TagPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug);
  
  return {
    title: `标签: ${decodedTag} | ${config.site.title}`,
    description: `标签为 ${decodedTag} 的所有文章 - ${config.site.title}`,
  };
}

export async function generateStaticParams() {
  const tags = new Set<string>();
  
  allBlogs.forEach((blog: any) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag: string) => {
        tags.add(tag);
      });
    }
  });
  
  return Array.from(tags).map(tag => ({
    slug: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug);
  
  const filteredBlogs = allBlogs
    .filter((blog: any) => blog.tags && Array.isArray(blog.tags) && blog.tags.includes(decodedTag))
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (filteredBlogs.length === 0) {
    notFound();
  }
  
  // 获取标签的中文显示名称
  let tagDisplay = decodedTag;
  
  // 循环查找标签的中文显示名称
  for (const blog of filteredBlogs) {
    if (blog.tags && blog.tagsDisplay) {
      const tagIndex = blog.tags.indexOf(decodedTag);
      if (tagIndex !== -1 && blog.tagsDisplay[tagIndex]) {
        tagDisplay = blog.tagsDisplay[tagIndex];
        break;
      }
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 break-words">标签: {tagDisplay}</h1>
      <p className="text-gray-600 mb-6">该标签下共有 {filteredBlogs.length} 篇文章</p>
      
      <div className="space-y-8">
        {filteredBlogs.map((blog: any) => (
          <article 
            key={blog.slug} 
            className=""
          >
            <div className="flex flex-col space-y-2">
              <Link href={`/blog/${blog.slug}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold underline underline-offset-4">
                    {blog.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                  {new Date(blog.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'numeric', 
                    day: 'numeric'
                  }).replace(/\//g, '年').replace(/\//g, '月') + '日'} · {count(blog.content)} 字
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2 mt-2">
                  {blog.summary}
                </p>
              </Link>
              
              {blog.category && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Bookmark className="h-3 w-3 text-blue-600" />
                    <Link href={`/category/${encodeURIComponent(blog.category)}`}>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors">
                        {blog.categoryDisplay || blog.category}
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
