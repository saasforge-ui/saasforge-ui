import * as React from "react";
import { Inbox, MessageSquare, Settings as SettingsIcon, Video } from "lucide-react";
import { VerticalNavSidebar } from "@/components/saas/navigation/vertical-nav-sidebar";
import { SupportInboxList } from "@/components/saas/communication/support-inbox-list";
import { ChatChannelSidebar } from "@/components/saas/communication/chat-channel-sidebar";
import { MessageBubbleList } from "@/components/saas/communication/message-bubble-list";
import { TypingIndicator } from "@/components/saas/communication/typing-indicator";
import { ChatWidget } from "@/components/saas/communication/chat-widget";
import { MentionAutocompleteInput, type MentionableUser } from "@/components/saas/communication/mention-autocomplete-input";
import { CommentThread } from "@/components/saas/communication/comment-thread";
import { VideoCallCard } from "@/components/saas/communication/video-call-card";
import type { ChatChannel, ChatMessage, CommentItem, SupportConversation } from "@/types";

const CURRENT_USER_ID = "agent_sarah";

const mockConversations: SupportConversation[] = [
  { id: "conv_01", customerName: "Diego Alvarez", lastMessage: "Still seeing the sync error on checkout.", timestamp: "2026-08-17T13:40:00Z", unreadCount: 2, status: "open" },
  { id: "conv_02", customerName: "Priya Nair", lastMessage: "Thanks, that solved it!", timestamp: "2026-08-17T12:05:00Z", status: "pending" },
  { id: "conv_03", customerName: "Emma Thorne", lastMessage: "Can you extend our trial by a week?", timestamp: "2026-08-16T18:22:00Z", unreadCount: 1, status: "open" },
  { id: "conv_04", customerName: "Kenji Watanabe", lastMessage: "Closing this out, all good now.", timestamp: "2026-08-15T09:10:00Z", status: "closed" },
];

const mockChannels: ChatChannel[] = [
  { id: "ch_general", name: "general", unreadCount: 3 },
  { id: "ch_support", name: "support-team" },
  { id: "ch_escalations", name: "escalations", unreadCount: 1, isPrivate: true },
];

const mockThreadMessages: ChatMessage[] = [
  { id: "msg_01", senderId: "conv_01", senderName: "Diego Alvarez", content: "Hey, I'm still seeing a sync error when I try to check out.", timestamp: "2026-08-17T13:31:00Z" },
  { id: "msg_02", senderId: CURRENT_USER_ID, senderName: "Sarah Chen", content: "Thanks for flagging — can you tell me which browser you're using?", timestamp: "2026-08-17T13:33:00Z" },
  { id: "msg_03", senderId: "conv_01", senderName: "Diego Alvarez", content: "Chrome on macOS, latest version.", timestamp: "2026-08-17T13:36:00Z" },
  { id: "msg_04", senderId: "conv_01", senderName: "Diego Alvarez", content: "Still seeing the sync error on checkout.", timestamp: "2026-08-17T13:40:00Z" },
];

const mockTeamMessages: ChatMessage[] = [
  { id: "team_01", senderId: "usr_marcus", senderName: "Marcus Webb", content: "Anyone else seeing checkout sync errors today?", timestamp: "2026-08-17T13:20:00Z" },
  { id: "team_02", senderId: CURRENT_USER_ID, senderName: "Sarah Chen", content: "Yep, looking into it now with Diego's ticket.", timestamp: "2026-08-17T13:22:00Z" },
];

const mockComments: CommentItem[] = [
  {
    id: "cmt_01",
    author: { name: "Marcus Webb" },
    content: "Looks like this might be related to the payment gateway timeout from this morning's deploy.",
    timestamp: "2026-08-17T13:45:00Z",
    replies: [
      { id: "cmt_01_r1", author: { name: "Sarah Chen" }, content: "Good catch, checking the deploy log now.", timestamp: "2026-08-17T13:47:00Z" },
    ],
  },
  {
    id: "cmt_02",
    author: { name: "Kenji Watanabe" },
    content: "I can roll back the gateway config if needed, just say the word.",
    timestamp: "2026-08-17T13:50:00Z",
  },
];

