export type ComponentCategory =
  | "Dashboard"
  | "Users"
  | "Billing"
  | "Analytics"
  | "Settings"
  | "Utilities"
  | "Auth"
  | "Marketing";

export interface ComponentProductMetadata {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  isFree: boolean;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  useCases: string[];
}

export type AsyncState = "idle" | "loading" | "success" | "error" | "empty";

export type TrendDirection = "up" | "down" | "neutral";

export interface ChartPoint {
  date: string;
  value: number;
}

export type UserRole = "Owner" | "Admin" | "Member" | "Viewer";
export type UserStatus = "active" | "invited" | "suspended";

export interface SaaSUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  lastActiveAt: string;
  createdAt: string;
}

export type SubscriptionStatus = "active" | "trial" | "past_due" | "cancelled";

export interface InvoiceRecord {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  paymentMethod: string;
}

export type ActivityType =
  | "user_joined"
  | "subscription_upgraded"
  | "invoice_paid"
  | "project_created"
  | "password_changed"
  | "api_key_generated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  actor?: {
    name: string;
    avatarUrl?: string;
  };
}

export type NotificationType = "success" | "warning" | "error" | "information";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  category: string;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  lastUsedAt: string | null;
  permissions: ("read" | "write" | "admin")[];
  status: "active" | "revoked";
}

export interface Workspace {
  id: string;
  name: string;
}

export interface OrganizationNode {
  id: string;
  name: string;
  avatarInitials: string;
  workspaces: Workspace[];
}

export interface PermissionMatrixRow {
  feature: string;
  roles: Record<UserRole, boolean>;
}

export interface PaymentMethodInfo {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "generic";
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface PricingPlanFeature {
  label: string;
  included: boolean | string;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  recommended?: boolean;
  features: PricingPlanFeature[];
}
