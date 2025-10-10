import { ProfileSetup } from "@/components/auth/profile-setup"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">FlexUp</h1>
          <p className="text-muted-foreground">Thiết lập hồ sơ để nhận kế hoạch tập luyện cá nhân hóa</p>
        </div>
        <ProfileSetup />
      </div>
    </div>
  )
}
