"use client";

import { useState } from "react";
import MantraTextView from "../component/mantra-text-view";
import {
  SHURANGAMA_MANTRA_PAGE_1,
  SHURANGAMA_MANTRA_PAGE_12,
} from "../data/shurangama-mantra";
import { createBlankIndices } from "@/lib/blanks";

export default function Home() {
  const [blankIndices, setBlankIndices] = useState(new Set<number>());
  const [showBlanks, setShowBlanks] = useState(false);

  const handleCreateBlanks = () => {
    setBlankIndices(createBlankIndices(SHURANGAMA_MANTRA_PAGE_1));
    setShowBlanks(true);
  };

  const handleShowOriginal = () => {
    setShowBlanks(false);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start font-sans dark:bg-black">
      <div className="flex flex-row gap-3">
        <button onClick={handleCreateBlanks}>빈칸 만들기</button>
        <button onClick={handleShowOriginal}>원문 보기</button>
      </div>
      <div className="flex">
        {showBlanks ? (
          <MantraTextView
            mantra={SHURANGAMA_MANTRA_PAGE_1}
            blankIndices={blankIndices}
          />
        ) : (
          <MantraTextView mantra={SHURANGAMA_MANTRA_PAGE_1} />
        )}
      </div>
    </div>
  );
}
