"use client";

import Link from "next/link";
import { NavDesktopMenu } from "./nav-desktop-menu";
import { NavMobileMenu } from "./nav-mobile-menu";
import GithubIcon from "@/components/icons/github";
import XiaohongshuIcon from "@/components/icons/xiaohongshu";
import XIcon from "@/components/icons/x";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SquareTerminal } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isBlogPage = pathname.includes("/blog/");

  return (
    <header className="pt-4">
      <motion.div
        initial={{ maxWidth: "48rem" }}
        animate={{ maxWidth: isBlogPage ? "72rem" : "48rem" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn("container mx-auto flex h-16 items-center justify-between md:px-4", isBlogPage ? "max-w-4xl xl:max-w-6xl" : "max-w-3xl")}
      >
        {/* Mobile navigation */}
        <NavMobileMenu />

        {/* Logo */}
        <Link href="/" title="Home" className="flex items-center gap-4 md:order-first">
          <SquareTerminal className="w-10 h-10" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:block">
          <NavDesktopMenu />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2 md:space-x-8 mr-4">
          <Link href="https://github.com/guangzhengli" title="Github">
            <GithubIcon />
          </Link>
          <Link href="https://x.com/iguangzhengli" title="X">
            <XIcon />
          </Link>
          <Link href="https://www.xiaohongshu.com/user/profile/6076c9a2000000000101e862" title="Xiaohongshu">
            <XiaohongshuIcon />
          </Link>
        </div>
      </motion.div>
    </header >
  );
}
