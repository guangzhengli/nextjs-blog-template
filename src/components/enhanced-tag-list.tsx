"use client"

import * as React from 'react'
import Link from 'next/link'
import { Search, ArrowUpDown, Grid, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getTagsWithFrequency } from './tag-cloud'
import { Button } from '@/components/ui/button'

type ViewMode = 'grid' | 'list'
type SortMode = 'frequency' | 'name'

export function EnhancedTagList() {
  const [tags, setTags] = React.useState<Array<{tag: string, count: number, displayName?: string}>>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid')
  const [sortMode, setSortMode] = React.useState<SortMode>('frequency')
  const [totalTags, setTotalTags] = React.useState(0)
  const [totalArticles, setTotalArticles] = React.useState(0)
  
  React.useEffect(() => {
    const allTags = getTagsWithFrequency()
    setTags(allTags)
    setTotalTags(allTags.length)
    
    // 计算文章总数（可能有重复计算，仅作为参考）
    const articleCount = allTags.reduce((sum, tag) => sum + tag.count, 0)
    setTotalArticles(articleCount)
  }, [])
  
  // 根据搜索词过滤标签
  const filteredTags = React.useMemo(() => {
    if (!searchQuery.trim()) return tags
    
    return tags.filter(tag => {
      const searchTarget = tag.displayName || tag.tag
      return searchTarget.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [tags, searchQuery])
  
  // 根据排序模式排序标签
  const sortedTags = React.useMemo(() => {
    if (sortMode === 'frequency') {
      return [...filteredTags].sort((a, b) => b.count - a.count)
    } else {
      return [...filteredTags].sort((a, b) => a.tag.localeCompare(b.tag))
    }
  }, [filteredTags, sortMode])
  
  // 获取标签的颜色深度，基于使用频率
  const getTagColorClass = (count: number) => {
    const max = Math.max(...tags.map(t => t.count))
    const min = Math.min(...tags.map(t => t.count))
    
    if (max === min) return 'bg-blue-100 text-blue-800 border-blue-200'
    
    const ratio = (count - min) / (max - min)
    
    if (ratio > 0.8) return 'bg-blue-200 text-blue-900 border-blue-300 font-medium'
    if (ratio > 0.6) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (ratio > 0.4) return 'bg-gray-200 text-gray-800 border-gray-300'
    if (ratio > 0.2) return 'bg-gray-100 text-gray-700 border-gray-200'
    return 'bg-gray-50 text-gray-600 border-gray-100'
  }
  
  return (
    <div className="space-y-6">
      {/* 统计信息 */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-sm text-gray-500">标签总数</div>
            <div className="text-2xl font-bold">{totalTags}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">文章引用</div>
            <div className="text-2xl font-bold">{totalArticles}</div>
          </div>
        </div>
        <Link href="/blog" className="text-blue-600 hover:underline text-sm">
          查看全部文章 →
        </Link>
      </div>
      
      {/* 搜索和控制栏 */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索标签..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full pl-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* 排序按钮 */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setSortMode(sortMode === 'frequency' ? 'name' : 'frequency')}
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortMode === 'frequency' ? '按频率排序' : '按名称排序'}
          </Button>
          
          {/* 视图切换按钮 */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* 标签显示区域 */}
      {sortedTags.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          没有找到匹配的标签
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {sortedTags.map((tagItem) => (
            <Link 
              key={tagItem.tag} 
              href={`/tag/${encodeURIComponent(tagItem.tag)}`}
              className={cn(
                "flex items-center justify-between p-3 rounded-md border transition-all hover:shadow-md",
                getTagColorClass(tagItem.count)
              )}
            >
              <span className="font-medium truncate">{tagItem.displayName || tagItem.tag}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70">
                {tagItem.count}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTags.map((tagItem) => (
            <Link 
              key={tagItem.tag} 
              href={`/tag/${encodeURIComponent(tagItem.tag)}`}
              className="flex items-center justify-between p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  tagItem.count > 5 ? "bg-blue-500" : 
                  tagItem.count > 3 ? "bg-blue-300" : 
                  tagItem.count > 1 ? "bg-blue-200" : "bg-gray-300"
                )} />
                <span>{tagItem.displayName || tagItem.tag}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{tagItem.count} 篇文章</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
