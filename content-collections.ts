import { defineCollection, defineConfig } from "@content-collections/core";

const blogs = defineCollection({
  name: "blogs",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    featured: z.boolean().optional().default(false),
    summary: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    // 英文分类，用于路由
    category: z.string().optional(),
    // 中文分类显示，用于界面显示
    categoryDisplay: z.string().optional(),
    // 英文标签，用于路由
    tags: z.array(z.string()).optional().default([]),
    // 中文标签显示，用于界面显示
    tagsDisplay: z.array(z.string()).optional().default([]),
  }),
  transform: async (document) => {
    return {
      ...document,
      slug: `${document._meta.path}`,
    };
  },
});

export default defineConfig({
  collections: [blogs],
});
