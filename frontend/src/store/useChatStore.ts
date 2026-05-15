import { create } from "zustand";
import type { Message, User } from "../interfaces/chat.interface";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuth";

type ChatType = {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;
  getUsers: () => void;
  getMessages: (userId: string) => void;
  sendMessage: (message: { text: string; image: string }) => void;
  setSelectedUser: (user: User | null) => void;
  subcribeToNewMessages: () => void;
  unsuscribeToNewMessages: () => void;
};

export const useChatStore = create<ChatType>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      const data = response.data;
      set({ users: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId: string) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      const data = response.data;
      set({ messages: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData: { text: string; image: string }) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData,
      );
      const data = response.data;
      set({ messages: [...messages, data] });
    } catch (error) {
      console.log(error);
      toast.error("Error sending message");
    }
  },
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
  subcribeToNewMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (socket) {
      socket.on("newMessage", (message) => {
        if(message.senderId != selectedUser._id) return
        set({ messages: [...get().messages, message] });
      });
    }
  },
  unsuscribeToNewMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },
}));
