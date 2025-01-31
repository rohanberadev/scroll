import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";

export default async function SignUp() {
  return (
    <AuthCard
      headerTitle="Sign Up"
      headerDescription="Hey, Who are you? Please Sign Up!"
      footerLinkHref="/sign-in"
      footerLinkLabel="Already have an account!"
      AuthForm={<AuthForm formButtonLabel="Sign Up" />}
    />
  );
}
