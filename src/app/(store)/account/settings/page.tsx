"use client"

import { UserProfile } from "@clerk/nextjs"
import { PageHeader } from "@/components/ui/page-header"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader title="Settings" />
      <div className="mt-8">
        <UserProfile routing="hash" />
      </div>
    </div>
  )
}
