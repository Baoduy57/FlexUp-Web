"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is logged in
        if (user.hasCompletedProfile) {
          // User has completed profile, go to dashboard
          router.push("/dashboard")
        } else {
          // User needs to complete profile setup
          router.push("/profile-setup")
        }
      } else {
        // User is not logged in, go to landing page
        router.push("/landing")
      }
    }
  }, [user, isLoading, router])

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return null
}
