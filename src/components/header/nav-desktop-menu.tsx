"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { menuItems } from "./nav-data"
import { useCategoriesMenu } from "./nav-dynamic-menu"
import { config } from "@/lib/config"

export function NavDesktopMenu() {
  // 使用动态生成的分类菜单
  const categoriesMenu = useCategoriesMenu();
  
  // 根据配置过滤要显示的菜单项
  const filteredMenuItems = menuItems.filter(item => {
    if (item.title === "分类" && !config.article_category.navbar) {
      return false;
    }
    if (item.title === "标签" && !config.article_tag.navbar) {
      return false;
    }
    return true;
  });
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* 基本菜单项 */}
        {filteredMenuItems.map((item) => {
          // 如果是分类菜单项，使用动态生成的分类
          if (item.title === "分类") {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px] max-h-[300px] overflow-y-auto">
                    {categoriesMenu.submenu && categoriesMenu.submenu.length > 0 ? (
                      categoriesMenu.submenu.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          href={subItem.href}
                        >
                          {subItem.title}
                        </ListItem>
                      ))
                    ) : (
                      <li className="p-2 text-sm text-gray-500">暂无分类</li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          
          // 如果是标签菜单项，直接链接到标签页面
          if (item.title === "标签") {
            return (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href ?? ""} title={item.title} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }
          
          // 其他常规菜单项
          return (
            <NavigationMenuItem key={item.title}>
              {item.submenu ? (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid h-16 w-[150px] p-2">
                      {item.submenu.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          href={subItem.href}
                        >
                          {subItem.title}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item.href ?? ""} title={item.title} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          title={title}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-2xg font-bold leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
