"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Play,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  description: string;
  instructor: { name: string; avatar: string; credentials: string };
  category: string;
  duration: string;
  views: number;
  likes: number;
  publishDate: string;
  thumbnail: string;
  videoUrl: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  isBookmarked: boolean;
  tags: string[];
}

const videos: Video[] = [
  {
    id: "1",
    title: "HIIT Workout 20 Phút - Đốt Cháy Mỡ Toàn Thân",
    description:
      "Bài tập HIIT cường độ cao giúp đốt cháy calories hiệu quả trong thời gian ngắn",
    instructor: {
      name: "HLV Minh Anh",
      avatar: "/user-avatar.jpg",
      credentials: "Chứng chỉ ACSM",
    },
    category: "Cardio",
    duration: "20:15",
    views: 15420,
    likes: 892,
    publishDate: "2024-01-15",
    thumbnail: "/cardio-fat-burning-workout.jpg",
    videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI",
    difficulty: "Trung bình",
    isBookmarked: false,
    tags: ["hiit", "cardio", "giảm cân", "toàn thân"],
  },
  {
    id: "2",
    title: "Yoga Buổi Sáng - 15 Phút Khởi Động Cơ Thể",
    description:
      "Chuỗi động tác yoga nhẹ nhàng để bắt đầu ngày mới đầy năng lượng",
    instructor: {
      name: "Cô Mai Linh",
      avatar: "/user-avatar.jpg",
      credentials: "RYT-200 Yoga Alliance",
    },
    category: "Yoga",
    duration: "15:30",
    views: 8750,
    likes: 654,
    publishDate: "2024-01-12",
    thumbnail: "/fitness-exercise-demonstration.jpg",
    videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
    difficulty: "Dễ",
    isBookmarked: true,
    tags: ["yoga", "buổi sáng", "thư giãn", "linh hoạt"],
  },
  {
    id: "3",
    title: "Tập Ngực Và Vai - Kỹ Thuật Chuẩn",
    description:
      "Hướng dẫn chi tiết các bài tập ngực và vai với kỹ thuật đúng để tránh chấn thương",
    instructor: {
      name: "HLV Đức Anh",
      avatar: "/user-avatar.jpg",
      credentials: "NSCA-CPT",
    },
    category: "Tăng cơ",
    duration: "25:45",
    views: 12300,
    likes: 1205,
    publishDate: "2024-01-10",
    thumbnail: "/chest-and-shoulder-workout.jpg",
    videoUrl: "https://www.youtube.com/embed/GBcN3Ydz8RM",
    difficulty: "Trung bình",
    isBookmarked: false,
    tags: ["ngực", "vai", "tăng cơ", "kỹ thuật"],
  },
  {
    id: "4",
    title: "Stretching Toàn Thân - Phục Hồi Sau Tập",
    description:
      "Bài tập giãn cơ toàn diện giúp phục hồi cơ bắp và tăng tính linh hoạt",
    instructor: {
      name: "PT Hương Giang",
      avatar: "/user-avatar.jpg",
      credentials: "NASM-CES",
    },
    category: "Phục hồi",
    duration: "18:20",
    views: 6890,
    likes: 423,
    publishDate: "2024-01-08",
    thumbnail: "/fitness-exercise-demonstration.jpg",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
    difficulty: "Dễ",
    isBookmarked: true,
    tags: ["stretching", "phục hồi", "linh hoạt", "thư giãn"],
  },
  {
    id: "5",
    title: "Squat và Deadlift - Kỹ Thuật Nâng Cao",
    description:
      "Hướng dẫn kỹ thuật nâng cao cho hai bài tập cơ bản nhất trong gym",
    instructor: {
      name: "HLV Nam Khánh",
      avatar: "/user-avatar.jpg",
      credentials: "Powerlifting Coach",
    },
    category: "Tăng cơ",
    duration: "32:10",
    views: 18650,
    likes: 1456,
    publishDate: "2024-01-05",
    thumbnail: "/chest-and-shoulder-workout.jpg",
    videoUrl: "https://www.youtube.com/embed/lsSC0c93zV8",
    difficulty: "Khó",
    isBookmarked: false,
    tags: ["squat", "deadlift", "kỹ thuật", "nâng cao"],
  },
];
const categories = ["Tất cả", "Cardio", "Tăng cơ", "Yoga", "Phục hồi"];
const difficulties = ["Tất cả", "Dễ", "Trung bình", "Khó"];

export function VideoLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tất cả");
  const [videoList, setVideoList] = useState(videos);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = videoList.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Tất cả" || video.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "Tất cả" ||
      video.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleBookmark = (videoId: string) => {
    setVideoList(
      videoList.map((video) =>
        video.id === videoId
          ? { ...video, isBookmarked: !video.isBookmarked }
          : video
      )
    );
  };

  const handleLike = (videoId: string) => {
    setVideoList(
      videoList.map((video) =>
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cardio":
        return "text-white";
      case "Tăng cơ":
        return "text-white";
      case "Yoga":
        return "text-white";
      case "Phục hồi":
        return "text-white";
      default:
        return "text-white";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "text-white";
      case "Trung bình":
        return "text-white";
      case "Khó":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Tìm kiếm video, huấn luyện viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground self-center">
              Danh mục:
            </span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground self-center">
              Độ khó:
            </span>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={
                  selectedDifficulty === difficulty ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            className="rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div 
                className="aspect-video relative overflow-hidden group cursor-pointer rounded-lg"
                onClick={() => {
                  setSelectedVideo(video);
                  setIsVideoModalOpen(true);
                }}
              >
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="bg-white/90 rounded-full p-3 transition-all"
                  >
                    <Play className="h-6 w-6 text-gray-800 ml-1" />
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={getCategoryColor(video.category)}>
                    {video.category}
                  </Badge>
                  <Badge className={getDifficultyColor(video.difficulty)}>
                    {video.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(video.id);
                    }}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        video.isBookmarked ? "fill-current text-yellow-500" : ""
                      }`}
                    />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-2">
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {video.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {video.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={video.instructor.avatar || "/placeholder.svg"}
                      alt={video.instructor.name}
                    />
                    <AvatarFallback>
                      {video.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {video.instructor.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {video.instructor.credentials}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {video.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {video.likes}
                    </div>
                  </div>
                  <span>
                    {new Date(video.publishDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(video.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {video.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Chia sẻ
                    </Button>
                  </div>
                  <Button size="sm" onClick={() => {
                    setSelectedVideo(video);
                    setIsVideoModalOpen(true);
                  }}>
                    <Play className="h-4 w-4 mr-1" />
                    Xem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredVideos.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy video</h3>
            <p className="text-muted-foreground">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </CardContent>
        </Card>
      )}

      {/* Video Player Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-8">
                <DialogTitle className="text-2xl mb-2">
                  {selectedVideo?.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedVideo?.description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="p-6 pt-4 space-y-4">
              {/* Video Player */}
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={selectedVideo.instructor.avatar} />
                    <AvatarFallback>
                      {selectedVideo.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedVideo.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedVideo.instructor.credentials}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {selectedVideo.views.toLocaleString()} lượt xem
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {selectedVideo.likes.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedVideo.duration}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {selectedVideo.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
