import { type Metadata } from "next";
import { EnhancedTagList } from "@/components/enhanced-tag-list";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: `所有标签 | ${config.site.title}`,
  description: `浏览所有文章标签 - ${config.site.title}`,
};

export default function TagsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">所有标签</h1>
          <p className="text-gray-600 mt-2">
            浏览所有文章标签，点击标签可以查看相关文章。标签颜色深浅反映了使用频率。
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <EnhancedTagList />
        </div>
      </div>
    </div>
  );
}
