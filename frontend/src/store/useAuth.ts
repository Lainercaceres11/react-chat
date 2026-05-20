import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import type { User } from "../interfaces/chat.interface";
import { type Socket, io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

type AuthStore = {
  authUser: User | null;
  isLoginUp: boolean;
  isSigningUp: boolean;
  isUpdateProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
  signup: (data: { fullname: string; email: string; password: string }) => void;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  updateProfile: (data: { profilePic: string }) => void;
  onlineUsers: string[];
  socket: Socket | null;
  connectedSocket: () => void;
  disconnectSocket: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isLoginUp: false,
  isSigningUp: false,
  isUpdateProfile: false,
  isCheckingAuth: true,

  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      if (response.status === 200) {
        set({ authUser: response.data, isCheckingAuth: false });
      }
      get().connectedSocket();
    } catch (error) {
      console.log(error);
      set({
        authUser: null,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("User created successfully");
      get().connectedSocket();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        // toast.error("Error creating user");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: { email: string; password: string }) => {
    set({ isLoginUp: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Login successful");
      get().connectedSocket();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoginUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
      get().disconnectSocket();
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (data: { profilePic: string }) => {
    set({ isUpdateProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    } finally {
      set({ isUpdateProfile: false });
    }
  },

  socket: null,
  connectedSocket: () => {
    const { authUser } = get();

    console.log(authUser);
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket });

    socket.on("getUserOnline", (usersId) => {
      set({ onlineUsers: usersId });
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
