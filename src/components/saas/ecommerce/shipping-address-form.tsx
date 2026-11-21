import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Name is required."),
  addressLine1: z.string().min(1, "Address is required."),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State/province is required."),
  postalCode: z.string().min(1, "Postal code is required."),
  country: z.string().min(1, "Country is required."),
  saveAsDefault: z.boolean(),
});

export type ShippingAddressValues = z.infer<typeof shippingAddressSchema>;

export interface ShippingAddressFormProps {
  defaultValues?: Partial<ShippingAddressValues>;
  countryOptions?: { value: string; label: string }[];
  onSubmit: (values: ShippingAddressValues) => void;
  isSubmitting?: boolean;
  className?: string;
}

const defaultCountryOptions = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
];

export function ShippingAddressForm({
  defaultValues,
  countryOptions = defaultCountryOptions,
  onSubmit,
  isSubmitting = false,
  className,
}: ShippingAddressFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ShippingAddressValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: countryOptions[0]?.value ?? "",
      saveAsDefault: false,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("w-full max-w-md space-y-4 text-left", className)}>
      <div className="space-y-1.5">
        <Label htmlFor="shipping-name">Full name</Label>
        <Input id="shipping-name" {...register("fullName")} />
        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="shipping-address1">Address line 1</Label>
        <Input id="shipping-address1" {...register("addressLine1")} />
        {errors.addressLine1 && <p className="text-xs text-destructive">{errors.addressLine1.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="shipping-address2">Address line 2 (optional)</Label>
        <Input id="shipping-address2" {...register("addressLine2")} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="shipping-city">City</Label>
          <Input id="shipping-city" {...register("city")} />
          {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="shipping-state">State / Province</Label>
          <Input id="shipping-state" {...register("state")} />
          {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="shipping-postal">Postal code</Label>
          <Input id="shipping-postal" {...register("postalCode")} />
          {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="shipping-country">Country</Label>
          <Select value={watch("country")} onValueChange={(v) => setValue("country", v, { shouldValidate: true })}>
            <SelectTrigger id="shipping-country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="shipping-default"
          checked={watch("saveAsDefault")}
          onCheckedChange={(checked) => setValue("saveAsDefault", checked === true)}
        />
        <Label htmlFor="shipping-default" className="text-sm font-normal text-muted-foreground">
          Save as default address
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Continue
      </Button>
    </form>
  );
}
