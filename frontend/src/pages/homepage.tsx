import { ChatContainer, NotChatSelected, Sidebar } from "../components";
import { useChatStore } from "../store/useChatStore";

export function Homepage() {
  const { selectedUser } = useChatStore();
  return (
    <section className="h-screen bg-base-200">
      <div className="pt-20 px-4 flex justify-center items-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {selectedUser ? <ChatContainer /> : <NotChatSelected />}
          </div>
        </div>
      </div>
    </section>
  );
}
