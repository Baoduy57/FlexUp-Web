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
  isLiked: boolean;
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
    title: "15 PHÚT TABATA CỰC ĐÃ - Toàn thân, toát mồ hôi",
    description:
      "Bài tập Tabata (một dạng HIIT) cường độ cao trong 15 phút giúp đốt mỡ toàn thân hiệu quả và nhanh chóng. Không cần dụng cụ.",
    instructor: {
      name: "Hana Giang Anh",
      avatar: "/user-avatar.jpg",
      credentials: "HLV Fitness & Yoga",
    },
    category: "Cardio",
    duration: "17:26",
    views: 931000,
    likes: 14000,
    isLiked: false,
    publishDate: "2021-07-27",
    thumbnail: "https://i.ytimg.com/vi/DT5rVjFeDX0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/DT5rVjFeDX0",
    difficulty: "Trung bình",
    isBookmarked: false,
    tags: ["hiit", "tabata", "toàn thân", "giảm mỡ", "hana giang anh"],
  },
  {
    id: "2",
    title: "Yoga cho NGƯỜI MỚI - Bài 1: MỀM CƠ, DẺO KHỚP",
    description:
      "Bài tập Yoga đầu tiên trong chuỗi video cho người mới bắt đầu, tập trung vào các động tác làm mềm cơ và tăng sự dẻo dai cho khớp.",
    instructor: {
      name: "Yoga By Sophie",
      avatar: "/user-avatar.jpg",
      credentials: "Yoga Alliance Certified",
    },
    category: "Yoga",
    duration: "38:34",
    views: 3400000,
    likes: 41000,
    isLiked: false,
    publishDate: "2017-10-22",
    thumbnail: "https://i.ytimg.com/vi/cY_eREIsE7s/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/cY_eREIsE7s",
    difficulty: "Dễ",
    isBookmarked: true,
    tags: ["yoga", "người mới bắt đầu", "dẻo dai", "cơ bản", "yoga by sophie"],
  },
  {
    id: "3",
    title:
      "30-Minute Full Body Stretching Routine for Flexibility & Pain Relief",
    description:
      "Bài giãn cơ toàn thân trong 30 phút giúp cải thiện sự linh hoạt, giảm đau mỏi cơ bắp và thư giãn sâu sau những giờ làm việc căng thẳng.",
    instructor: {
      name: "Adriene Mishler",
      avatar: "/user-avatar.jpg",
      credentials: "Yoga With Adriene",
    },
    category: "Phục hồi",
    duration: "15:00",
    views: 25000000,
    likes: 368000,
    isLiked: false,
    publishDate: "2018-05-27",
    thumbnail: "https://i.ytimg.com/vi/L_xrDAtykMI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L_xrDAtykMI",
    difficulty: "Dễ",
    isBookmarked: true,
    tags: ["giãn cơ", "linh hoạt", "giảm đau", "thư giãn", "yoga with adriene"],
  },
  {
    id: "4",
    title: "GIÃN CƠ giúp phục hồi sau buổi tập (Không dụng cụ)",
    description:
      "15 động tác giãn cơ tĩnh giúp thư giãn, thả lỏng cơ bắp toàn thân sau khi tập luyện, hỗ trợ phục hồi và giảm đau mỏi.",
    instructor: {
      name: "SHINPHAMM",
      avatar: "/user-avatar.jpg",
      credentials: "Fitness & Lifestyle Vlogger",
    },
    category: "Phục hồi",
    duration: "13:45",
    views: 1200000,
    likes: 25000,
    isLiked: false,
    publishDate: "2020-07-25",
    thumbnail: "https://i.ytimg.com/vi/-pqYjmSvjMY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/-pqYjmSvjMY",
    difficulty: "Dễ",
    isBookmarked: true,
    tags: ["giãn cơ", "phục hồi", "sau khi tập", "thư giãn", "shinphamm"],
  },
  {
    id: "5",
    title: "20 MIN FULL BODY WORKOUT - Beginner Version",
    description:
      "Bài tập toàn thân 20 phút dành cho người mới bắt đầu từ Pamela Reif. Không cần dụng cụ, có các lựa chọn dễ hơn cho từng động tác.",
    instructor: {
      name: "Pamela Reif",
      avatar: "/user-avatar.jpg",
      credentials: "International Fitness Influencer",
    },
    category: "Cardio",
    duration: "21:55",
    views: 63000000,
    likes: 847000,
    isLiked: false,
    publishDate: "2020-04-26",
    thumbnail: "https://i.ytimg.com/vi/UItWltVZZmE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/UItWltVZZmE",
    difficulty: "Dễ",
    isBookmarked: false,
    tags: [
      "toàn thân",
      "người mới bắt đầu",
      "không dụng cụ",
      "giảm cân",
      "pamela reif",
    ],
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
      videoList.map((video) => {
        // Chỉ thay đổi video có id trùng khớp
        if (video.id === videoId) {
          // Nếu chưa like thì +1, nếu đã like thì -1
          const newLikes = video.isLiked ? video.likes - 1 : video.likes + 1;
          // Trả về một object mới với trạng thái được cập nhật
          return {
            ...video,
            likes: newLikes,
            isLiked: !video.isLiked, // Đảo ngược trạng thái isLiked
          };
        }
        // Trả về video gốc nếu không trùng id
        return video;
      })
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
            className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
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
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsVideoModalOpen(true);
                    }}
                  >
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
                    <p className="font-semibold">
                      {selectedVideo.instructor.name}
                    </p>
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
