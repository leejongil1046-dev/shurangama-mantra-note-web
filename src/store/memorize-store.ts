import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BlankByPageState = Record<number, number[]>;

type AnswersByPageState = Record<number, Record<number, string>>;

type MemorizeState = {
  isActive: boolean;
  blankByPage: BlankByPageState;
  answersByPage: AnswersByPageState;
  lastPageIndex: number;
  startSession: (params: {
    blankByPage: BlankByPageState;
    initialPageIndex: number;
  }) => void;
  setAnswer: (pageIndex: number, charIndex: number, value: string) => void;
  setLastPageIndex: (index: number) => void;
  resetSession: () => void;
};

export const useMemorizeStore = create<MemorizeState>()(
  persist(
    (set) => ({
      isActive: false,
      blankByPage: {},
      answersByPage: {},
      lastPageIndex: 0,
      startSession: ({ blankByPage, initialPageIndex }) =>
        set({
          isActive: true,
          blankByPage,
          answersByPage: {},
          lastPageIndex: initialPageIndex,
        }),
      setAnswer: (pageIndex, charIndex, value) =>
        set((state) => ({
          answersByPage: {
            ...state.answersByPage,
            [pageIndex]: {
              ...(state.answersByPage[pageIndex] ?? {}),
              [charIndex]: value,
            },
          },
        })),
      setLastPageIndex: (index) => set({ lastPageIndex: index }),
      resetSession: () =>
        set({
          isActive: false,
          blankByPage: {},
          answersByPage: {},
          lastPageIndex: 0,
        }),
    }),
    {
      name: "memorize-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

