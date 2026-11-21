import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const loginFormSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export interface OAuthProvider {
  id: string;
  label: string;
}

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  oauthProviders?: OAuthProvider[];
  onOAuthClick?: (providerId: string) => void;
  isSubmitting?: boolean;
  error?: string;
  className?: string;
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSignUp,
  oauthProviders = [],
  onOAuthClick,
  isSubmitting = false,
  error,
  className,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("w-full max-w-sm space-y-4 text-left", className)}
    >
      {error && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          {onForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>
        <Input id="login-password" type="password" autoComplete="current-password" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="login-remember"
          checked={watch("rememberMe")}
          onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
        />
        <Label htmlFor="login-remember" className="text-sm font-normal text-muted-foreground">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Log in
      </Button>

      {oauthProviders.length > 0 && (
        <>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or continue with
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${oauthProviders.length}, 1fr)` }}>
            {oauthProviders.map((provider) => (
              <Button
                key={provider.id}
                type="button"
                variant="outline"
                onClick={() => onOAuthClick?.(provider.id)}
              >
                {provider.label}
              </Button>
            ))}
          </div>
        </>
      )}

      {onSignUp && (
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button type="button" onClick={onSignUp} className="font-medium text-primary hover:underline">
            Sign up
          </button>
        </p>
      )}
    </form>
  );
}
