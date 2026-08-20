import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionProgressIndicator = motion.create(ProgressPrimitive.Indicator);

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    {...props}
  >
    <MotionProgressIndicator
      className={cn("h-full w-full flex-1 origin-left bg-primary", indicatorClassName)}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: (value ?? 0) / 100 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
