"use client"

import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useAddressStore } from "@/store/addresses"
import { useOrdersStore } from "@/store/orders"
import { useWishlistStore } from "@/store/wishlist"

const LAST_AUTH_USER_KEY = "last-auth-user-id"

export function AuthStoreSync() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const clearAddresses = useAddressStore((s) => s.clearAddresses)
  const clearOrders = useOrdersStore((s) => s.clearOrders)
  const clearWishlist = useWishlistStore((s) => s.clearAll)

  useEffect(() => {
    if (!isLoaded) return

    const lastUserId = window.localStorage.getItem(LAST_AUTH_USER_KEY)

    if (!isSignedIn || !userId) {
      clearAddresses()
      clearWishlist()
      clearOrders()
      window.localStorage.removeItem(LAST_AUTH_USER_KEY)
      return
    }

    if (!lastUserId || lastUserId !== userId) {
      clearAddresses()
      clearWishlist()
      clearOrders()
    }

    window.localStorage.setItem(LAST_AUTH_USER_KEY, userId)
  }, [clearAddresses, clearOrders, clearWishlist, isLoaded, isSignedIn, userId])

  return null
}
