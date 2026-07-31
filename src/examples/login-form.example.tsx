import { LoginForm } from "@/components/free/login-form";

export default function Example() {
  return (
    <LoginForm
      onSubmit={(values) => console.log("login", values)}
      onForgotPassword={() => console.log("forgot password")}
      onSignUp={() => console.log("go to sign up")}
      oauthProviders={[
        { id: "google", label: "Google" },
        { id: "github", label: "GitHub" },
      ]}
      onOAuthClick={(providerId) => console.log("oauth", providerId)}
    />
  );
}
