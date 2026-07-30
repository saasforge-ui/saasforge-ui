import type {
  ActivityItem,
  ApiKeyRecord,
  ChartPoint,
  InvoiceRecord,
  NotificationItem,
  OrganizationNode,
  PaymentMethodInfo,
  PermissionMatrixRow,
  PricingPlan,
  SaaSUser,
} from "@/types";

export const mockRevenueSeries: ChartPoint[] = [
  { date: "Feb", value: 24500 },
  { date: "Mar", value: 27800 },
  { date: "Apr", value: 26200 },
  { date: "May", value: 31900 },
  { date: "Jun", value: 34100 },
  { date: "Jul", value: 38650 },
];

export const mockUsageSeries: ChartPoint[] = [
  { date: "Mon", value: 1240 },
  { date: "Tue", value: 1890 },
  { date: "Wed", value: 1620 },
  { date: "Thu", value: 2210 },
  { date: "Fri", value: 2480 },
  { date: "Sat", value: 1340 },
  { date: "Sun", value: 980 },
];

export const mockUsers: SaaSUser[] = [
  {
    id: "usr_01",
    name: "Sarah Chen",
    email: "sarah@acme.io",
    role: "Owner",
    status: "active",
    lastActiveAt: "2026-07-29T09:12:00Z",
    createdAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "usr_02",
    name: "Marcus Webb",
    email: "marcus@northlane.dev",
    role: "Admin",
    status: "active",
    lastActiveAt: "2026-07-28T18:40:00Z",
    createdAt: "2024-03-02T00:00:00Z",
  },
  {
    id: "usr_03",
    name: "Priya Nair",
    email: "priya@fluxbase.com",
    role: "Member",
    status: "invited",
    lastActiveAt: "2026-07-20T11:05:00Z",
    createdAt: "2026-07-18T00:00:00Z",
  },
  {
    id: "usr_04",
    name: "Diego Alvarez",
    email: "diego@cargohub.co",
    role: "Member",
    status: "active",
    lastActiveAt: "2026-07-29T07:55:00Z",
    createdAt: "2024-06-11T00:00:00Z",
  },
  {
    id: "usr_05",
    name: "Emma Thorne",
    email: "emma@brightledger.io",
    role: "Viewer",
    status: "suspended",
    lastActiveAt: "2026-05-02T13:20:00Z",
    createdAt: "2023-11-30T00:00:00Z",
  },
  {
    id: "usr_06",
    name: "Kenji Watanabe",
    email: "kenji@loopstack.ai",
    role: "Admin",
    status: "active",
    lastActiveAt: "2026-07-27T22:10:00Z",
    createdAt: "2024-02-19T00:00:00Z",
  },
];

export const mockInvoices: InvoiceRecord[] = [
  { id: "INV-2041", date: "2026-07-01", amount: 199, currency: "USD", status: "paid", paymentMethod: "Visa •••• 4242" },
  { id: "INV-2040", date: "2026-06-01", amount: 199, currency: "USD", status: "paid", paymentMethod: "Visa •••• 4242" },
  { id: "INV-2039", date: "2026-05-01", amount: 199, currency: "USD", status: "failed", paymentMethod: "Visa •••• 4242" },
  { id: "INV-2038", date: "2026-04-01", amount: 149, currency: "USD", status: "refunded", paymentMethod: "Mastercard •••• 8831" },
  { id: "INV-2037", date: "2026-03-01", amount: 149, currency: "USD", status: "pending", paymentMethod: "Mastercard •••• 8831" },
];

export const mockActivity: ActivityItem[] = [
  {
    id: "act_01",
    type: "invoice_paid",
    title: "Invoice paid",
    description: "Invoice INV-2041 for $199.00 was paid.",
    timestamp: "2026-07-29T09:12:00Z",
    actor: { name: "Sarah Chen" },
  },
  {
    id: "act_02",
    type: "user_joined",
    title: "New team member",
    description: "Priya Nair accepted the invite to join Fluxbase.",
    timestamp: "2026-07-28T14:22:00Z",
    actor: { name: "Priya Nair" },
  },
  {
    id: "act_03",
    type: "api_key_generated",
    title: "API key created",
    description: "A new production API key was generated.",
    timestamp: "2026-07-27T10:03:00Z",
    actor: { name: "Marcus Webb" },
  },
  {
    id: "act_04",
    type: "subscription_upgraded",
    title: "Subscription upgraded",
    description: "Workspace plan upgraded from Pro to Ultimate.",
    timestamp: "2026-07-25T16:47:00Z",
    actor: { name: "Sarah Chen" },
  },
  {
    id: "act_05",
    type: "project_created",
    title: "Project created",
    description: "Diego Alvarez created a new project: Cargo Analytics.",
    timestamp: "2026-07-24T08:31:00Z",
    actor: { name: "Diego Alvarez" },
  },
];

