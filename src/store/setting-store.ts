import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Difficulty = "easy" | "medium" | "hard";

type SettingState = {
  pageStart: number;
  pageEnd: number;
  difficulty: Difficulty;
  setPageRange: (start: number, end: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
};

const TOTAL_PAGES = 12;

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      pageStart: 1,
      pageEnd: TOTAL_PAGES,
      difficulty: "easy",
      setPageRange: (start, end) => {
        const normalizedStart = Math.max(1, Math.min(start, TOTAL_PAGES));
        const normalizedEnd = Math.max(
          normalizedStart,
          Math.min(end, TOTAL_PAGES),
        );
        set({ pageStart: normalizedStart, pageEnd: normalizedEnd });
      },
      setDifficulty: (difficulty) => set({ difficulty }),
    }),
    {
      name: "setting-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
