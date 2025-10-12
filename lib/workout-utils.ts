export const difficultyLabelMap: Record<string, string> = {
  Beginner: "Dễ",
  Intermediate: "Trung bình",
  Advanced: "Khó",
};

export const categoryLabelMap: Record<string, string> = {
  MuscleGain: "Tăng cơ",
  FatLoss: "Giảm mỡ",
  Maintain: "Duy trì thể trạng",
  Endurance: "Tăng sức bền",
};

export const mapDifficultyLabel = (difficulty: string) =>
  difficultyLabelMap[difficulty] ?? difficulty;

export const mapCategoryLabel = (category: string) =>
  categoryLabelMap[category] ?? category;

export const difficultySortOptions = [
  { value: "default", label: "Mặc định" },
  { value: "asc", label: "Dễ đến khó" },
  { value: "desc", label: "Khó đến dễ" },
];

export const trainingGoalToCategory = (goal?: string | null) => {
  if (!goal) return undefined;

  switch (goal.toLowerCase()) {
    case "muscle-gain":
      return "MuscleGain";
    case "fat-loss":
      return "FatLoss";
    case "maintain":
      return "Maintain";
    case "endurance":
      return "Endurance";
    default:
      return undefined;
  }
};

export const trainingGoalLabelMap: Record<string, string> = {
  "muscle-gain": "Tăng cơ",
  "fat-loss": "Giảm mỡ",
  maintain: "Duy trì thể trạng",
  endurance: "Tăng sức bền",
};
