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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Target,
  Zap,
  Camera,
  Send,
} from "lucide-react";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  content: string;
  image?: string;
  type: "workout" | "progress" | "achievement" | "general";
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  achievement?: {
    title: string;
    icon: string;
  };
}

const posts: Post[] = [
  {
    id: "1",
    user: {
      name: "Minh Anh",
      avatar: "/user-avatar.jpg",
      level: "Trung cấp",
    },
    content:
      "Vừa hoàn thành buổi tập HIIT 45 phút! Cảm giác thật tuyệt vời khi vượt qua giới hạn bản thân 💪",
    image: "/fitness-exercise-demonstration.jpg",
    type: "workout",
    timestamp: "2 giờ trước",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Hoàng Nam",
      avatar: "/user-avatar.jpg",
      level: "Cao cấp",
    },
    content:
      "Đã đạt được mục tiêu giảm 5kg sau 2 tháng tập luyện! Cảm ơn cộng đồng đã động viên mình.",
    type: "achievement",
    timestamp: "4 giờ trước",
    likes: 56,
    comments: 15,
    isLiked: true,
    achievement: {
      title: "Đạt mục tiêu cân nặng",
      icon: "🎯",
    },
  },
  {
    id: "3",
    user: {
      name: "Thu Hà",
      avatar: "/user-avatar.jpg",
      level: "Mới bắt đầu",
    },
    content:
      "Ngày đầu tiên tập gym, hơi lo lắng nhưng rất hào hứng! Có ai có thể chia sẻ kinh nghiệm cho người mới không?",
    type: "general",
    timestamp: "6 giờ trước",
    likes: 18,
    comments: 12,
    isLiked: false,
  },
  {
    id: "4",
    user: {
      name: "Đức Anh",
      avatar: "/user-avatar.jpg",
      level: "Trung cấp",
    },
    content:
      "Bench press 80kg x 5 reps - personal record mới! Tháng trước chỉ được 70kg thôi.",
    image: "/chest-and-shoulder-workout.jpg",
    type: "progress",
    timestamp: "1 ngày trước",
    likes: 32,
    comments: 6,
    isLiked: true,
  },
];

export function SocialFeed() {
  const [newPost, setNewPost] = useState("");
  const [feedPosts, setFeedPosts] = useState(posts);

  const handleLike = (postId: string) => {
    setFeedPosts(
      feedPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: "Bạn",
          avatar: "/user-avatar.jpg",
          level: "Trung cấp",
        },
        content: newPost,
        type: "general",
        timestamp: "Vừa xong",
        likes: 0,
        comments: 0,
        isLiked: false,
      };
      setFeedPosts([post, ...feedPosts]);
      setNewPost("");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "workout":
        return <Zap className="h-4 w-4 text-green-500" />;
      case "progress":
        return <Target className="h-4 w-4 text-blue-500" />;
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "workout":
        return "Tập luyện";
      case "progress":
        return "Tiến độ";
      case "achievement":
        return "Thành tích";
      default:
        return "Chia sẻ";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Mới bắt đầu":
        return "bg-green-100 text-green-800";
      case "Trung cấp":
        return "bg-blue-100 text-blue-800";
      case "Cao cấp":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="backdrop-blur-md bg-white/70 shadow-xl border border-white/20 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✍️ Chia sẻ với cộng đồng
            </CardTitle>
            <CardDescription>
              Chia sẻ tiến độ, thành tích hoặc câu hỏi của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Bạn đang nghĩ gì về hành trình fitness của mình?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] rounded-xl"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Ảnh
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Thành tích
                </Button>
              </div>
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="rounded-full px-6"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Đăng
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feed */}
      <div className="space-y-4">
        {feedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition bg-white/70 backdrop-blur-md border border-white/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-white">
                      <AvatarImage
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                      />
                      <AvatarFallback>
                        {post.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.user.name}</h3>
                        <Badge
                          variant="secondary"
                          className={getLevelColor(post.user.level)}
                        >
                          {post.user.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(post.type)}
                    <span className="text-sm text-muted-foreground">
                      {getTypeLabel(post.type)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {post.achievement && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg"
                  >
                    <span className="text-2xl">{post.achievement.icon}</span>
                    <div>
                      <p className="font-semibold text-yellow-800">
                        🎉 Đạt thành tích mới!
                      </p>
                      <p className="text-sm text-yellow-700">
                        {post.achievement.title}
                      </p>
                    </div>
                  </motion.div>
                )}

                <p className="text-sm leading-relaxed">{post.content}</p>

                {post.image && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden shadow-md"
                  >
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center text-sm ${
                        post.isLiked ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 mr-1 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      {post.likes}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </motion.button>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Chia sẻ
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
