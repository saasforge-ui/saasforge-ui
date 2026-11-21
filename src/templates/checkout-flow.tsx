import * as React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutStepper } from "@/components/saas/ecommerce/checkout-stepper";
import { ProductCardGrid } from "@/components/saas/ecommerce/product-card-grid";
import { ShoppingCartDrawer } from "@/components/saas/ecommerce/shopping-cart-drawer";
import { ShippingAddressForm, type ShippingAddressValues } from "@/components/saas/ecommerce/shipping-address-form";
import { PaymentMethodSelector } from "@/components/saas/ecommerce/payment-method-selector";
import { CouponCodeInput } from "@/components/saas/ecommerce/coupon-code-input";
import { OrderSummaryCard } from "@/components/saas/ecommerce/order-summary-card";
import { OrderConfirmationCard } from "@/components/saas/ecommerce/order-confirmation-card";
import { mockPaymentMethods } from "@/data/mock-data";
import type { CartItem, ProductItem } from "@/types";

const mockProducts: ProductItem[] = [
  { id: "prod_01", name: "Wireless Keyboard", price: 89, rating: 4.6, inStock: true, description: "Low-profile mechanical keyboard." },
  { id: "prod_02", name: "Ergonomic Mouse", price: 49, rating: 4.4, inStock: true, description: "Vertical grip, wireless." },
  { id: "prod_03", name: "USB-C Dock", price: 129, rating: 4.8, inStock: true, description: "10-port docking station." },
  { id: "prod_04", name: "Standing Desk Mat", price: 39, rating: 4.2, inStock: false, description: "Anti-fatigue mat, 36x24in." },
  { id: "prod_05", name: "Desk Lamp", price: 59, rating: 4.5, inStock: true, description: "Adjustable color temperature." },
  { id: "prod_06", name: "Laptop Stand", price: 45, rating: 4.7, inStock: true, description: "Aluminum, adjustable height." },
];

/**
 * Checkout Flow — a full-page template composed entirely from existing
 * SaaSForge UI Pro components. Centered, sidebar-less: a Checkout Stepper
 * drives Cart, Shipping & Payment steps (Product Card Grid, Shopping Cart
 * Drawer, Shipping Address Form, Payment Method Selector, Coupon Code Input,
 * Order Summary Card), finishing on an Order Confirmation Card.
 */
export default function CheckoutFlowTemplate() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { id: "prod_02", name: "Ergonomic Mouse", price: 49, quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [shippingValues, setShippingValues] = React.useState<ShippingAddressValues | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = React.useState(mockPaymentMethods[0]?.id);
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | undefined>(undefined);
  const [couponError, setCouponError] = React.useState<string | undefined>(undefined);
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [checkoutStep, setCheckoutStep] = React.useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const shipping = subtotal > 0 ? 8 : 0;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  function addToCart(product: ProductItem) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  }

  function applyCoupon(code: string) {
    if (code.trim().toUpperCase() === "SAVE10") {
      setAppliedCoupon(code.toUpperCase());
      setCouponError(undefined);
    } else {
      setCouponError("This coupon code isn't valid.");
    }
  }

  function placeOrder() {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderPlaced(true);
    }, 900);
  }

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12 text-foreground">
        <OrderConfirmationCard
          orderNumber="87421"
          estimatedDelivery="Aug 22 – Aug 25, 2026"
          email="sarah@acme.io"
          onTrackOrder={() => console.log("track order")}
          onContinueShopping={() => {
            setOrderPlaced(false);
            setCheckoutStep(0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold tracking-tight">Checkout</h1>
        <Button variant="outline" size="sm" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="h-4 w-4" />
          Cart ({cartItems.reduce((n, item) => n + item.quantity, 0)})
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <CheckoutStepper
            currentStep={checkoutStep}
            onStepChange={setCheckoutStep}
            onComplete={placeOrder}
            isCompleting={isPlacingOrder}
            completeLabel="Place order"
            className="max-w-none"
            steps={[
              {
                id: "cart",
                label: "Cart",
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Add products to your cart, then continue to shipping.</p>
                    <ProductCardGrid products={mockProducts} onAddToCart={addToCart} />
                  </div>
                ),
              },
              {
                id: "shipping",
                label: "Shipping",
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Where should we send your order?</p>
                    <ShippingAddressForm
                      defaultValues={shippingValues ?? undefined}
                      onSubmit={(values) => {
                        setShippingValues(values);
                        setCheckoutStep(2);
                      }}
                    />
                  </div>
                ),
              },
              {
                id: "payment",
                label: "Payment",
                content: (
                  <div className="space-y-5">
                    <p className="text-sm text-muted-foreground">Choose a payment method and apply a coupon if you have one.</p>
                    <PaymentMethodSelector
                      methods={mockPaymentMethods}
                      selectedId={selectedPaymentId}
                      onSelect={setSelectedPaymentId}
                      onAddNew={() => console.log("add new payment method")}
                    />
                    <CouponCodeInput
                      appliedCode={appliedCoupon}
                      discountLabel="10% off"
                      error={couponError}
                      onApply={applyCoupon}
                      onRemove={() => setAppliedCoupon(undefined)}
                    />
                  </div>
                ),
              },
            ]}
          />

          <OrderSummaryCard
            items={cartItems.map((item) => ({ label: `${item.name} × ${item.quantity}`, amount: item.price * item.quantity }))}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            total={total}
            className="max-w-none lg:sticky lg:top-6"
          />
        </div>
      </main>

      <ShoppingCartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        subtotal={subtotal}
        onQuantityChange={(id, quantity) =>
          setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
        }
        onRemove={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
        onCheckout={() => {
          setIsCartOpen(false);
          setCheckoutStep(1);
        }}
      />
    </div>
  );
}
