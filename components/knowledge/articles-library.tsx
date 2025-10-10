"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  BookOpen,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { articles } from "@/data/articles";

const categories = ["Tất cả", "Tập luyện", "Dinh dưỡng", "Sức khỏe", "An toàn"];

export function ArticlesLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [articleList, setArticleList] = useState(articles);

  const filteredArticles = articleList.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Tất cả" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookmark = (articleId: string) => {
    setArticleList(
      articleList.map((article) =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const handleLike = (articleId: string) => {
    setArticleList(
      articleList.map((article) =>
        article.id === articleId
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tập luyện":
        return "text-white";
      case "Dinh dưỡng":
        return "text-white";
      case "Sức khỏe":
        return "text-white";
      case "An toàn":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search + Categories */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Tìm kiếm bài viết, từ khóa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all bg-white/70 backdrop-blur">
              <div className="aspect-video relative overflow-hidden group">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`${getCategoryColor(
                      article.category
                    )} backdrop-blur-md shadow`}
                  >
                    {article.category}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/70 hover:bg-white rounded-full shadow-md"
                  onClick={() => handleBookmark(article.id)}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      article.isBookmarked
                        ? "fill-current text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={article.author.avatar || "/placeholder.svg"}
                      alt={article.author.name}
                    />
                    <AvatarFallback>
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {article.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {article.author.expertise}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime} phút
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {new Date(article.publishDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs rounded-full"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(article.id)}
                      >
                        <Heart className="h-4 w-4 mr-1 text-rose-500" />
                        {article.likes}
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1 text-cyan-500" />
                        Chia sẻ
                      </Button>
                    </motion.div>
                  </div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      className="mt-auto"
                      onClick={() => router.push(`/knowledge/${article.id}`)}
                    >
                      Đọc
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="rounded-2xl bg-white/70 backdrop-blur text-center py-12 shadow">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-muted-foreground">
              Thử thay đổi từ khóa tìm kiếm hoặc danh mục
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
