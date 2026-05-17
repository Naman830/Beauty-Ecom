import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved products.",
}

export default async function WishlistLayout({ children }: { children: React.ReactNode }) {
  await auth.protect()

  return children
}
