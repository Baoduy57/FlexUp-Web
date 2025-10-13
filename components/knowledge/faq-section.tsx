"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Users,
  Dumbbell,
  Apple,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "Tôi mới bắt đầu tập gym, nên bắt đầu từ đâu?",
    answer:
      "Khi mới bắt đầu, hãy tập trung vào việc học kỹ thuật cơ bản trước. Bắt đầu với các bài tập compound như squat, deadlift, bench press với trọng lượng nhẹ. Tập 3-4 buổi/tuần, mỗi buổi 45-60 phút. Quan trọng nhất là duy trì tính nhất quán và lắng nghe cơ thể mình.",
    category: "Tập luyện",
    tags: ["người mới", "bắt đầu", "kỹ thuật"],
    helpful: 156,
  },
  {
    id: "2",
    question: "Tôi có nên tập cardio trước hay sau khi tập tạ?",
    answer:
      "Điều này phụ thuộc vào mục tiêu của bạn. Nếu mục tiêu chính là tăng cơ, hãy tập tạ trước khi cardio để có năng lượng tối đa cho việc nâng tạ. Nếu mục tiêu là giảm cân, bạn có thể làm cardio nhẹ 5-10 phút để khởi động, sau đó tập tạ, và kết thúc bằng cardio 15-20 phút.",
    category: "Tập luyện",
    tags: ["cardio", "tập tạ", "thứ tự"],
    helpful: 89,
  },
  {
    id: "3",
    question: "Tôi nên ăn gì trước và sau khi tập?",
    answer:
      "Trước khi tập (1-2 tiếng): Ăn carb phức hợp + protein ít béo (cơm + thịt gà, yến mạch + sữa). Sau khi tập (30 phút): Protein + carb đơn giản để phục hồi (whey protein + chuối, sữa chocolate). Quan trọng là uống đủ nước trước, trong và sau khi tập.",
    category: "Dinh dưỡng",
    tags: ["ăn uống", "trước tập", "sau tập"],
    helpful: 234,
  },
  {
    id: "4",
    question: "Bao lâu tôi mới thấy kết quả từ việc tập gym?",
    answer:
      "Kết quả đầu tiên (cảm giác khỏe mạnh hơn, ngủ ngon hơn): 1-2 tuần. Thay đổi về sức mạnh: 2-4 tuần. Thay đổi về hình thể: 6-8 tuần. Thay đổi rõ rệt: 3-6 tháng. Hãy kiên nhẫn và nhất quán, kết quả sẽ đến!",
    category: "Tổng quát",
    tags: ["kết quả", "thời gian", "kiên nhẫn"],
    helpful: 178,
  },
  {
    id: "5",
    question: "Tôi có cần uống whey protein không?",
    answer:
      "Whey protein là bổ sung, không bắt buộc. Nếu bạn ăn đủ protein từ thức ăn tự nhiên (1.6-2.2g/kg cân nặng), không cần whey. Whey hữu ích khi: khó ăn đủ protein, cần tiện lợi sau tập, hoặc đang giảm cân cần hạn chế calories.",
    category: "Dinh dưỡng",
    tags: ["whey protein", "bổ sung", "protein"],
    helpful: 145,
  },
  {
    id: "6",
    question: "Tại sao tôi không giảm cân dù đã tập chăm chỉ?",
    answer:
      "Nguyên nhân phổ biến: 1) Ăn quá nhiều calories so với đốt cháy, 2) Không theo dõi khẩu phần ăn chính xác, 3) Cơ thể giữ nước do tập luyện, 4) Tăng cơ đồng thời giảm mỡ. Hãy tập trung vào deficit calories và đo lường tiến độ bằng nhiều cách (cân, số đo, ảnh).",
    category: "Giảm cân",
    tags: ["giảm cân", "calories", "tiến độ"],
    helpful: 267,
  },
  {
    id: "7",
    question: "Tôi có nên tập mỗi ngày không?",
    answer:
      "Không nên tập cùng một nhóm cơ mỗi ngày. Cơ cần 48-72 tiếng để phục hồi và phát triển. Lịch tập lý tưởng: 3-5 buổi/tuần với ít nhất 1 ngày nghỉ giữa các buổi tập cùng nhóm cơ. Bạn có thể tập nhẹ (đi bộ, yoga) vào ngày nghỉ.",
    category: "Tập luyện",
    tags: ["tần suất", "nghỉ ngơi", "phục hồi"],
    helpful: 123,
  },
  {
    id: "8",
    question: "Làm sao để tăng cân lành mạnh?",
    answer:
      "Tăng cân lành mạnh cần surplus calories (ăn nhiều hơn đốt cháy) khoảng 300-500 calories/ngày. Tập trung vào thực phẩm giàu dinh dưỡng: thịt, cá, trứng, các loại hạt, bơ, dầu olive. Kết hợp tập tạ để tăng cơ thay vì chỉ tăng mỡ. Ăn 5-6 bữa nhỏ trong ngày.",
    category: "Tăng cân",
    tags: ["tăng cân", "surplus", "dinh dưỡng"],
    helpful: 98,
  },
];

const categories = [
  "Tất cả",
  "Tập luyện",
  "Dinh dưỡng",
  "Giảm cân",
  "Tăng cân",
  "Tổng quát",
];

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Tất cả" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tập luyện":
        return <Dumbbell className="h-4 w-4" />;
      case "Dinh dưỡng":
        return <Apple className="h-4 w-4" />;
      case "Giảm cân":
      case "Tăng cân":
        return <Heart className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tập luyện":
        return " text-white";
      case "Dinh dưỡng":
        return " text-white";
      case "Giảm cân":
        return " text-white";
      case "Tăng cân":
        return " text-white";
      default:
        return " text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Collapsible
                  open={openItems.includes(faq.id)}
                  onOpenChange={() => toggleItem(faq.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors px-4 py-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(faq.category)}>
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(faq.category)}
                                {faq.category}
                              </div>
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {faq.helpful} người thấy hữu ích
                            </span>
                          </div>
                          <CardTitle className="text-left text-lg leading-relaxed">
                            {faq.question}
                          </CardTitle>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            openItems.includes(faq.id) ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 px-4 pb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {faq.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFAQs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Không tìm thấy câu hỏi
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