const mentionableUsers: MentionableUser[] = [
  { id: "usr_marcus", name: "Marcus Webb" },
  { id: "usr_kenji", name: "Kenji Watanabe" },
  { id: "usr_priya", name: "Priya Nair" },
];

/**
 * Support / Inbox Page — a full-page template composed entirely from
 * existing SaaSForge UI Pro components. Vertical Nav Sidebar provides the
 * page chrome; a three-pane inbox layout follows: Support Inbox List and
 * Chat Channel Sidebar on the left, Message Bubble List with a Typing
 * Indicator and Mention Autocomplete reply box in the center, and a Comment
 * Thread plus Video Call Card as the right-side detail panel. A Chat Widget
 * floats in the corner for quick internal team chat.
 */
export default function SupportInboxPageTemplate() {
  const [activeNavId, setActiveNavId] = React.useState("inbox");
  const [selectedConversationId, setSelectedConversationId] = React.useState(mockConversations[0].id);
  const [activeChannelId, setActiveChannelId] = React.useState(mockChannels[0].id);
  const [isTeamChatOpen, setIsTeamChatOpen] = React.useState(false);

  const selectedConversation = mockConversations.find((c) => c.id === selectedConversationId);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r border-border p-4 lg:block">
        <VerticalNavSidebar
          activeId={activeNavId}
          onNavigate={setActiveNavId}
          sections={[
            {
              items: [
                { id: "inbox", label: "Inbox", icon: Inbox },
                { id: "team-chat", label: "Team chat", icon: MessageSquare },
              ],
            },
            {
              title: "Workspace",
              items: [{ id: "settings", label: "Settings", icon: SettingsIcon }],
            },
          ]}
        />
      </aside>

      <div className="grid min-w-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        <div className="space-y-6 border-r border-border p-4">
          <div className="space-y-2">
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Support inbox</h2>
            <SupportInboxList
              conversations={mockConversations}
              selectedId={selectedConversationId}
              onSelect={setSelectedConversationId}
              className="max-w-none"
            />
          </div>
          <div className="space-y-2">
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Team channels</h2>
            <ChatChannelSidebar
              channels={mockChannels}
              activeChannelId={activeChannelId}
              onSelectChannel={setActiveChannelId}
              onCreateChannel={() => console.log("create channel")}
              className="max-w-none"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
            <div>
              <h1 className="text-sm font-semibold">{selectedConversation?.customerName ?? "Conversation"}</h1>
              <p className="text-xs text-muted-foreground">{selectedConversation?.status === "open" ? "Open" : selectedConversation?.status}</p>
            </div>
          </header>
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            <MessageBubbleList messages={mockThreadMessages} currentUserId={CURRENT_USER_ID} className="max-w-none" />
            <TypingIndicator users={["Diego Alvarez"]} />
          </div>
          <div className="border-t border-border p-4">
            <MentionAutocompleteInput
              users={mentionableUsers}
              placeholder="Reply, or use @ to loop in a teammate..."
              onSubmit={(content, mentioned) => console.log("reply sent", content, mentioned)}
              className="max-w-none"
            />
          </div>
        </div>

        <div className="space-y-6 border-t border-border p-4 lg:border-t-0 lg:border-l">
          <div className="space-y-2">
            <h2 className="flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Video className="h-3.5 w-3.5" /> Start a call
            </h2>
            <VideoCallCard
              participants={[
                { id: CURRENT_USER_ID, name: "Sarah Chen" },
                { id: "conv_01", name: "Diego Alvarez", isCameraOff: true },
              ]}
              onToggleMute={() => console.log("toggle mute")}
              onToggleCamera={() => console.log("toggle camera")}
              onLeave={() => console.log("leave call")}
              className="max-w-none"
            />
          </div>
          <div className="space-y-2">
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Internal notes</h2>
            <CommentThread
              comments={mockComments}
              onReply={(parentId, content) => console.log("reply", parentId, content)}
              onSubmit={(content) => console.log("new note", content)}
              className="max-w-none"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <ChatWidget
          open={isTeamChatOpen}
          onOpenChange={setIsTeamChatOpen}
          messages={mockTeamMessages}
          currentUserId={CURRENT_USER_ID}
          onSend={(content) => console.log("team chat message", content)}
          title="Team chat"
        />
      </div>
    </div>
  );
}
