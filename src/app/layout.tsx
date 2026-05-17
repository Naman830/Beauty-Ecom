import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"
import { siteConfig } from "@/lib/config"
import { AuthStoreSync } from "@/components/auth/auth-store-sync"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale.replace("-", "_"),
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <ClerkProvider
      signInUrl="/auth/login"
      signUpUrl="/auth/register"
      afterSignOutUrl="/"
    >
      <html lang={locale} className={`${inter.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-white">
          <NextIntlClientProvider messages={messages}>
            <AuthStoreSync />
            {children}
          </NextIntlClientProvider>

          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
