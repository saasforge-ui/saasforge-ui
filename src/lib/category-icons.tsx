import {
  BarChart3,
  Bot,
  Bell,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogIn,
  Megaphone,
  MessageSquare,
  Settings,
  ShoppingCart,
  Table2,
  Users,
  Compass,
  Wrench,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentCategory } from "@/types";

export const categoryIcons: Record<ComponentCategory, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Users: Users,
  Billing: CreditCard,
  Analytics: BarChart3,
  Settings: Settings,
  Utilities: Wrench,
  Auth: LogIn,
  Marketing: Megaphone,
  Ecommerce: ShoppingCart,
  Communication: MessageSquare,
  Data: Table2,
  Navigation: Compass,
  Forms: ClipboardList,
  Notifications: Bell,
  AI: Bot,
  Developer: Terminal,
};
