import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, MailCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ResetPasswordStage = "request" | "sent" | "reset" | "success";

const requestSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});
type RequestValues = z.infer<typeof requestSchema>;

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });
type ResetValues = z.infer<typeof resetSchema>;

export interface ResetPasswordFlowProps {
  stage: ResetPasswordStage;
  email?: string;
  onRequestReset: (values: RequestValues) => void;
  onResetPassword: (values: ResetValues) => void;
  onBackToLogin?: () => void;
  isSubmitting?: boolean;
  error?: string;
  className?: string;
}

export function ResetPasswordFlow({
  stage,
  email,
  onRequestReset,
  onResetPassword,
  onBackToLogin,
  isSubmitting = false,
  error,
  className,
}: ResetPasswordFlowProps) {
  const requestForm = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: email ?? "" },
  });
  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const wrapperClassName = cn("w-full max-w-sm space-y-4 text-left", className);

  if (stage === "sent") {
    return (
      <div className={cn(wrapperClassName, "text-center")}>
        <MailCheck className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
        <div>
          <p className="font-medium">Check your email</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent password reset instructions to {email ?? "your email address"}.
          </p>
        </div>
        {onBackToLogin && (
          <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
            Back to login
          </Button>
        )}
      </div>
    );
  }

  if (stage === "success") {
    return (
      <div className={cn(wrapperClassName, "text-center")}>
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden="true" />
        <div>
          <p className="font-medium">Password updated</p>
          <p className="mt-1 text-sm text-muted-foreground">You can now log in with your new password.</p>
        </div>
        {onBackToLogin && (
          <Button type="button" className="w-full" onClick={onBackToLogin}>
            Back to login
          </Button>
        )}
      </div>
    );
  }

  if (stage === "reset") {
    return (
      <form onSubmit={resetForm.handleSubmit(onResetPassword)} noValidate className={wrapperClassName}>
        {error && (
          <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="reset-password">New password</Label>
          <Input id="reset-password" type="password" autoComplete="new-password" {...resetForm.register("password")} />
          {resetForm.formState.errors.password && (
            <p className="text-xs text-destructive">{resetForm.formState.errors.password.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reset-confirm-password">Confirm new password</Label>
          <Input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            {...resetForm.register("confirmPassword")}
          />
          {resetForm.formState.errors.confirmPassword && (
            <p className="text-xs text-destructive">{resetForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Update password
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={requestForm.handleSubmit(onRequestReset)} noValidate className={wrapperClassName}>
      <div>
        <p className="font-medium">Reset your password</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the email associated with your account and we'll send reset instructions.
        </p>
      </div>
      {error && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="reset-request-email">Email</Label>
        <Input id="reset-request-email" type="email" autoComplete="email" {...requestForm.register("email")} />
        {requestForm.formState.errors.email && (
          <p className="text-xs text-destructive">{requestForm.formState.errors.email.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Send reset instructions
      </Button>
      {onBackToLogin && (
        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full text-center text-sm font-medium text-primary hover:underline"
        >
          Back to login
        </button>
      )}
    </form>
  );
}
