import { API_BASE_URL } from "./config";
import { ApiClient } from "./api-client";

export type CommunityPostType = "general" | "workout" | "progress" | "achievement";

export interface CommunityAuthor {
  userId: string;
  displayName: string;
  avatarUrl?: string | null;
  level: string;
}

export interface CommunityPost {
  id: number;
  content: string;
  imageUrl?: string | null;
  postType: CommunityPostType;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLikedByCurrentUser: boolean;
  author: CommunityAuthor;
}

export interface CommunityFeedResponse {
  items: CommunityPost[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
}

export interface CommunityComment {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
  author: CommunityAuthor;
}

export type LeaderboardTrend = "up" | "down" | "same";
export type LeaderboardPeriod = "weekly" | "monthly";

export interface CommunityLeaderboardEntry {
  rank: number;
  points: number;
  totalWorkouts: number;
  streakDays: number;
  trend: LeaderboardTrend;
  user: CommunityAuthor;
}

export interface CommunityLeaderboard {
  period: LeaderboardPeriod;
  entries: CommunityLeaderboardEntry[];
  currentUser?: CommunityLeaderboardEntry | null;
}

export type ChallengeType = "individual" | "group";
export type ChallengeCategory = "workout" | "nutrition" | "consistency";
export type ChallengeStatus = "upcoming" | "active" | "completed";

export interface ChallengeTopParticipant {
  progressValue: number;
  user: CommunityAuthor;
}

export interface CommunityChallenge {
  id: number;
  title: string;
  description: string;
  type: ChallengeType;
  category: ChallengeCategory;
  status: ChallengeStatus;
  duration: string;
  participants: number;
  maxParticipants?: number | null;
  progress: number;
  target: number;
  unit: string;
  reward: string;
  endDate: string;
  isJoined: boolean;
  topParticipants: ChallengeTopParticipant[];
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export async function getCommunityFeed(page = 1, pageSize = 10): Promise<CommunityFeedResponse> {
  const response = await ApiClient.get(
    buildUrl(`/api/Community/feed?page=${page}&pageSize=${pageSize}`)
  );

  if (!response.ok) {
    throw new Error("Không thể tải bảng tin cộng đồng.");
  }

  const payload: ApiResponse<CommunityFeedResponse> = await response.json();
  return payload.data;
}

export async function createCommunityPost(input: {
  content: string;
  postType: CommunityPostType;
  imageFile?: File | null;
  imageUrl?: string;
}): Promise<CommunityPost> {
  const formData = new FormData();
  formData.append("Content", input.content);
  formData.append("PostType", input.postType);

  if (input.imageFile) {
    formData.append("ImageFile", input.imageFile);
  }

  if (input.imageUrl) {
    formData.append("ImageUrl", input.imageUrl);
  }

  const response = await ApiClient.fetch(buildUrl("/api/Community/posts"), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Đăng bài không thành công.");
  }

  const payload: ApiResponse<CommunityPost> = await response.json();
  return payload.data;
}

export async function togglePostLike(postId: number, like: boolean): Promise<void> {
  const url = buildUrl(`/api/Community/posts/${postId}/like`);
  const response = like ? await ApiClient.post(url) : await ApiClient.delete(url);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Không thể cập nhật lượt thích.");
  }
}

export async function getComments(postId: number): Promise<CommunityComment[]> {
  const response = await ApiClient.get(buildUrl(`/api/Community/posts/${postId}/comments`));

  if (!response.ok) {
    throw new Error("Không thể tải bình luận.");
  }

  const payload: ApiResponse<CommunityComment[]> = await response.json();
  return payload.data;
}

export async function addComment(postId: number, content: string): Promise<CommunityComment> {
  const response = await ApiClient.post(buildUrl(`/api/Community/posts/${postId}/comments`), {
    postId,
    content,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Không thể gửi bình luận.");
  }

  const payload: ApiResponse<CommunityComment> = await response.json();
  return payload.data;
}

export async function getLeaderboard(period: LeaderboardPeriod): Promise<CommunityLeaderboard> {
  const response = await ApiClient.get(buildUrl(`/api/Community/leaderboard?period=${period}`));

  if (!response.ok) {
    throw new Error("Không thể tải bảng xếp hạng.");
  }

  const payload: ApiResponse<CommunityLeaderboard> = await response.json();
  return payload.data;
}

export async function getChallenges(): Promise<CommunityChallenge[]> {
  const response = await ApiClient.get(buildUrl("/api/Community/challenges"));

  if (!response.ok) {
    throw new Error("Không thể tải danh sách thử thách.");
  }

  const payload: ApiResponse<CommunityChallenge[]> = await response.json();
  return payload.data;
}

export async function joinChallenge(challengeId: number): Promise<CommunityChallenge> {
  const response = await ApiClient.post(buildUrl(`/api/Community/challenges/${challengeId}/join`));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Không thể tham gia thử thách.");
  }

  const payload: ApiResponse<CommunityChallenge> = await response.json();
  return payload.data;
}

export async function leaveChallenge(challengeId: number): Promise<void> {
  const response = await ApiClient.delete(buildUrl(`/api/Community/challenges/${challengeId}/join`));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Không thể rời khỏi thử thách.");
  }
}
