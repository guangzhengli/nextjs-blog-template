"use client"

import * as React from "react"
import { Menu, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { menuItems, MenuItem } from "./nav-data"
import { useCategoriesMenu } from "./nav-dynamic-menu"
import { config } from "@/lib/config"

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between py-2 text-lg font-medium transition-colors hover:text-primary",
              depth > 0 && "pl-4"
            )}
          >
            {item.title}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.submenu.map((subItem) => (
            <MenuItemComponent key={subItem.title} item={subItem} depth={depth + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <a
      href={item.href}
      title={item.title}
      className={cn(
        "block py-2 text-lg font-medium transition-colors hover:text-primary",
        depth > 0 && "pl-4",
        item.href === "/" && "text-primary"
      )}
    >
      {item.title}
    </a>
  )
}

export function NavMobileMenu() {
  const [open, setOpen] = React.useState(false)

  // 使用动态生成的分类菜单
  const categoriesMenu = useCategoriesMenu();

  // 创建包含动态菜单的完整菜单项列表
  const fullMenuItems = menuItems.filter(item => {
    // 根据配置过滤分类和标签菜单项
    if (item.title === "分类" && !config.article_category.navbar) {
      return false;
    }
    if (item.title === "标签" && !config.article_tag.navbar) {
      return false;
    }
    return true;
  }).map(item => {
    if (item.title === "分类") {
      return categoriesMenu;
    }
    // 标签直接使用原始菜单项，不再生成下拉列表
    return item;
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden ml-4">
          <Menu className="h-10 w-10" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>导航菜单</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 ml-4">
          {fullMenuItems.map((item) => (
            <MenuItemComponent key={item.title} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}