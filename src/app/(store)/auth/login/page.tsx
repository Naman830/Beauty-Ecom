import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <SignIn
        path="/auth/login"
        signUpUrl="/auth/register"
        fallbackRedirectUrl="/account"
      />
    </div>
  )
}
