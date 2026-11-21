import { SignupForm } from "@/components/saas/auth/signup-form";

export default function Example() {
  return (
    <SignupForm onSubmit={(values) => console.log("signup", values)} onLogIn={() => console.log("go to login")} />
  );
}
