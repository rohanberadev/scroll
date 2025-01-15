import AuthCard from "@/components/auth/AuthCard";

export default function SignIn() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <AuthCard
        headerTitle="Sign In"
        headerDescription="Hey I think have seen you. Please Sign In!"
        footerLinkHref="/sign-up"
        footerLinkLabel="Don't have an account?"
      />
    </main>
  );
}
