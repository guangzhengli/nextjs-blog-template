import { type Metadata } from "next";
import { allBlogs } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { Tag, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { TagCloud } from "@/components/tag-cloud";

type CategoryPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);
  
  return {
    title: `${decodedCategory} | ${config.site.title}`,
    description: `${decodedCategory}分类下的所有文章 - ${config.site.title}`,
  };
}

export async function generateStaticParams() {
  const categories = new Set<string>();
  
  allBlogs.forEach((blog: any) => {
    if (blog.category) {
      categories.add(blog.category);
    }
  });
  
  return Array.from(categories).map(category => ({
    slug: category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);
  
  const filteredBlogs = allBlogs
    .filter((blog: any) => blog.category === decodedCategory)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (filteredBlogs.length === 0) {
    notFound();
  }
  
  // 获取分类的中文显示名称
  const categoryDisplay = filteredBlogs[0].categoryDisplay || decodedCategory;
  
  // 获取该分类下的所有标签
  const categoryTags = new Set<string>();
  // 标签显示名称映射
  const tagDisplayMap: Record<string, string> = {};
  
  filteredBlogs.forEach((blog: any) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag: string, index: number) => {
        categoryTags.add(tag);
        // 记录标签显示名称
        if (blog.tagsDisplay && blog.tagsDisplay[index]) {
          tagDisplayMap[tag] = blog.tagsDisplay[index];
        }
      });
    }
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 break-words">分类: {categoryDisplay}</h1>
          <p className="text-gray-600 mb-6">该分类下共有 {filteredBlogs.length} 篇文章</p>
          
          <div className="space-y-8">
            {filteredBlogs.map((blog: any) => (
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
              
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
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
                </div>
              )}
            </div>
          </article>
            ))}
          </div>
        </div>
        
        {/* 侧边栏 */}
        <div className="md:w-1/4 space-y-8">
          {/* 分类下的标签 - 根据配置显示 */}
          {config.article_tag.sidebar && categoryTags.size > 0 && (
            <div className="bg-gray-40 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-gray-600" />
                {categoryDisplay} 分类下的标签
              </h3>
              <div>
                {/* 使用 TagCloud 组件显示所有标签 */}
                <TagCloud 
                  showCount={true} 
                  useFixedSize={true}
                  customTags={Array.from(categoryTags).map(tag => ({ 
                    tag, 
                    count: filteredBlogs.filter(blog => 
                      blog.tags && Array.isArray(blog.tags) && blog.tags.includes(tag)
                    ).length,
                    displayName: tagDisplayMap[tag] || tag
                  }))} 
                />
              </div>
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
