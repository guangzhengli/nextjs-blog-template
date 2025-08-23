import { type Metadata } from "next";
import { allBlogs } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { Bookmark, Tag, ChevronRight } from "lucide-react";
import { TagCloud } from "@/components/tag-cloud";

export const metadata: Metadata = {
  title: `Blogs | ${config.site.title}`,
  description: `Blogs of ${config.site.title}`,
  keywords: `${config.site.title}, blogs, ${config.site.title} blogs, nextjs blog template`,
};

export default function BlogPage() {
  const blogs = allBlogs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 获取所有分类
  const categories = new Set<string>();
  // 分类显示名称映射
  const categoryDisplayMap: Record<string, string> = {};
  
  allBlogs.forEach((blog: any) => {
    if (blog.category) {
      categories.add(blog.category);
      // 记录分类显示名称
      if (blog.categoryDisplay) {
        categoryDisplayMap[blog.category] = blog.categoryDisplay;
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 主内容区 */}
        <div className="md:w-2/3 space-y-8">
          {blogs.map((blog: any) => (
          <article 
            key={blog.slug} 
            className=""
          >
            <div className="flex flex-col space-y-2">
              <Link href={`/blog/${blog.slug}`}>
                <div>
                  <h2 className="text-xl font-semibold underline underline-offset-4">
                    {blog.title}
                  </h2>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(blog.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'numeric', 
                      day: 'numeric'
                    }).replace(/\//g, '年').replace(/\//g, '月') + '日'} · {count(blog.content)} 字
                  </div>
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
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-gray-500" />
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.map((tag: string, index: number) => (
                          <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                              {blog.tagsDisplay && blog.tagsDisplay[index] ? blog.tagsDisplay[index] : tag}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
        </div>

        {/* 侧边栏 */}
        <div className="md:w-1/4 space-y-8">
          {/* 分类列表 - 根据配置显示 */}
          {config.article_category.sidebar && (
            <div className="bg-gray-20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bookmark className="h-5 w-5 mr-2 text-gray-600" />
                分类
              </h3>
              <div className="space-y-2">
                {Array.from(categories).map((category) => (
                  <Link 
                    key={category} 
                    href={`/category/${encodeURIComponent(category)}`}
                    className="block py-1 px-2 hover:bg-gray-100 rounded transition-colors text-sm"
                  >
                    {categoryDisplayMap[category] || category}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 标签云 - 根据配置显示 */}
          {config.article_tag.sidebar && (
            <div className="bg-gray-20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-gray-600" />
                标签
              </h3>
              <TagCloud showCount={true} useFixedSize={true} />
              <div className="mt-4 text-right">
                <Link href="/tag" className="text-sm text-blue-600 hover:underline inline-flex items-center">
                  查看全部标签 <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


