import * as React from "react";
import { NotificationsCenter } from "@/components/saas/utilities/notifications-center";
import { mockNotifications } from "@/data/mock-data";

export default function Example() {
  const [notifications, setNotifications] = React.useState(mockNotifications);

  return (
    <NotificationsCenter
      notifications={notifications}
      onMarkAsRead={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
      onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      onDelete={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
    />
  );
}
