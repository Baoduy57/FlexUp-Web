import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Play, Clock, Target, AlertCircle } from "lucide-react"

interface ExerciseDetailProps {
  name: string
  description: string
  instructions: string[]
  sets: string
  reps: string
  restTime: string
  targetMuscles: string[]
  difficulty: "Dễ" | "Trung bình" | "Khó"
  videoUrl?: string
  tips: string[]
}

export function ExerciseDetail({
  name,
  description,
  instructions,
  sets,
  reps,
  restTime,
  targetMuscles,
  difficulty,
  videoUrl,
  tips,
}: ExerciseDetailProps) {
  return (
    <div className="space-y-6">
      {/* Video Section */}
      {videoUrl && (
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              <img src="/fitness-exercise-demonstration.jpg" alt={name} className="w-full h-full object-cover" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercise Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
            <Badge
              variant={difficulty === "Dễ" ? "secondary" : difficulty === "Trung bình" ? "default" : "destructive"}
            >
              {difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exercise Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{sets}</div>
              <div className="text-xs text-muted-foreground">Sets</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{reps}</div>
              <div className="text-xs text-muted-foreground">Reps</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{restTime}</div>
              <div className="text-xs text-muted-foreground">Nghỉ</div>
            </div>
          </div>

          {/* Target Muscles */}
          <div>
            <h4 className="font-semibold mb-2">Nhóm cơ tập trung:</h4>
            <div className="flex flex-wrap gap-2">
              {targetMuscles.map((muscle, index) => (
                <Badge key={index} variant="outline">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Instructions */}
          <div>
            <h4 className="font-semibold mb-3">Hướng dẫn thực hiện:</h4>
            <ol className="space-y-2">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {tips.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Lưu ý quan trọng:
                </h4>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
