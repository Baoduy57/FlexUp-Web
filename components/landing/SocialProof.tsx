"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// 1. Tạo cấu trúc dữ liệu cho các tính năng
const wellnessPillars = [
  {
    imageSrc: "https://blog.nasm.org/hubfs/fitness-trends.jpg",
    title: "FITNESS",
    description:
      "Hoạt động nhiều hơn và đạt được mục tiêu của bạn với các chương trình thể dục tùy chỉnh.",
  },
  {
    imageSrc:
      "https://premierfitnessstudio.com/wp-content/uploads/2024/11/PFS-yoga-meditation.jpg",
    title: "MINDFULNESS",
    description: "Giảm căng thẳng và chánh niệm hơn với các lớp thiền và yoga.",
  },
  {
    imageSrc:
      "https://foodnwellness.com/wp-content/uploads/2023/09/clinical-nutrition-and-dietetics-1024x767.jpg",
    title: "NUTRITION",
    description:
      "Ăn uống lành mạnh hơn với các kế hoạch bữa ăn được cá nhân hóa và hơn 500 công thức nấu ăn độc quyền.",
  },
  {
    imageSrc:
      "https://www.wellnessliving.com/blog/wp-content/uploads/2019/01/Get-Fitness-Clients-Motivated.jpg",
    title: "MOTIVATION",
    description:
      "Làm cho việc tập luyện trở nên thú vị và bổ ích hơn với những thử thách và sự hỗ trợ của bạn bè.",
  },
];

export default function SocialProof() {
  return (
    <section className="py-15 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* 2. Tiêu đề chính của section */}
        <motion.h2
          className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nâng cao sức khỏe của bạn lên một tầm cao mới
        </motion.h2>

        {/* 3. Lưới hiển thị các tính năng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {wellnessPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* 4. Hình ảnh với bo góc hình oval */}
              <div className="relative w-full max-w-[250px] aspect-[4/3] rounded-[45%] overflow-hidden mb-6 shadow-lg transition-transform duration-300 hover:scale-105">
                <Image
                  src={pillar.imageSrc}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* 5. Tiêu đề và mô tả */}
              <h3 className="text-lg font-bold uppercase tracking-wider text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
    </section>
  );
}
