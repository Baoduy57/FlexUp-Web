"use client";

import { useParams } from "next/navigation";
import { articles as articlesData, Article } from "@/data/articles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const article: Article | undefined = articlesData.find((a) => a.id === id);

  if (!article) return <div className="p-6">Bài viết không tồn tại.</div>;

  // Split content thành các section: giới thiệu, các bước, tips, kết luận
  const contentSections = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[480px] overflow-hidden rounded-b-3xl shadow-lg">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white space-y-2">
          <h1 className="text-5xl font-bold drop-shadow-lg">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span>{article.author.name}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {article.likes}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
        {/* Back Button */}
        <Link href="/knowledge">
          <Button
            variant="ghost"
            size="lg"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Danh mục",
              value: article.category,
              color: "from-green-400 to-emerald-500",
              icon: Star,
            },
            {
              label: "Thời gian đọc",
              value: `${article.readTime} phút`,
              color: "from-blue-400 to-indigo-500",
              icon: Star,
            },
            {
              label: "Lượt thích",
              value: article.likes,
              color: "from-yellow-400 to-orange-500",
              icon: Star,
            },
            {
              label: "Bookmark",
              value: article.isBookmarked ? "Đã lưu" : "Lưu bài",
              color: "from-purple-400 to-pink-500",
              icon: Bookmark,
            },
          ].map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="rounded-2xl backdrop-blur-md bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition">
                <CardContent className="flex flex-col items-center py-6">
                  <div
                    className={`p-3 rounded-full bg-gradient-to-br ${info.color} text-white shadow`}
                  >
                    <info.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-3 font-semibold text-lg">{info.value}</p>
                  <span className="text-xs text-muted-foreground">
                    {info.label}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <motion.div
          className="flex gap-2 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {article.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-white/30 text-white backdrop-blur px-3 py-1 hover:scale-105 transition"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-10">
          {contentSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="space-y-4"
            >
              <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                {section}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            className="px-10 bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            {article.isBookmarked ? "Đã lưu bài viết" : "Lưu bài viết"}
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
