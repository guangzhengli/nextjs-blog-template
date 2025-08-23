import { allBlogs } from "content-collections"
import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getTableOfContents } from "@/lib/toc"
import { DashboardTableOfContents } from "@/components/toc"
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import count from 'word-count'
import { components } from "@/components/mdx-components"
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.min.css'
import GiscusComments from "@/components/giscus-comments"
import { GoToTop } from "@/components/go-to-top"
import 'katex/dist/katex.min.css';
import { config } from "@/lib/config";
import { Bookmark, Tag, Clock, FileText } from "lucide-react";

type BlogsPageProps = {
  params: Promise<{slug: string[]}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const options = {
  mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeHighlight,
        rehypeSlug
      ],
  }
}

async function getBlogsFromParams(slugs: string[]) {
  const slug = slugs?.join("/") || ""
  const blog = allBlogs.find((blog: any) => blog.slug === slug)

  if (!blog) {
    return null
  }

  return blog
}

export async function generateMetadata({ params }: BlogsPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogsFromParams(slug)

  if (!blog) {
    return {}
  }

  return {
    title: blog.title,
    description: blog.title,
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.title,
      type: config.seo.openGraph.type,
      url: absoluteUrl("/" + blog.slug),
      images: [
        {
          url: config.site.image
        },
      ],
    },
    twitter: {
      card: config.seo.twitter.card,
      title: blog.title,
      description: blog.title,
      images: [
        {
          url: config.site.image
        },
      ],
      creator: config.seo.twitter.creator,
    },
  }
}

export async function generateStaticParams(): Promise<string[]> {
  // @ts-ignore
  return allBlogs.map((blog: any) => ({
    slug: blog.slug.split('/'),
  }))
}

export default async function BlogPage(props: BlogsPageProps) {
  const { slug } = await props.params;
  const blog = await getBlogsFromParams(slug)

  if (!blog) {
    notFound()
  }

  const toc = await getTableOfContents(blog.content)
  
  // 获取相关文章
  const relatedArticles = allBlogs
    .filter((article: any) => {
      // 排除当前文章
      if (article.slug === blog.slug) return false;
      
      // 相同分类
      if (article.category === blog.category) return true;
      
      // 共同标签
      if (blog.tags && article.tags) {
        for (const tag of blog.tags) {
          if (article.tags.includes(tag)) return true;
        }
      }
      
      return false;
    })
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // 只取前5篇

  return (
    <main className="relative py-6 w-full md:max-w-6xl mx-auto lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="w-full mx-auto px-4 sm:px-6 overflow-hidden">
        <div className="my-8">
          <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold break-words">{blog.title}</h1>
        </div>

        <div className="my-4 space-y-3">
          <p className="text-sm">
            {new Date(blog.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'numeric', 
              day: 'numeric'
            }).replace(/\//g, '年').replace(/\//g, '月') + '日'} · {count(blog.content)} 字
          </p>
          
          {/* 分类和标签 */}
          <div className="flex flex-wrap items-center gap-4">
            {blog.category && (
              <div className="flex items-center gap-1">
                <Bookmark className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600">分类:</span>
                <Link href={`/category/${encodeURIComponent(blog.category)}`}>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors">
                    {blog.categoryDisplay || blog.category}
                  </span>
                </Link>
              </div>
            )}
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">标签:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                      <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                        {blog.tagsDisplay && blog.tagsDisplay[index] ? blog.tagsDisplay[index] : tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden">
          <MDXRemote source={blog.content} components={components} options={options} />
        </div>

        <GiscusComments />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-6 h-[calc(100vh-3.5rem)]">
          <div className="h-full overflow-auto pb-10 flex flex-col gap-8 mt-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {/* 目录 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">目录</h3>
              <DashboardTableOfContents toc={toc} />
            </div>
            
            {/* 文章标签部分已移除 */}
            
            {/* 相关文章 */}
            {relatedArticles.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-base font-semibold mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-600" />
                  相关文章
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((article: any) => (
                    <div key={article.slug} className="border-b border-gray-100 pb-2 last:border-0">
                      <Link href={`/blog/${article.slug}`} className="hover:text-blue-600 transition-colors">
                        <div className="text-sm font-medium line-clamp-2">{article.title}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(article.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'numeric', 
                            day: 'numeric'
                          }).replace(/\//g, '年').replace(/\//g, '月') + '日'}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <GoToTop />
          </div>
        </div>
      </div>
    </main>
  );
}
