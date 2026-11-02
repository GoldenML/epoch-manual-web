import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface AppState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchSeed: string;
  setSearchSeed: (seed: string) => void;
  openSearch: (seed?: string) => void;
}

export const applyTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [id, ...state.favorites],
        })),
      theme: "light",
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        applyTheme(next);
        set({ theme: next });
      },
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      searchSeed: "",
      setSearchSeed: (seed) => set({ searchSeed: seed }),
      openSearch: (seed = "") => set({ searchOpen: true, searchSeed: seed }),
    }),
    {
      name: "cmdbook-v1",
      partialize: (state) => ({ favorites: state.favorites, theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme);
      },
    },
  ),
);
