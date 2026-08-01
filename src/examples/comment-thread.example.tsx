import { CommentThread } from "@/components/free/comment-thread";

export default function Example() {
  return (
    <CommentThread
      comments={[
        {
          id: "c1",
          author: { name: "Sarah Chen" },
          content: "Should we move the launch date up a week?",
          timestamp: "2026-07-29T09:12:00Z",
          replies: [
            {
              id: "c1-r1",
              author: { name: "Marcus Webb" },
              content: "Works for me, QA should be done by then.",
              timestamp: "2026-07-29T10:02:00Z",
            },
          ],
        },
        {
          id: "c2",
          author: { name: "Priya Nair" },
          content: "Docs are updated and ready for review.",
          timestamp: "2026-07-28T16:40:00Z",
        },
      ]}
      onReply={(parentId, content) => console.log("reply", parentId, content)}
      onSubmit={(content) => console.log("new comment", content)}
    />
  );
}
