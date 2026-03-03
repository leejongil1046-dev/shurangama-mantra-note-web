"use client";

import { useState, useMemo } from "react";
import MantraTextView from "@/component/mantra-text-view";
import ToggleSwitch from "@/component/toggle-switch";
import { SHURANGAMA_MANTRA_PAGES } from "@/data/shurangama-mantra";
import { createBlankIndices } from "@/lib/blanks";
import { usePagination } from "@/hooks/use-pagination";
import { useSettingStore } from "@/store/setting-store";

type BlankByPage = Record<number, Set<number>>;

const difficultyToRatio = {
  easy: 0.1,
  medium: 0.3,
  hard: 0.5,
} as const;

export default function PracticePage() {
  const { pageStart, pageEnd, difficulty } = useSettingStore();
  const ratio = difficultyToRatio[difficulty];

  const selectedPages = useMemo(
    () => SHURANGAMA_MANTRA_PAGES.slice(pageStart - 1, pageEnd),
    [pageStart, pageEnd],
  );

  const [showBlanks, setShowBlanks] = useState(false);
  const [blankByPage, setBlankByPage] = useState<BlankByPage>({});

  const {
    currentIndex,
    currentItem: currentPage,
    total,
    isFirst,
    isLast,
    goPrev,
    goNext,
  } = usePagination({
    items: selectedPages,
  });

  const currentBlankIndices = blankByPage[currentIndex] ?? new Set<number>();

  const handleToggleBlanks = (nextChecked: boolean) => {
    if (nextChecked && Object.keys(blankByPage).length === 0) {
      const nextBlankByPage: BlankByPage = {};

      selectedPages.forEach((page, index) => {
        nextBlankByPage[index] = createBlankIndices(page.mantra, ratio);
      });

      setBlankByPage(nextBlankByPage);
    }

    setShowBlanks(nextChecked);
  };

  if (!currentPage) return null;

  return (
    <div className="mx-auto h-full w-[1000px]">
      <section className="flex h-full min-w-0 flex-col overflow-hidden pb-5">
        <div className="flex items-center justify-between p-4">
          <ToggleSwitch
            label="빈칸"
            checked={showBlanks}
            onChange={handleToggleBlanks}
          />

          <div className="flex w-[200px] items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirst}
              className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
            >
              이전
            </button>
            <p className="text-md text-gray-600">
              {currentPage.pageNumber} / {total}
            </p>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
            >
              다음
            </button>
          </div>
        </div>

        <div
          className="min-h-0 flex-1 overflow-auto rounded border border-gray-200 p-4"
          style={{ backgroundAttachment: "local" }}
        >
          <div className="min-w-[800px] ">
            {showBlanks ? (
              <MantraTextView
                mantra={currentPage.mantra}
                blankIndices={currentBlankIndices}
              />
            ) : (
              <MantraTextView mantra={currentPage.mantra} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
