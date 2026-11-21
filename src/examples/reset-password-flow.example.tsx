import { ResetPasswordFlow } from "@/components/saas/auth/reset-password-flow";

export default function Example() {
  return (
    <ResetPasswordFlow
      stage="request"
      onRequestReset={(values) => console.log("request reset", values)}
      onResetPassword={(values) => console.log("reset password", values)}
      onBackToLogin={() => console.log("back to login")}
    />
  );
}
