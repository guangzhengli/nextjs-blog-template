import Image from "next/image";
import { config } from "@/lib/config";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    const logoConfig = config.site.logo;
    // 移除可能影响尺寸的 className，只保留非尺寸相关的样式
    const filteredClassName = className?.replace(/\b(w-\w+|h-\w+|size-\w+)\b/g, '').trim();
    const logoClassName = cn("flex-shrink-0", filteredClassName);

    // 直接使用配置中的尺寸
    const displayWidth = logoConfig.width;
    const displayHeight = logoConfig.height;

    switch (logoConfig.type) {
        case "icon": {
            // 动态获取 Lucide 图标组件
            const IconComponent = (LucideIcons as any)[logoConfig.icon];

            if (!IconComponent) {
                console.warn(`Lucide icon "${logoConfig.icon}" not found, falling back to SquareTerminal`);
                const FallbackIcon = LucideIcons.SquareTerminal;
                return (
                    <FallbackIcon
                        className={logoClassName}
                        style={{ width: displayWidth, height: displayHeight }}
                    />
                );
            }

            return (
                <IconComponent
                    className={logoClassName}
                    style={{ width: displayWidth, height: displayHeight }}
                />
            );
        }

        case "svg":
            return (
                <div
                    className={logoClassName}
                    style={{ width: displayWidth, height: displayHeight }}
                >
                    <object
                        data={logoConfig.svg}
                        type="image/svg+xml"
                        width={displayWidth}
                        height={displayHeight}
                        aria-label={logoConfig.alt}
                        className="w-full h-full"
                    >
                        {/* SVG 加载失败时的后备方案 */}
                        <LucideIcons.SquareTerminal
                            className="w-full h-full"
                        />
                    </object>
                </div>
            );

        case "img":
            return (
                <Image
                    src={logoConfig.img}
                    alt={logoConfig.alt}
                    width={logoConfig.width}
                    height={logoConfig.height}
                    className={logoClassName}
                    style={{ width: displayWidth, height: displayHeight }}
                    priority
                />
            );

        default:
            // 默认后备方案
            return (
                <LucideIcons.SquareTerminal
                    className={logoClassName}
                    style={{ width: displayWidth, height: displayHeight }}
                />
            );
    }
}