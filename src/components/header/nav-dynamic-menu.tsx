"use client"

import { useEffect, useState } from "react"
import { allBlogs } from "content-collections"
import { MenuItem } from "./nav-data"

// 获取所有分类
export function useCategoriesMenu(): MenuItem {
  const [categories, setCategories] = useState<MenuItem[]>([])
  
  useEffect(() => {
    const categorySet = new Set<string>()
    // 分类显示名称映射
    const categoryDisplayMap: Record<string, string> = {}
    
    allBlogs.forEach((blog: any) => {
      if (blog.category) {
        categorySet.add(blog.category)
        // 记录分类显示名称
        if (blog.categoryDisplay) {
          categoryDisplayMap[blog.category] = blog.categoryDisplay
        }
      }
    })
    
    const categoryItems = Array.from(categorySet).map(category => ({
      title: categoryDisplayMap[category] || category,
      href: `/category/${encodeURIComponent(category)}`
    }))
    
    setCategories(categoryItems)
  }, [])
  
  return {
    title: "分类",
    href: "#",
    submenu: categories
  }
}

// 获取所有标签
export function useTagsMenu(): MenuItem {
  const [tags, setTags] = useState<MenuItem[]>([])
  
  useEffect(() => {
    const tagSet = new Set<string>()
    
    allBlogs.forEach((blog: any) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag: string) => {
          tagSet.add(tag)
        })
      }
    })
    
    const tagItems = Array.from(tagSet).map(tag => ({
      title: tag,
      href: `/tag/${encodeURIComponent(tag)}`
    }))
    
    setTags(tagItems)
  }, [])
  
  return {
    title: "标签",
    href: "#",
    submenu: tags
  }
}
