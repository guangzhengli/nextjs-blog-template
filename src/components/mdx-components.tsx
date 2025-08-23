import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-8 mb-8 scroll-m-20 text-[3.2rem] leading-[3.6rem] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-8 mb-8 scroll-m-20 text-[1.6rem] leading-[2.4rem] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 mb-8 scroll-m-20 text-[1.4rem] leading-[2.2rem] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading mt-8 mb-8 scroll-m-20 text-[1.2rem] leading-[2rem] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "font-heading mt-8 mb-8 scroll-m-20 text-[1rem] leading-[1.8rem] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "font-heading mt-8 mb-8 scroll-m-20 text-[0.8rem] leading-[1.6rem] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium text-black transition-all duration-300 ease-in-out underline underline-offset-3",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "my-4 text-[1.1rem] leading-[2rem]",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-bold", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2 ml-4 text-[1.1rem] leading-[1.6em]", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "my-6 border-l-[3px] border-[#343a40] pl-4",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("max-w-full w-auto h-auto rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn(
          "mx-auto mb-12 w-full border-collapse border-spacing-0 text-left",
          "text-sm sm:text-base md:text-[1.1rem]",
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-b border-solid border-[#ced4da] p-4 text-left font-semibold",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border-b border-dashed border-[#ced4da] p-4 text-left leading-[1.5]",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="overflow-x-auto my-6">
      <pre
        className={cn(
          "text-[0.8rem] max-w-full",
          className
        )}
        {...props}
      />
    </div>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded-[0.6rem] bg-[#ededeb] px-[0.3rem] py-[0.2rem] break-words",
        "font-mono text-sm md:text-[1.0rem] font-normal text-[#ed4759] overflow-wrap-anywhere",
        className
      )}
      {...props}
    />
  ),
  small: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <small
      className={cn("text-[70%]", className)}
      {...props}
    />
  ),
  Image,
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "font-medium text-blue-600 no-underline transition-all duration-300 ease-in-out hover:underline",
        className
      )}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
        className
      )}
      {...props}
    />
  ),
}

export { components }

