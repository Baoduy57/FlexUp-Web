import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Droplets, Moon, Bell } from "lucide-react";

export function TipsAndReminders() {
  const tips = [
    {
      icon: Lightbulb,
      title: "Mẹo hôm nay",
      content:
        "Uống một ly nước trước mỗi bữa ăn để tăng cảm giác no và hỗ trợ tiêu hóa.",
      type: "tip",
    },
    {
      icon: Droplets,
      title: "Nhắc nhở uống nước",
      content:
        "Đã 2 giờ kể từ lần uống nước cuối. Hãy uống thêm một ly nước nhé!",
      type: "reminder",
    },
    {
      icon: Moon,
      title: "Thời gian nghỉ ngơi",
      content:
        "Cơ thể cần 7-9 giờ ngủ để phục hồi sau tập luyện. Hãy đi ngủ sớm hôm nay.",
      type: "tip",
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Bell className="h-5 w-5 text-primary" />
          Mẹo & Nhắc nhở
        </CardTitle>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Xem tất cả
        </Button>
      </CardHeader>
      <CardContent className="divide-y">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`flex gap-4 py-4 items-start transition-transform hover:scale-[1.02] hover:shadow-sm rounded-lg px-2 ${
              tip.type === "reminder"
                ? "bg-red-50 dark:bg-red-950/40"
                : "bg-muted/30"
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm 
                ${
                  tip.type === "reminder"
                    ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                    : "bg-gradient-to-r from-emerald-400 to-green-600 text-white"
                }`}
              >
                <tip.icon className="h-5 w-5" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">{tip.title}</h4>
                <Badge
                  variant={
                    tip.type === "reminder" ? "destructive" : "secondary"
                  }
                  className="rounded-full px-2 py-0 text-[10px]"
                >
                  {tip.type === "reminder" ? "Nhắc nhở" : "Mẹo"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{tip.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
