"use client";



const MAX_IMAGE_SIZE = 5 * 1024 * 1024;





import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { formatDistanceToNow } from "date-fns";

import { vi } from "date-fns/locale";

import Image from "next/image";

import {
  Camera,
  Heart,
  Loader2,
  MessageCircle,
  Send,
  Share2,
  Target,
  Trophy,
  Zap,
  X,
} from "lucide-react";


import {

  addComment,

  createCommunityPost,

  getComments,

  getCommunityFeed,

  togglePostLike,

  type CommunityComment,

  type CommunityPost,

  type CommunityPostType,

} from "@/lib/community-api";

import { useToast } from "@/hooks/use-toast";

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



const POST_TYPE_OPTIONS: Array<{ value: CommunityPostType; label: string }> = [

  { value: "general", label: "Chia sẻ" },

  { value: "workout", label: "Tập luyện" },

  { value: "progress", label: "Tiến độ" },

  { value: "achievement", label: "Thành tích" },

];



const MAX_POST_LENGTH = 2000;



function getTypeIcon(type: CommunityPostType) {

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

}



function getTypeLabel(type: CommunityPostType) {

  const option = POST_TYPE_OPTIONS.find((item) => item.value === type);

  return option?.label ?? "Chia sẻ";

}



function getLevelColor(level: string) {

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

}



