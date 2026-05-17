"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { useMounted } from "@/lib/use-mounted"

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const mounted = useMounted()
  const storedDismissed =
    mounted && sessionStorage.getItem("announcement-dismissed") === "true"

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem("announcement-dismissed", "true")
  }

  if (!mounted || dismissed || storedDismissed || !siteConfig.announcement) return null

  return (
    <div className="relative bg-foreground px-4 py-2.5 text-center text-xs font-medium text-background sm:text-sm">
      <p>{siteConfig.announcement}</p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-background/60 hover:text-background"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
