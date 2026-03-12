import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GradeResult } from "@/lib/grade-test";

export type BlankByPageState = Record<number, number[]>;

type AnswersByPageState = Record<number, Record<number, string>>;

type TestState = {
  isActive: boolean;
  blankByPage: BlankByPageState;
  answersByPage: AnswersByPageState;
  lastPageIndex: number;
  gradeResult: GradeResult | null;
  startSession: (params: {
    blankByPage: BlankByPageState;
    initialPageIndex: number;
  }) => void;
  setAnswer: (pageIndex: number, charIndex: number, value: string) => void;
  setLastPageIndex: (index: number) => void;
  setGradeResult: (result: GradeResult | null) => void;
  resetSession: () => void;
};

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      isActive: false,
      blankByPage: {},
      answersByPage: {},
      lastPageIndex: 0,
      gradeResult: null,
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
      setGradeResult: (result) => set({ gradeResult: result }),
      resetSession: () =>
        set({
          isActive: false,
          blankByPage: {},
          answersByPage: {},
          lastPageIndex: 0,
          gradeResult: null,
        }),
    }),
    {
      name: "test-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