export function SocialFeed() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posting, setPosting] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<CommunityPostType>("general");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [commentsCache, setCommentsCache] = useState<Record<number, CommunityComment[]>>({});
  const [commentsLoading, setCommentsLoading] = useState<Record<number, boolean>>({});
  const [commentSubmitting, setCommentSubmitting] = useState<Record<number, boolean>>({});

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Định dạng không hỗ trợ",
        description: "Vui lòng chọn tệp hình ảnh hợp lệ.",
        variant: "destructive",
      });
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast({
        title: "Ảnh quá lớn",
        description: "Giới hạn kích thước ảnh là 5MB.",
        variant: "destructive",
      });
      event.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const loadFeed = useCallback(

    async (reset = false) => {

      try {

        if (reset) {

          setLoading(true);

        } else {

          setLoadingMore(true);

        }



        const nextPage = reset ? 1 : page + 1;

        const data = await getCommunityFeed(nextPage);



        setPosts((prev) =>

          reset ? data.items : [...prev, ...data.items.filter((item) => !prev.some((p) => p.id === item.id))]

        );

        setHasMore(data.hasMore);

        setPage(data.page);

      } catch (error) {

        console.error(error);

        toast({

          title: "Không thể tải bảng tin",

          description: "Vui lòng thử lại sau ít phút.",

          variant: "destructive",

        });

      } finally {

        setLoading(false);

        setLoadingMore(false);

      }

    },

    [page, toast]

  );



  useEffect(() => {

    void loadFeed(true);

  }, [loadFeed]);



  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      return;
    }

    try {
      setPosting(true);

      const created = await createCommunityPost({
        content: newPost.trim(),
        postType,
        imageFile: selectedImage ?? undefined,
      });

      setPosts((prev) => [created, ...prev]);
      setNewPost("");
      setPostType("general");
      if (selectedImage || previewUrl) {
        handleRemoveImage();
      }
      toast({
        title: "Đã đăng bài",
        description: "Bài viết của bạn đã xuất hiện trên bảng tin.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Đăng bài thất bại",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setPosting(false);
    }
  };



  const handleToggleLike = async (post: CommunityPost) => {

    const willLike = !post.isLikedByCurrentUser;

    setPosts((prev) =>

      prev.map((item) =>

        item.id === post.id

          ? {

              ...item,

              isLikedByCurrentUser: willLike,

              likeCount: willLike ? item.likeCount + 1 : Math.max(0, item.likeCount - 1),

            }

          : item

      )

    );



    try {

      await togglePostLike(post.id, willLike);

    } catch (error) {

      console.error(error);

      // revert

      setPosts((prev) =>

        prev.map((item) =>

          item.id === post.id ? { ...item, isLikedByCurrentUser: !willLike, likeCount: post.likeCount } : item

        )

      );

      toast({

        title: "Không thể cập nhật lượt thích",

        description: "Vui lòng thử lại sau.",

        variant: "destructive",

      });

    }

  };



  const handleToggleComments = async (postId: number) => {

    const willExpand = expandedPostId !== postId ? postId : null;

    setExpandedPostId(willExpand);



    if (willExpand !== null && !commentsCache[willExpand]) {

      setCommentsLoading((prev) => ({ ...prev, [willExpand]: true }));

      try {

        const data = await getComments(willExpand);

        setCommentsCache((prev) => ({ ...prev, [willExpand]: data }));

      } catch (error) {

        console.error(error);

        toast({

          title: "Không thể tải bình luận",

          description: "Vui lòng thử lại sau.",

          variant: "destructive",

        });

        setExpandedPostId(null);

      } finally {

        setCommentsLoading((prev) => ({ ...prev, [willExpand]: false }));

      }

    }

  };



  const handleSubmitComment = async (postId: number) => {

    const content = commentDrafts[postId]?.trim();

    if (!content) return;



    setCommentSubmitting((prev) => ({ ...prev, [postId]: true }));

    try {

      const created = await addComment(postId, content);

      setCommentsCache((prev) => ({

        ...prev,

        [postId]: prev[postId] ? [...prev[postId], created] : [created],

      }));

      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));

      setPosts((prev) =>

        prev.map((item) =>

          item.id === postId ? { ...item, commentCount: item.commentCount + 1 } : item

        )

      );

    } catch (error) {

      console.error(error);

      toast({

        title: "Không thể gửi bình luận",

        description: (error as Error).message,

        variant: "destructive",

      });

    } finally {

      setCommentSubmitting((prev) => ({ ...prev, [postId]: false }));

    }

  };



  const relativeTime = useMemo(

    () => (isoDate: string) =>

      formatDistanceToNow(new Date(isoDate), {

        addSuffix: true,

        locale: vi,

      }),

    []

  );



  return (

    <div className="space-y-6">

      <motion.div

        initial={{ opacity: 0, y: 30 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.4 }}

      >

        <Card className="backdrop-blur-md bg-white/70 shadow-xl border border-white/20 rounded-2xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">✍️ Chia sẻ với cộng đồng</CardTitle>

            <CardDescription>

              Cập nhật tiến độ, thành tích hoặc câu hỏi của bạn để nhận được sự ủng hộ từ cộng đồng.

            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-4">

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <Textarea
              placeholder="Bạn đang nghĩ gì về hành trình fitness của mình?"
              value={newPost}
              maxLength={MAX_POST_LENGTH}
              onChange={(event) => setNewPost(event.target.value)}
              className="min-h-[100px] rounded-xl"
            />

            {previewUrl ? (
              <div className="relative overflow-hidden rounded-xl border border-white/20">
                <Image
                  src={previewUrl}
                  alt="Ảnh xem trước"
                  width={1024}
                  height={256}
                  className="h-52 w-full object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                {selectedImage ? (
                  <p className="px-4 py-2 text-xs text-muted-foreground">
                    {selectedImage.name} • {(selectedImage.size / 1024).toFixed(0)} KB
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={handleSelectImage}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Ảnh
                </Button>
                {POST_TYPE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={postType === option.value ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setPostType(option.value)}
                  >
                    <span className="mr-2">{getTypeIcon(option.value)}</span>
                    {option.label}
                  </Button>
                ))}
              </div>

              <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                <Button
                  type="button"
                  onClick={handleCreatePost}
                  disabled={posting || !newPost.trim()}
                  className="rounded-full px-6"
                >
                  {posting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang đăng
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Đăng
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>

        </Card>

      </motion.div>



      <div className="space-y-4">

        {loading ? (

          <div className="flex justify-center py-12">

            <Loader2 className="h-6 w-6 animate-spin text-primary" />

          </div>

        ) : posts.length === 0 ? (

          <Card className="border-dashed border-2 border-white/30 bg-white/40">

            <CardContent className="py-10 text-center space-y-2">

              <CardTitle className="text-lg">Hiện chưa có bài viết nào</CardTitle>

              <CardDescription>

                Hãy là người đầu tiên chia sẻ trải nghiệm luyện tập của bạn với cộng đồng FlexUp.

              </CardDescription>

            </CardContent>

          </Card>

        ) : (

          posts.map((post, index) => (

            <motion.div

              key={post.id}

              initial={{ opacity: 0, y: 40 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.05, duration: 0.3 }}

            >

              <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition bg-white/70 backdrop-blur-md border border-white/20">

                <CardHeader>

                  <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      <Avatar className="border-2 border-white">

                        <AvatarImage src={post.author.avatarUrl ?? "/user-avatar.jpg"} alt={post.author.displayName} />

                        <AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>

                      </Avatar>

                      <div>

                        <div className="flex items-center gap-2 flex-wrap">

                          <h3 className="font-semibold">{post.author.displayName}</h3>

                          <Badge variant="secondary" className={getLevelColor(post.author.level)}>

                            {post.author.level}

                          </Badge>

                        </div>

                        <p className="text-sm text-muted-foreground">{relativeTime(post.createdAt)}</p>

                      </div>

                    </div>

                    <div className="flex items-center gap-1">

                      {getTypeIcon(post.postType)}

                      <span className="text-sm text-muted-foreground">{getTypeLabel(post.postType)}</span>

                    </div>

                  </div>

                </CardHeader>



                <CardContent className="space-y-4">

                  <p className="text-sm leading-relaxed">{post.content}</p>



                  {post.imageUrl ? (

                    <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden shadow-md">

                      <Image

                        src={post.imageUrl}

                        alt="Post image"

                        width={1024}

                        height={256}

                        className="w-full h-64 object-cover"

                      />

                    </motion.div>

                  ) : null}



                  <div className="flex items-center justify-between pt-4 border-t">

                    <div className="flex items-center gap-4">

                      <motion.button

                        whileTap={{ scale: 0.9 }}

                        onClick={() => handleToggleLike(post)}

                        className={`flex items-center text-sm transition ${

                          post.isLikedByCurrentUser ? "text-red-500" : "text-gray-600 hover:text-primary"

                        }`}

                      >

                        <Heart

                          className={`h-4 w-4 mr-1 ${post.isLikedByCurrentUser ? "fill-current" : ""}`}

                        />

                        {post.likeCount}

                      </motion.button>



                      <button

                        className="flex items-center text-sm text-gray-600 transition hover:text-primary"

                        onClick={() => void handleToggleComments(post.id)}

                      >

                        <MessageCircle className="h-4 w-4 mr-1" />

                        {post.commentCount}

                      </button>

                    </div>



                    <button

                      className="flex items-center text-sm text-gray-600 transition hover:text-primary"

                      onClick={() =>

                        toast({

                          title: "Chia sẻ bài viết",

                          description: "Tính năng chia sẻ đang được phát triển.",

                        })

                      }

                    >

                      <Share2 className="h-4 w-4 mr-1" />

                      Chia sẻ

                    </button>

                  </div>

              </CardContent>

                {expandedPostId === post.id ? (

                  <motion.div

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    className="border-t border-white/10 bg-white/40 backdrop-blur-sm"

                  >

                    <div className="space-y-4 p-4">

                      {commentsLoading[post.id] ? (

                        <div className="flex justify-center py-6">

                          <Loader2 className="h-5 w-5 animate-spin text-primary" />

                        </div>

                      ) : commentsCache[post.id]?.length ? (

                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">

                          {commentsCache[post.id].map((comment) => (

                            <div key={comment.id} className="flex gap-3 text-sm">

                              <Avatar className="h-8 w-8 border border-white/60">

                                <AvatarImage

                                  src={comment.author.avatarUrl ?? "/user-avatar.jpg"}

                                  alt={comment.author.displayName}

                                />

                                <AvatarFallback>{comment.author.displayName.charAt(0)}</AvatarFallback>

                              </Avatar>

                              <div className="flex-1 space-y-1">

                                <div className="flex items-center justify-between text-xs text-muted-foreground">

                                  <span className="font-medium text-foreground">{comment.author.displayName}</span>

                                  <span>{relativeTime(comment.createdAt)}</span>

                                </div>

                                <p className="text-foreground/90 leading-relaxed">{comment.content}</p>

                              </div>

                            </div>

                          ))}

                        </div>

                      ) : (

                        <p className="text-sm text-muted-foreground">Hãy là người đầu tiên để lại bình luận.</p>

                      )}



                      <div className="space-y-3">

                        <Textarea

                          placeholder="Viết bình luận của bạn..."

                          value={commentDrafts[post.id] ?? ""}

                          onChange={(event) =>

                            setCommentDrafts((prev) => ({ ...prev, [post.id]: event.target.value }))

                          }

                          rows={3}

                        />

                        <div className="flex justify-end">

                          <Button

                            size="sm"

                            onClick={() => void handleSubmitComment(post.id)}

                            disabled={

                              !!commentSubmitting[post.id] ||

                              !(commentDrafts[post.id]?.trim().length ?? 0)

                            }

                          >

                            {commentSubmitting[post.id] ? (

                              <>

                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                Đang gửi

                              </>

                            ) : (

                              "Gửi bình luận"

                            )}

                          </Button>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                ) : null}

            </Card>

          </motion.div>

        ))

        )}



        {!loading && hasMore ? (

          <div className="flex justify-center">

            <Button

              variant="outline"

              onClick={() => void loadFeed(false)}

              disabled={loadingMore}

              className="rounded-full px-6"

            >

              {loadingMore ? (

                <>

                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />

                  Đang tải...

                </>

              ) : (

                "Xem thêm"

              )}

            </Button>

          </div>

        ) : null}

      </div>

    </div>

  );

}









