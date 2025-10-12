# FlexUp - Fitness Tracking Web Application

**FlexUp** là ứng dụng theo dõi và quản lý luyện tập thể hình được xây dựng bằng Next.js 14 với TypeScript và Tailwind CSS.

## 🎯 Features

### 🔐 Authentication & User Management
- ✅ Đăng ký và đăng nhập người dùng
- ✅ JWT Authentication với Refresh Token tự động
- ✅ Thiết lập profile (mục tiêu, cân nặng, chiều cao, giới tính)
- ✅ Upload ảnh đại diện
- ✅ Quản lý thông tin cá nhân

### 💪 Workout Management
- ✅ Danh sách bài tập với 50+ workouts
- ✅ Chi tiết bài tập với hướng dẫn
- ✅ Lọc theo độ khó (Beginner, Intermediate, Advanced)
- ✅ Tìm kiếm bài tập
- ✅ **Bookmark/Yêu thích bài tập**
- ✅ **Tab Yêu thích** riêng biệt
- ✅ Theo dõi session luyện tập
- ✅ Cập nhật tiến độ từng bài tập

### 🍽️ Nutrition & Meal Planning
- ✅ **Custom gradient tabs** cho các bữa ăn:
  - 🌅 Bữa sáng (Yellow-Orange gradient)
  - ☀️ Bữa trưa (Green-Emerald gradient)
  - 🌙 Bữa tối (Blue-Indigo gradient)
  - 🍎 Bữa phụ (Pink-Red gradient)
- ✅ Gợi ý món ăn theo mục tiêu training (20+ meals)
- ✅ Hình ảnh thật từ Unsplash
- ✅ Thông tin chi tiết món ăn

### 📚 Knowledge Center
- ✅ **Video library có thể xem được**
- ✅ YouTube video player modal
- ✅ 5+ video hướng dẫn tập luyện
- ✅ Bài viết về fitness và dinh dưỡng
- ✅ Tips & reminders

### 📊 Progress Tracking
- ✅ Thống kê tuần/tháng
- ✅ Biểu đồ tiến độ
- ✅ Lịch sử workout sessions
- ✅ Calories burned tracking

### 👥 Community Features
- ✅ Social feed
- ✅ Leaderboard
- ✅ Challenges

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **API Integration**: Native Fetch with custom ApiClient
- **Image Hosting**: Unsplash, Cloudinary

## 📁 Project Structure

```
FlexUp-Web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Root redirect logic
│   ├── layout.tsx         # Root layout with AuthProvider
│   ├── landing/           # Landing page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── profile-setup/     # Profile completion
│   ├── dashboard/         # Main dashboard
│   ├── workouts/          # Workout list & detail
│   │   ├── page.tsx       # List with tabs (Đề xuất, Yêu thích)
│   │   ├── [id]/          # Workout detail
│   │   └── create/        # Create workout
│   ├── nutrition/         # Meal suggestions
│   ├── knowledge/         # Articles & videos
│   ├── progress/          # Progress tracking
│   ├── community/         # Social features
│   └── settings/          # Account settings
│
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── auth/             # Auth components
│   ├── workouts/         # Workout components (with bookmark)
│   ├── nutrition/        # Nutrition components (custom tabs)
│   ├── knowledge/        # Knowledge components (video player)
│   ├── dashboard/        # Dashboard widgets
│   ├── progress/         # Progress charts
│   ├── community/        # Community widgets
│   └── layout/           # Layout components
│
├── lib/                  # Utilities & config
│   ├── auth-context.tsx  # Authentication context
│   ├── api-client.ts     # API wrapper with auto-refresh
│   ├── config.ts         # Environment config
│   ├── utils.ts          # Utility functions
│   └── workout-utils.ts  # Workout helpers
│
├── data/                 # Static data
│   ├── meals.ts          # 20+ meals with Unsplash images
│   └── articles.ts       # Knowledge articles
│
└── public/               # Static assets
```

## ⚙️ Configuration

### Environment Variables

Tạo file `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5057
```

### API Endpoints Used

```
POST   /api/Authentication/register-user
POST   /api/Authentication/login-user
POST   /api/Authentication/refresh-token
GET    /api/User/get-profile
POST   /api/User/complete-profile
PUT    /api/User/update-profile
GET    /api/Workout
GET    /api/Workout/{id}/detail
GET    /api/FavoriteWorkout
POST   /api/FavoriteWorkout/{id}
DELETE /api/FavoriteWorkout/{id}
POST   /api/WorkoutSession/start
POST   /api/WorkoutSession/{sessionId}/exercises/{exerciseId}/progress
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm hoặc yarn
- Backend API đã chạy

### Installation

```bash
# Clone repository
git clone <repository-url>
cd FlexUp-Web

# Install dependencies
npm install

# Tạo .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5057" > .env.local

# Run development server
npm run dev
```

Mở browser: `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## 🔑 Key Features Implementation

### 1. Automatic Token Refresh

```typescript
// lib/api-client.ts
class ApiClient {
  static async fetch(url, options) {
    // Auto-refresh token on 401 errors
  }
}
```

### 2. Custom Gradient Tabs (Nutrition)

```typescript
// components/nutrition/meal-suggestions.tsx
const mealTypes = [
  { value: "breakfast", color: "from-yellow-200 to-orange-400" },
  // ... custom gradients cho mỗi tab
];
```

### 3. Video Player Modal

```typescript
// components/knowledge/video-library.tsx
<Dialog>
  <iframe src={selectedVideo?.videoUrl} />
</Dialog>
```

### 4. Bookmark/Favorites System

```typescript
// app/workouts/page.tsx
const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

// components/workouts/workout-card.tsx
<Button onClick={handleBookmarkClick}>
  <Bookmark fill={isBookmarked ? "currentColor" : "none"} />
</Button>
```

## 📦 Deployment

### Deploy to Vercel

1. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import vào Vercel**
   - Vào [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
   ```

4. **Deploy**
   - Framework: Next.js (auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `.next`

## 🐛 Troubleshooting

### API Connection Issues
- Kiểm tra `NEXT_PUBLIC_API_BASE_URL` trong `.env.local`
- Verify backend API đang chạy
- Check CORS settings trong backend

### Token Refresh Issues
- Clear localStorage: `localStorage.removeItem('flexup_auth')`
- Login lại

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 📄 License

MIT License

---

**Made with ❤️ and 💪 by FlexUp Team**
