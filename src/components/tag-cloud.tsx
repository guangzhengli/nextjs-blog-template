"use client"

import * as React from 'react'
import Link from 'next/link'
import { allBlogs } from 'content-collections'
import { cn } from '@/lib/utils'

// 计算标签使用频率
export function getTagsWithFrequency() {
  const tagFrequency: Record<string, number> = {}
  // 标签显示名称映射
  const tagDisplayMap: Record<string, string> = {}
  
  allBlogs.forEach((blog: any) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag: string, index: number) => {
        // 记录标签频率
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1
        
        // 记录标签显示名称
        if (blog.tagsDisplay && blog.tagsDisplay[index]) {
          tagDisplayMap[tag] = blog.tagsDisplay[index]
        }
      })
    }
  })
  
  // 转换为数组并排序
  const sortedTags = Object.entries(tagFrequency)
    .map(([tag, count]) => ({ 
      tag, 
      count,
      // 使用标签显示名称，如果有的话
      displayName: tagDisplayMap[tag] || tag 
    }))
    .sort((a, b) => b.count - a.count)
  
  return sortedTags
}

// 标签云组件
interface TagCloudProps {
  limit?: number
  className?: string
  showCount?: boolean
  minFontSize?: number
  maxFontSize?: number
  customTags?: Array<{tag: string, count: number, displayName?: string}>
  useFixedSize?: boolean
  fixedSize?: number
}

export function TagCloud({ 
  limit, 
  className, 
  showCount = false,
  minFontSize = 12,
  maxFontSize = 24,
  customTags,
  useFixedSize = false,
  fixedSize = 14
}: TagCloudProps) {
  const [tags, setTags] = React.useState<Array<{tag: string, count: number, displayName?: string}>>([])  
  React.useEffect(() => {
    // 如果提供了自定义标签列表，则使用自定义标签
    if (customTags) {
      setTags(limit ? customTags.slice(0, limit) : customTags)
      return
    }
    
    // 否则使用所有博客文章的标签
    const allTags = getTagsWithFrequency()
    setTags(limit ? allTags.slice(0, limit) : allTags)
  }, [limit, customTags])
  
  // 如果没有标签，返回空
  if (tags.length === 0) {
    return null
  }
  
  // 计算最大和最小频率
  const maxCount = Math.max(...tags.map(t => t.count))
  const minCount = Math.min(...tags.map(t => t.count))
  
  // 计算标签字体大小
  const getFontSize = (count: number) => {
    // 如果使用固定字体大小，直接返回固定大小
    if (useFixedSize) return fixedSize
    
    if (maxCount === minCount) return (minFontSize + maxFontSize) / 2
    
    const size = minFontSize + 
      ((count - minCount) / (maxCount - minCount)) * (maxFontSize - minFontSize)
    
    return Math.round(size)
  }
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map(({ tag, count }) => (
        <Link 
          key={tag} 
          href={`/tag/${encodeURIComponent(tag)}`}
          className="transition-all hover:text-blue-600"
          style={{ fontSize: `${getFontSize(count)}px` }}
        >
          <span className="whitespace-nowrap">
            {tags.find(t => t.tag === tag)?.displayName || tag}
            {showCount && <span className="text-gray-500 text-xs ml-1">({count})</span>}
          </span>
        </Link>
      ))}
    </div>
  )
}

// 字母索引标签组件
export function AlphabeticalTagList() {
  const [groupedTags, setGroupedTags] = React.useState<Record<string, Array<{tag: string, count: number, displayName?: string}>>>({})  
  const [letters, setLetters] = React.useState<string[]>([])
  
  React.useEffect(() => {
    const allTags = getTagsWithFrequency()
    
    // 按字母分组
    const grouped: Record<string, Array<{tag: string, count: number, displayName?: string}>> = {}
    
    allTags.forEach(tagItem => {
      const firstLetter = tagItem.tag.charAt(0).toUpperCase()
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = []
      }
      grouped[firstLetter].push(tagItem)
    })
    
    // 对每个字母组内的标签按字母顺序排序
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.tag.localeCompare(b.tag))
    })
    
    // 获取所有字母并排序
    const allLetters = Object.keys(grouped).sort()
    
    setGroupedTags(grouped)
    setLetters(allLetters)
  }, [])
  
  if (letters.length === 0) {
    return <div className="text-gray-500">暂无标签</div>
  }
  
  return (
    <div className="space-y-8">
      {/* 字母索引 */}
      <div className="flex flex-wrap gap-2 sticky top-0 bg-white py-2 z-10 border-b">
        {letters.map(letter => (
          <a 
            key={letter} 
            href={`#tag-group-${letter}`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>
      
      {/* 标签列表 */}
      <div className="space-y-6">
        {letters.map(letter => (
          <div key={letter} id={`tag-group-${letter}`} className="scroll-mt-20">
            <h3 className="text-xl font-bold mb-3">{letter}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {groupedTags[letter].map(({ tag, count, displayName }) => (
                <Link 
                  key={tag} 
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <span>{displayName || tag}</span>
                  <span className="text-sm text-gray-500">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