export const mockApiKeys: ApiKeyRecord[] = [
  {
    id: "key_01",
    name: "Production backend",
    maskedKey: "sk_live_••••••••••••4f2a",
    createdAt: "2025-11-02T00:00:00Z",
    lastUsedAt: "2026-07-29T08:14:00Z",
    permissions: ["read", "write"],
    status: "active",
  },
  {
    id: "key_02",
    name: "Analytics export",
    maskedKey: "sk_live_••••••••••••9b31",
    createdAt: "2026-02-18T00:00:00Z",
    lastUsedAt: "2026-07-20T15:02:00Z",
    permissions: ["read"],
    status: "active",
  },
  {
    id: "key_03",
    name: "Legacy staging key",
    maskedKey: "sk_test_••••••••••••1c07",
    createdAt: "2024-09-04T00:00:00Z",
    lastUsedAt: null,
    permissions: ["read", "write", "admin"],
    status: "revoked",
  },
];

export const mockOrganizations: OrganizationNode[] = [
  {
    id: "org_acme",
    name: "Acme Technologies",
    avatarInitials: "AT",
    workspaces: [
      { id: "ws_eng", name: "Engineering" },
      { id: "ws_mkt", name: "Marketing" },
      { id: "ws_design", name: "Design" },
    ],
  },
  {
    id: "org_fluxbase",
    name: "Fluxbase",
    avatarInitials: "FB",
    workspaces: [
      { id: "ws_core", name: "Core Product" },
      { id: "ws_infra", name: "Infrastructure" },
    ],
  },
];

export const mockPermissionMatrix: PermissionMatrixRow[] = [
  { feature: "View dashboard", roles: { Owner: true, Admin: true, Member: true, Viewer: true } },
  { feature: "Manage users", roles: { Owner: true, Admin: true, Member: false, Viewer: false } },
  { feature: "Billing", roles: { Owner: true, Admin: true, Member: false, Viewer: false } },
  { feature: "Manage API keys", roles: { Owner: true, Admin: true, Member: false, Viewer: false } },
  { feature: "Delete project", roles: { Owner: true, Admin: false, Member: false, Viewer: false } },
];

export const mockPaymentMethods: PaymentMethodInfo[] = [
  { id: "pm_01", brand: "visa", last4: "4242", expiryMonth: 8, expiryYear: 2027, isDefault: true },
  { id: "pm_02", brand: "mastercard", last4: "8831", expiryMonth: 3, expiryYear: 2026, isDefault: false },
];

export const mockPricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "For small teams getting started.",
    features: [
      { label: "Up to 5 team members", included: true },
      { label: "10,000 API requests / mo", included: true },
      { label: "Community support", included: true },
      { label: "Advanced analytics", included: false },
      { label: "SSO", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 79,
    yearlyPrice: 65,
    description: "For growing teams that need more headroom.",
    recommended: true,
    features: [
      { label: "Up to 25 team members", included: true },
      { label: "100,000 API requests / mo", included: true },
      { label: "Priority support", included: true },
      { label: "Advanced analytics", included: true },
      { label: "SSO", included: false },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    monthlyPrice: 199,
    yearlyPrice: 165,
    description: "For organizations that need enterprise controls.",
    features: [
      { label: "Unlimited team members", included: true },
      { label: "Unlimited API requests", included: true },
      { label: "Dedicated support", included: true },
      { label: "Advanced analytics", included: true },
      { label: "SSO", included: true },
    ],
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "ntf_01",
    type: "success",
    title: "Payment received",
    description: "Your payment of $199.00 was processed successfully.",
    timestamp: "2026-07-29T09:12:00Z",
    read: false,
    category: "Billing",
  },
  {
    id: "ntf_02",
    type: "warning",
    title: "Approaching usage limit",
    description: "You've used 84% of your monthly API request quota.",
    timestamp: "2026-07-28T12:00:00Z",
    read: false,
    category: "Usage",
  },
  {
    id: "ntf_03",
    type: "information",
    title: "New team member",
    description: "Priya Nair joined your workspace.",
    timestamp: "2026-07-27T09:40:00Z",
    read: true,
    category: "Team",
  },
  {
    id: "ntf_04",
    type: "error",
    title: "Payment failed",
    description: "We couldn't charge your card ending in 4242.",
    timestamp: "2026-05-01T09:00:00Z",
    read: true,
    category: "Billing",
  },
];
