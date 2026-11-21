import { FeedbackWidget } from "@/components/saas/communication/feedback-widget";

export default function Example() {
  return <FeedbackWidget onSubmit={(rating, comment) => console.log("feedback", rating, comment)} />;
}
