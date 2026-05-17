import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
}

export default async function CheckoutLayout({ children }: { children: React.ReactNode }) {
  await auth.protect()

  return children
}
