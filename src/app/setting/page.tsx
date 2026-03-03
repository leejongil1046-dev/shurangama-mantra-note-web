"use client";

import PageRangeSetting from "@/component/page-range-setting";
import DifficultySetting from "@/component/difficulty-setting";
import { useSettingStore } from "@/store/setting-store";
import { useState } from "react";

export default function SettingPage() {
  const { pageStart, pageEnd, difficulty, setPageRange, setDifficulty } =
    useSettingStore();

  const [tempRange, setTempRange] = useState<[number, number]>([
    pageStart,
    pageEnd,
  ]);
  const [tempDifficulty, setTempDifficulty] = useState(difficulty);

  return (
    <div className="flex flex-1 flex-col justify-between mx-auto w-[1000px] px-6 py-10">
      <div className="space-y-15 pt-5">
        <PageRangeSetting
          totalPages={12}
          value={tempRange}
          onChange={setTempRange}
        />

        <DifficultySetting
          value={tempDifficulty}
          onChange={setTempDifficulty}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={() => {
            const [start, end] = tempRange;
            setPageRange(start, end);
            setDifficulty(tempDifficulty);
          }}
          className="rounded-md bg-gray-900 px-6 py-3 text-lg text-white hover:bg-gray-800"
        >
          저장
        </button>
      </div>
    </div>
  );
}
