import { create } from "zustand";

type ThemeType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeType>((set) => ({
  theme: localStorage.getItem("theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
