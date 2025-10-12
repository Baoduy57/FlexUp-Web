// Meal plans based on training goals
// Training Goals: muscle-gain, fat-loss, maintain, endurance

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  rating: number;
  ingredients: string[];
  instructions: string[];
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface MealPlan {
  goal: "muscle-gain" | "fat-loss" | "maintain" | "endurance";
  goalName: string;
  description: string;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  waterIntake: number; // liters
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snack: Meal[];
  };
}

export const mealPlans: MealPlan[] = [
  // MUSCLE GAIN - Tăng cơ
  {
    goal: "muscle-gain",
    goalName: "Tăng cơ",
    description: "Chế độ ăn tăng cơ với protein cao, carbs và calories dồi dào",
    dailyCalories: 2800,
    dailyProtein: 180,
    dailyCarbs: 350,
    dailyFat: 80,
    waterIntake: 3.5,
    meals: {
      breakfast: [
        {
          id: "mg-b1",
          name: "Yến mạch chuối whey protein",
          description: "Bữa sáng năng lượng với protein cao, carbs phức hợp từ yến mạch",
          image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500",
          calories: 520,
          protein: 35,
          carbs: 65,
          fat: 12,
          prepTime: "10 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.8,
          ingredients: [
            "80g yến mạch",
            "1 scoop whey protein (30g)",
            "1 quả chuối",
            "1 thìa mật ong",
            "200ml sữa tươi không đường",
            "10g hạnh nhân băm"
          ],
          instructions: [
            "Nấu yến mạch với sữa tươi trong 3-5 phút",
            "Trộn whey protein vào khi yến mạch còn ấm",
            "Thái chuối lát mỏng phủ lên trên",
            "Rưới mật ong và rắc hạnh nhân",
            "Thưởng thức ngay khi còn ấm"
          ],
          mealType: "breakfast"
        },
        {
          id: "mg-b2",
          name: "Bánh mì trứng gà bơ alpaca",
          description: "Protein từ trứng kết hợp chất béo lành mạnh từ bơ",
          image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500",
          calories: 480,
          protein: 28,
          carbs: 45,
          fat: 20,
          prepTime: "8 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.6,
          ingredients: [
            "2 lát bánh mì nguyên cám",
            "3 quả trứng gà",
            "1/2 quả bơ",
            "1 thìa dầu oliu",
            "Muối, tiêu",
            "Rau mầm (optional)"
          ],
          instructions: [
            "Nướng bánh mì đến khi vàng giòn",
            "Chiên trứng ốp la hoặc trứng bác với ít dầu oliu",
            "Nghiền bơ và phết lên bánh mì",
            "Đặt trứng lên trên",
            "Nêm muối tiêu, thêm rau mầm nếu muốn"
          ],
          mealType: "breakfast"
        }
      ],
      lunch: [
        {
          id: "mg-l1",
          name: "Cơm gạo lứt gà nướng bông cải xanh",
          description: "Bữa trưa cân bằng với protein từ thịt gà, carbs từ gạo lứt",
          image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500",
          calories: 680,
          protein: 55,
          carbs: 75,
          fat: 18,
          prepTime: "25 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.9,
          ingredients: [
            "150g ức gà",
            "100g gạo lứt (khô)",
            "150g bông cải xanh",
            "1 thìa dầu oliu",
            "Tỏi, gừng, muối, tiêu",
            "Nước tương"
          ],
          instructions: [
            "Nấu cơm gạo lứt (ngâm trước 30 phút cho mềm)",
            "Ướp gà với tỏi, gừng, muối, tiêu, nước tương 15 phút",
            "Nướng gà ở 180°C trong 20 phút (hoặc chiên chảo)",
            "Luộc hoặc hấp bông cải trong 5 phút",
            "Xào bông cải với tỏi và dầu oliu",
            "Bày cơm, gà, rau ra đĩa"
          ],
          mealType: "lunch"
        },
        {
          id: "mg-l2",
          name: "Mì Ý sốt cà chua thịt bò xay",
          description: "Pasta với thịt bò xay giàu protein, sốt cà chua tươi",
          image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
          calories: 720,
          protein: 48,
          carbs: 82,
          fat: 22,
          prepTime: "30 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.7,
          ingredients: [
            "100g mì Ý (khô)",
            "120g thịt bò xay nạc",
            "200g cà chua tươi",
            "1 củ hành tây",
            "2 tép tỏi",
            "Húng quế, oregano",
            "Dầu oliu, muối, tiêu"
          ],
          instructions: [
            "Luộc mì Ý theo hướng dẫn trên bao bì",
            "Xào tỏi, hành với dầu oliu đến thơm",
            "Thêm thịt bò xay, đảo đều đến khi chín",
            "Cho cà chua băm vào, nấu 10-15 phút",
            "Nêm gia vị, thêm húng quế, oregano",
            "Trộn mì với sốt, rắc phô mai parmesan (optional)"
          ],
          mealType: "lunch"
        }
      ],
      dinner: [
        {
          id: "mg-d1",
          name: "Cá hồi nướng khoai lang nghiền",
          description: "Protein từ cá hồi, omega-3, carbs phức hợp từ khoai lang",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
          calories: 620,
          protein: 48,
          carbs: 52,
          fat: 24,
          prepTime: "30 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.9,
          ingredients: [
            "150g phi lê cá hồi",
            "200g khoai lang",
            "100g măng tây",
            "Chanh, mật ong",
            "Tỏi, muối, tiêu",
            "Dầu oliu"
          ],
          instructions: [
            "Luộc hoặc hấp khoai lang đến mềm",
            "Nghiền khoai với ít sữa tươi và muối",
            "Ướp cá hồi với chanh, mật ong, tỏi 10 phút",
            "Nướng cá ở 180°C trong 15-18 phút",
            "Xào hoặc nướng măng tây với dầu oliu",
            "Bày đĩa và thưởng thức"
          ],
          mealType: "dinner"
        },
        {
          id: "mg-d2",
          name: "Bít tết bò rau củ nướng",
          description: "Steak bò giàu protein, kết hợp rau củ nướng đa dạng",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
          calories: 650,
          protein: 52,
          carbs: 38,
          fat: 32,
          prepTime: "25 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.8,
          ingredients: [
            "180g bít tết bò (sirloin/tenderloin)",
            "150g khoai tây baby",
            "100g cà rốt",
            "100g bí ngòi",
            "Tỏi, thảo mộc (thyme, rosemary)",
            "Dầu oliu, muối, tiêu"
          ],
          instructions: [
            "Ướp bò với muối, tiêu, tỏi 15 phút",
            "Cắt rau củ miếng vừa, trộn dầu oliu và gia vị",
            "Nướng rau ở 200°C trong 20-25 phút",
            "Áp chảo bít tết: mỗi mặt 3-4 phút (medium rare)",
            "Để thịt nghỉ 5 phút trước khi cắt",
            "Bày đĩa cùng rau củ nướng"
          ],
          mealType: "dinner"
        }
      ],
      snack: [
        {
          id: "mg-s1",
          name: "Sữa chua Hy Lạp quả mọng hạt chia",
          description: "Snack giàu protein, chất xơ từ hạt chia và vitamin từ quả mọng",
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500",
          calories: 280,
          protein: 22,
          carbs: 32,
          fat: 8,
          prepTime: "5 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.7,
          ingredients: [
            "200g sữa chua Hy Lạp không đường",
            "50g quả việt quất/dâu tây",
            "1 thìa hạt chia",
            "1 thìa mật ong",
            "10g hạt óc chó băm"
          ],
          instructions: [
            "Cho sữa chua vào bát",
            "Thêm quả mọng tươi",
            "Rắc hạt chia và hạt óc chó",
            "Rưới mật ong",
            "Trộn đều và thưởng thức"
          ],
          mealType: "snack"
        },
        {
          id: "mg-s2",
          name: "Bánh protein chuối hạnh nhân",
          description: "Protein bar tự làm, năng lượng lành mạnh",
          image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500",
          calories: 320,
          protein: 18,
          carbs: 38,
          fat: 12,
          prepTime: "40 phút",
          servings: 6,
          difficulty: "medium",
          rating: 4.6,
          ingredients: [
            "2 quả chuối chín",
            "60g bột whey protein",
            "80g bột yến mạch",
            "30g bơ hạnh nhân",
            "2 quả trứng",
            "1 thìa bột nở"
          ],
          instructions: [
            "Làm nóng lò 180°C",
            "Nghiền chuối, trộn với trứng và bơ hạnh nhân",
            "Thêm whey protein, bột yến mạch, bột nở",
            "Đổ hỗn hợp vào khay nướng",
            "Nướng 25-30 phút đến khi chín vàng",
            "Để nguội, cắt thành miếng"
          ],
          mealType: "snack"
        }
      ]
    }
  },

  // FAT LOSS - Giảm mỡ
  {
    goal: "fat-loss",
    goalName: "Giảm mỡ",
    description: "Chế độ ăn giảm cân với calorie thấp, protein cao, ít carbs",
    dailyCalories: 1800,
    dailyProtein: 140,
    dailyCarbs: 150,
    dailyFat: 60,
    waterIntake: 3.0,
    meals: {
      breakfast: [
        {
          id: "fl-b1",
          name: "Trứng bác rau củ nấm",
          description: "Bữa sáng ít calo, nhiều protein và chất xơ",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
          calories: 280,
          protein: 24,
          carbs: 18,
          fat: 14,
          prepTime: "12 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.7,
          ingredients: [
            "3 quả trứng",
            "50g nấm",
            "50g ớt chuông",
            "30g hành tây",
            "Rau bina baby",
            "Dầu oliu, muối, tiêu"
          ],
          instructions: [
            "Xào hành tây với ít dầu oliu",
            "Thêm nấm, ớt chuông xào mềm",
            "Đổ trứng đã đánh vào, đảo nhẹ",
            "Thêm rau bina, nêm gia vị",
            "Đảo đều đến khi trứng chín vừa"
          ],
          mealType: "breakfast"
        },
        {
          id: "fl-b2",
          name: "Smoothie xanh whey protein",
          description: "Sinh tố giàu dinh dưỡng, ít calo, nhiều vitamin",
          image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500",
          calories: 260,
          protein: 28,
          carbs: 28,
          fat: 6,
          prepTime: "5 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.8,
          ingredients: [
            "1 scoop whey protein (30g)",
            "1 cup rau bina tươi",
            "1/2 quả chuối đông lạnh",
            "1/2 quả táo xanh",
            "200ml nước lọc",
            "1 thìa hạt chia"
          ],
          instructions: [
            "Cho tất cả nguyên liệu vào máy xay",
            "Xay ở tốc độ cao 30-45 giây",
            "Thêm đá nếu muốn mát hơn",
            "Đổ ra ly và thưởng thức ngay"
          ],
          mealType: "breakfast"
        }
      ],
      lunch: [
        {
          id: "fl-l1",
          name: "Salad gà nướng quinoa",
          description: "Bữa trưa nhẹ nhàng với protein từ gà, chất xơ từ rau và quinoa",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
          calories: 420,
          protein: 42,
          carbs: 38,
          fat: 12,
          prepTime: "20 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.9,
          ingredients: [
            "120g ức gà nướng",
            "50g quinoa nấu chín",
            "Rau xà lách, rau mầm",
            "Cà chua cherry",
            "Dưa chuột",
            "Dressing: chanh, dầu oliu, mù tạt"
          ],
          instructions: [
            "Nấu quinoa theo hướng dẫn",
            "Nướng hoặc luộc ức gà, thái lát",
            "Rửa sạch rau, cắt cà chua, dưa chuột",
            "Trộn dressing: 2 thìa chanh, 1 thìa dầu oliu, mù tạt",
            "Trộn tất cả nguyên liệu với dressing"
          ],
          mealType: "lunch"
        },
        {
          id: "fl-l2",
          name: "Phở gà ít dầu",
          description: "Phở truyền thống giảm calories, nhiều protein từ gà",
          image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500",
          calories: 380,
          protein: 38,
          carbs: 45,
          fat: 8,
          prepTime: "15 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.8,
          ingredients: [
            "100g bánh phở tươi",
            "150g ức gà luộc",
            "Hành lá, ngò, giá đỗ",
            "Nước dùng gà trong",
            "Chanh, ớt",
            "Muối, tiêu, nước mắm"
          ],
          instructions: [
            "Luộc gà với gừng đến chín, vớt ra thái lát",
            "Hớt bọt để nước dùng trong",
            "Trụng bánh phở qua nước sôi",
            "Cho bánh phở vào tô, xếp gà lên trên",
            "Chan nước dùng nóng, thêm rau thơm",
            "Ăn kèm chanh, ớt"
          ],
          mealType: "lunch"
        }
      ],
      dinner: [
        {
          id: "fl-d1",
          name: "Cá rô phi hấp xì dầu rau luộc",
          description: "Bữa tối nhẹ với cá trắng ít mỡ, nhiều protein",
          image: "https://images.unsplash.com/photo-1580959375944-0be29ff8c740?w=500",
          calories: 340,
          protein: 42,
          carbs: 22,
          fat: 10,
          prepTime: "20 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.7,
          ingredients: [
            "180g phi lê cá rô phi",
            "Gừng, hành lá",
            "Xì dầu, dầu mè",
            "150g súp lơ xanh",
            "100g cà rốt",
            "Muối"
          ],
          instructions: [
            "Ướp cá với gừng, muối 10 phút",
            "Hấp cá với gừng 12-15 phút",
            "Luộc súp lơ và cà rốt",
            "Đun nóng xì dầu với dầu mè",
            "Rưới lên cá, rắc hành lá",
            "Bày đĩa cùng rau luộc"
          ],
          mealType: "dinner"
        },
        {
          id: "fl-d2",
          name: "Canh đậu hũ nấm hải sản",
          description: "Món canh nhẹ, nhiều protein từ đậu hũ và hải sản",
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
          calories: 310,
          protein: 35,
          carbs: 18,
          fat: 12,
          prepTime: "25 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.6,
          ingredients: [
            "150g đậu hũ non",
            "100g tôm/mực",
            "100g nấm đùi gà",
            "Cà chua, hành lá",
            "Nước dùng xương",
            "Muối, tiêu, nước mắm"
          ],
          instructions: [
            "Luộc sơ hải sản, vớt ra",
            "Đun nóng nước dùng",
            "Cho cà chua, nấm vào nấu",
            "Thêm đậu hũ cắt miếng",
            "Cho hải sản vào, nêm gia vị",
            "Rắc hành lá, tắt bếp"
          ],
          mealType: "dinner"
        }
      ],
      snack: [
        {
          id: "fl-s1",
          name: "Trái cây tươi hạt điều",
          description: "Snack lành mạnh với vitamin và chất béo tốt",
          image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500",
          calories: 180,
          protein: 6,
          carbs: 24,
          fat: 8,
          prepTime: "2 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.5,
          ingredients: [
            "1 quả táo",
            "15g hạt điều sống",
            "Hoặc: 100g dâu tây + 10g hạnh nhân"
          ],
          instructions: [
            "Rửa sạch trái cây",
            "Cắt táo thành lát",
            "Ăn kèm với hạt điều"
          ],
          mealType: "snack"
        },
        {
          id: "fl-s2",
          name: "Rau củ sống hummus",
          description: "Snack ít calo, nhiều chất xơ và protein thực vật",
          image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500",
          calories: 150,
          protein: 8,
          carbs: 20,
          fat: 5,
          prepTime: "10 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.6,
          ingredients: [
            "Cà rốt, dưa chuột, cần tây",
            "Ớt chuông",
            "50g hummus (đậu gà nghiền)",
            "Chanh, tỏi, tahini"
          ],
          instructions: [
            "Rửa sạch rau củ, cắt que dài",
            "Làm hummus: xay đậu gà với tỏi, chanh, tahini",
            "Hoặc mua hummus có sẵn",
            "Chấm rau với hummus"
          ],
          mealType: "snack"
        }
      ]
    }
  },

  // MAINTAIN - Duy trì
  {
    goal: "maintain",
    goalName: "Duy trì",
    description: "Chế độ ăn cân bằng để duy trì cân nặng và sức khỏe",
    dailyCalories: 2200,
    dailyProtein: 120,
    dailyCarbs: 250,
    dailyFat: 70,
    waterIntake: 2.5,
    meals: {
      breakfast: [
        {
          id: "mt-b1",
          name: "Bánh mì sandwich trứng rau",
          description: "Bữa sáng cân bằng với protein, carbs và chất xơ",
          image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
          calories: 380,
          protein: 22,
          carbs: 42,
          fat: 14,
          prepTime: "10 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.6,
          ingredients: [
            "2 lát bánh mì nguyên cám",
            "2 quả trứng",
            "1 lát phô mai",
            "Rau xà lách, cà chua",
            "Dầu oliu"
          ],
          instructions: [
            "Chiên trứng ốp la",
            "Nướng bánh mì",
            "Lần lượt xếp: bánh mì, rau, trứng, phô mai, cà chua",
            "Đậy lát bánh mì thứ 2",
            "Thưởng thức"
          ],
          mealType: "breakfast"
        }
      ],
      lunch: [
        {
          id: "mt-l1",
          name: "Cơm gà xối mỡ rau luộc",
          description: "Món cơm truyền thống cân bằng dinh dưỡng",
          image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
          calories: 550,
          protein: 38,
          carbs: 68,
          fat: 16,
          prepTime: "30 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.8,
          ingredients: [
            "120g gà luộc",
            "100g gạo tám thơm",
            "Rau luộc (cải xanh, cà rốt)",
            "Hành tím, gừng",
            "Nước mắm, chanh"
          ],
          instructions: [
            "Luộc gà với gừng",
            "Nấu cơm với một phần nước luộc gà",
            "Luộc rau củ",
            "Làm nước chấm: nước mắm, chanh, tỏi, ớt",
            "Bày cơm, gà, rau ra đĩa"
          ],
          mealType: "lunch"
        }
      ],
      dinner: [
        {
          id: "mt-d1",
          name: "Bún chả Hà Nội",
          description: "Món Việt truyền thống giàu hương vị",
          image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500",
          calories: 520,
          protein: 32,
          carbs: 62,
          fat: 18,
          prepTime: "35 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.9,
          ingredients: [
            "100g bún tươi",
            "120g thịt ba chỉ/nạc vai",
            "Rau sống (xà lách, húng, mùi tàu)",
            "Nước mắm, đường, tỏi, ớt",
            "Đồ chua (cà rốt, su hào)"
          ],
          instructions: [
            "Ướp thịt với nước mắm, tỏi, đường",
            "Nướng thịt trên than hoặc chảo",
            "Pha nước chấm chua ngọt",
            "Trụng bún",
            "Bày bún, rau, chả ra tô, chan nước mắm"
          ],
          mealType: "dinner"
        }
      ],
      snack: [
        {
          id: "mt-s1",
          name: "Sữa đậu nành hạt óc chó",
          description: "Snack bổ dưỡng với protein thực vật",
          image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
          calories: 220,
          protein: 12,
          carbs: 18,
          fat: 10,
          prepTime: "5 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.5,
          ingredients: [
            "250ml sữa đậu nành không đường",
            "15g hạt óc chó",
            "1 thìa mật ong (optional)"
          ],
          instructions: [
            "Đun ấm sữa đậu nành",
            "Ăn kèm hạt óc chó",
            "Thêm mật ong nếu muốn ngọt"
          ],
          mealType: "snack"
        }
      ]
    }
  },

  // ENDURANCE - Sức bền
  {
    goal: "endurance",
    goalName: "Sức bền",
    description: "Chế độ ăn cho vận động viên sức bền với carbs cao, protein vừa phải",
    dailyCalories: 2600,
    dailyProtein: 130,
    dailyCarbs: 380,
    dailyFat: 70,
    waterIntake: 4.0,
    meals: {
      breakfast: [
        {
          id: "ed-b1",
          name: "Pancake yến mạch chuối mật ong",
          description: "Bữa sáng giàu carbs cho năng lượng lâu dài",
          image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500",
          calories: 480,
          protein: 18,
          carbs: 75,
          fat: 12,
          prepTime: "15 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.7,
          ingredients: [
            "60g bột yến mạch",
            "2 quả trứng",
            "1 quả chuối",
            "100ml sữa tươi",
            "Mật ong",
            "Quả mọng tươi"
          ],
          instructions: [
            "Xay yến mạch thành bột mịn",
            "Trộn bột yến mạch, trứng, chuối nghiền, sữa",
            "Đổ hỗn hợp vào chảo nóng",
            "Chiên mỗi mặt 2-3 phút",
            "Xếp pancake, rưới mật ong, thêm quả mọng"
          ],
          mealType: "breakfast"
        }
      ],
      lunch: [
        {
          id: "ed-l1",
          name: "Cơm trộn Hàn Quốc bibimbap",
          description: "Món cơm đa dạng rau củ, cung cấp năng lượng bền vững",
          image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=500",
          calories: 620,
          protein: 28,
          carbs: 92,
          fat: 18,
          prepTime: "30 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.9,
          ingredients: [
            "120g cơm trắng",
            "80g thịt bò xào",
            "Rau trộn: giá đỗ, rau bina, cà rốt, nấm",
            "1 quả trứng ốp la",
            "Gochujang (tương ớt Hàn)",
            "Dầu mè"
          ],
          instructions: [
            "Nấu cơm",
            "Xào từng loại rau riêng với ít dầu",
            "Xào thịt bò với tỏi, nước tương",
            "Chiên trứng ốp la",
            "Bày cơm, xếp rau và thịt hình tròn, đặt trứng giữa",
            "Ăn kèm gochujang, trộn đều"
          ],
          mealType: "lunch"
        }
      ],
      dinner: [
        {
          id: "ed-d1",
          name: "Mì Udon nước dùng thịt gà",
          description: "Món mì Nhật với carbs cao, nước dùng bổ dưỡng",
          image: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=500",
          calories: 580,
          protein: 32,
          carbs: 88,
          fat: 14,
          prepTime: "25 phút",
          servings: 1,
          difficulty: "medium",
          rating: 4.8,
          ingredients: [
            "150g mì Udon",
            "100g ức gà",
            "Nước dùng dashi",
            "Nấm shiitake",
            "Hành lá, rong biển",
            "Nước tương, mirin"
          ],
          instructions: [
            "Luộc mì Udon theo hướng dẫn",
            "Nấu nước dùng dashi với nước tương, mirin",
            "Luộc gà, thái lát",
            "Cho mì vào tô, xếp gà, nấm lên trên",
            "Chan nước dùng nóng",
            "Rắc hành lá, rong biển"
          ],
          mealType: "dinner"
        }
      ],
      snack: [
        {
          id: "ed-s1",
          name: "Chuối sấy khô hạt hạnh nhân",
          description: "Snack năng lượng nhanh cho vận động viên",
          image: "https://images.unsplash.com/photo-1587049352846-4a222e784l6bb?w=500",
          calories: 280,
          protein: 8,
          carbs: 48,
          fat: 10,
          prepTime: "2 phút",
          servings: 1,
          difficulty: "easy",
          rating: 4.6,
          ingredients: [
            "50g chuối sấy khô",
            "20g hạt hạnh nhân rang"
          ],
          instructions: [
            "Ăn trực tiếp chuối sấy và hạt",
            "Tốt nhất là ăn trước/sau tập 30 phút"
          ],
          mealType: "snack"
        }
      ]
    }
  }
];

// Helper function to get meal plan by goal
export function getMealPlanByGoal(goal: "muscle-gain" | "fat-loss" | "maintain" | "endurance"): MealPlan | undefined {
  return mealPlans.find(plan => plan.goal === goal);
}

// Helper function to get water intake by goal
export function getWaterIntakeByGoal(goal: "muscle-gain" | "fat-loss" | "maintain" | "endurance"): number {
  const plan = getMealPlanByGoal(goal);
  return plan?.waterIntake || 2.5;
}

// Helper function to get all meals from all plans
export function getAllMeals(): Meal[] {
  const allMeals: Meal[] = [];
  mealPlans.forEach(plan => {
    allMeals.push(...plan.meals.breakfast);
    allMeals.push(...plan.meals.lunch);
    allMeals.push(...plan.meals.dinner);
    allMeals.push(...plan.meals.snack);
  });
  return allMeals;
}
