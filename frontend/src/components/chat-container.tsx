import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuth";

import { MessageSkeleton } from "./skeletons/message-skeleton";
import { ChatHeader } from "./chat-header";
import { MessageInput } from "./message-input";
import { formatMessageTime } from "../utils/utils";

export const ChatContainer = () => {
  const {
    selectedUser,
    getMessages,
    isMessageLoading,
    messages,
    subcribeToNewMessages,
    unsuscribeToNewMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessages(selectedUser!._id);
    subcribeToNewMessages();

    return () => unsuscribeToNewMessages();
  }, [
    getMessages,
    selectedUser,
    subcribeToNewMessages,
    unsuscribeToNewMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  if (!selectedUser) return <div>User not found</div>;
  if (!messages) return <div>Messages not found</div>;
  if (!authUser) return <div>User not found</div>;

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-50 rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};
