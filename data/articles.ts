// data/articles.ts

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    expertise: string;
  };
  category: string;
  readTime: number;
  publishDate: string;
  likes: number;
  isBookmarked: boolean;
  tags: string[];
  image: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "10 Bài Tập Cardio Hiệu Quả Tại Nhà",
    excerpt:
      "Khám phá những bài tập cardio đơn giản nhưng hiệu quả mà bạn có thể thực hiện ngay tại nhà mà không cần thiết bị.",
    content: `
Giới thiệu:
Cardio là phương pháp tập luyện giúp cải thiện sức khỏe tim mạch, đốt cháy calo và tăng sức bền. Bạn không cần thiết bị phức tạp, chỉ cần không gian nhỏ tại nhà.

10 bài tập hiệu quả:
1. Jumping Jacks – 3 phút.
2. High Knees – 2 phút.
3. Mountain Climbers – 3 phút.
4. Burpees – 2 phút.
5. Squat Jumps – 3 phút.
6. Skater Jumps – 2 phút.
7. Butt Kicks – 2 phút.
8. Plank Jacks – 3 phút.
9. Lunges – 3 phút.
10. Side-to-Side Hops – 2 phút.

Tips:
- Khởi động kỹ trước khi tập.
- Uống nước đầy đủ.
- Điều chỉnh cường độ theo khả năng.

Lợi ích:
- Tăng sức bền và nhịp tim.
- Giảm mỡ toàn thân.
- Cải thiện tâm trạng và năng lượng.

Kết luận:
Tập cardio tại nhà vừa tiện lợi vừa hiệu quả. Hãy duy trì ít nhất 20-30 phút mỗi ngày để đạt được kết quả tốt nhất.
    `,
    author: {
      name: "Huấn luyện viên Minh",
      avatar: "/user-avatar.jpg",
      expertise: "Chuyên gia Cardio",
    },
    category: "Tập luyện",
    readTime: 5,
    publishDate: "2024-01-15",
    likes: 234,
    isBookmarked: false,
    tags: ["cardio", "tại nhà", "giảm cân"],
    image: "/cardio-fat-burning-workout.jpg",
  },
  {
    id: "2",
    title: "Chế Độ Ăn Tăng Cơ Cho Người Mới Bắt Đầu",
    excerpt:
      "Hướng dẫn chi tiết về cách xây dựng chế độ ăn uống phù hợp để tăng khối lượng cơ bắp một cách hiệu quả.",
    content: `
Giới thiệu:
Chế độ ăn tăng cơ giúp bạn xây dựng cơ bắp nhanh chóng và an toàn. Kết hợp đúng thực phẩm với tập luyện là chìa khóa.

Các nguyên tắc cơ bản:
- Protein: Thịt, trứng, sữa, đậu… giúp phục hồi và phát triển cơ.
- Carbs: Gạo, khoai, yến mạch… cung cấp năng lượng tập luyện.
- Fat: Dầu oliu, bơ, hạt… hỗ trợ hormone và sức khỏe tim mạch.

Mẫu thực đơn:
- Bữa sáng: Trứng + yến mạch + trái cây.
- Bữa trưa: Ức gà + cơm + rau xanh.
- Bữa tối: Cá hồi + khoai lang + salad.
- Snack: Sữa chua, hạt, whey protein.

Tips:
- Ăn đủ 5-6 bữa nhỏ/ngày.
- Uống nước nhiều.
- Theo dõi lượng calo để tăng cân hợp lý.

Kết luận:
Tuân thủ chế độ ăn uống khoa học kết hợp tập luyện sẽ giúp người mới bắt đầu tăng cơ hiệu quả và bền vững.
    `,
    author: {
      name: "Chuyên gia Lan",
      avatar: "/user-avatar.jpg",
      expertise: "Dinh dưỡng thể thao",
    },
    category: "Dinh dưỡng",
    readTime: 8,
    publishDate: "2024-01-12",
    likes: 189,
    isBookmarked: true,
    tags: ["dinh dưỡng", "tăng cơ", "protein"],
    image: "/nutrition/grilled-chicken-salad.jpg",
  },
  {
    id: "3",
    title: "Tầm Quan Trọng Của Giấc Ngủ Trong Fitness",
    excerpt:
      "Tại sao giấc ngủ chất lượng lại quan trọng đối với quá trình phục hồi cơ bắp và hiệu suất tập luyện.",
    content: `
Giới thiệu:
Giấc ngủ là yếu tố quan trọng trong việc phục hồi cơ bắp và tối ưu hiệu suất tập luyện. Ngủ đủ giúp cơ thể sản sinh hormone tăng trưởng và giảm mệt mỏi.

Ảnh hưởng của giấc ngủ:
- Thiếu ngủ làm giảm sức mạnh và độ bền.
- Gây khó tập trung và giảm hiệu quả luyện tập.
- Tăng nguy cơ chấn thương.

Tips cải thiện giấc ngủ:
- Ngủ đủ 7-9 tiếng mỗi ngày.
- Tắt thiết bị điện tử trước khi ngủ 1 giờ.
- Giữ phòng ngủ tối, mát và yên tĩnh.

Lợi ích:
- Tăng phục hồi cơ bắp.
- Cải thiện tâm trạng.
- Tăng cường hệ miễn dịch.

Kết luận:
Giấc ngủ là “siêu thực phẩm” của cơ thể. Kết hợp ngủ đủ giấc với tập luyện và dinh dưỡng hợp lý để đạt kết quả tốt nhất.
    `,
    author: {
      name: "Tiến sĩ Hùng",
      avatar: "/user-avatar.jpg",
      expertise: "Y học thể thao",
    },
    category: "Sức khỏe",
    readTime: 6,
    publishDate: "2024-01-10",
    likes: 156,
    isBookmarked: false,
    tags: ["giấc ngủ", "phục hồi", "sức khỏe"],
    image: "/fitness-exercise-demonstration.jpg",
  },
];
