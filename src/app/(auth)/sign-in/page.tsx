import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";

export default function SignIn() {
  return (
    <AuthCard
      headerTitle="Sign In"
      headerDescription="Hey I think have seen you. Please Sign In!"
      footerLinkHref="/sign-up"
      footerLinkLabel="Don't have an account?"
      AuthForm={<AuthForm formButtonLabel="Sign In" />}
    />
  );
}
