import { CouponCodeInput } from "@/components/free/coupon-code-input";

export default function Example() {
  return (
    <div className="w-full max-w-sm">
      <CouponCodeInput onApply={(code) => console.log("apply", code)} />
    </div>
  );
}
