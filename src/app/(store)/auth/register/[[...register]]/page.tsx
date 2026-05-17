import { SignUp } from "@clerk/nextjs"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <SignUp
        path="/auth/register"
        routing="path"
        signInUrl="/auth/login"
        fallbackRedirectUrl="/account"
      />
    </div>
  )
}
