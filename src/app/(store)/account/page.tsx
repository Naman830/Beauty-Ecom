import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

import { Package, MapPin, Settings, Heart } from "lucide-react";

import { SignOutButton } from "@clerk/nextjs";

const accountLinks = [
  {
    name: "Orders",
    description: "View your order history and track shipments",
    href: "/account/orders",
    icon: Package,
  },
  {
    name: "Addresses",
    description: "Manage your shipping and billing addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    name: "Wishlist",
    description: "Products you've saved for later",
    href: "/wishlist",
    icon: Heart,
  },
  {
    name: "Settings",
    description: "Update your profile and preferences",
    href: "/account/settings",
    icon: Settings,
  },
];

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await currentUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="My Account"
        description={`Welcome back, ${user?.firstName || "User"}!`}
      >
        <SignOutButton redirectUrl="/">
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
      </PageHeader>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {accountLinks.map((item) => (
          <Link key={item.name} href={item.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  {item.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
