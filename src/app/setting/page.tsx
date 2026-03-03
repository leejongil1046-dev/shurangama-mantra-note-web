"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const TOTAL_PAGES = 12;
const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "하" },
  { value: "medium", label: "중" },
  { value: "hard", label: "상" },
] as const;

export default function SettingPage() {
  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(12);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );

  return (
    <div className="flex flex-1 flex-col justify-between mx-auto w-[1000px] px-6 py-10">
      <div className="space-y-15 pt-5">
        {/* 페이지 선택 */}
        <section className="flex items-start justify-between gap-50">
          <div className="min-w-[140px] space-y-1 pt-1">
            <h2 className="text-2xl font-medium text-gray-800">페이지 선택</h2>
            <p className="text-md text-gray-500">
              1~12페이지 중 연속된 구간을 선택합니다.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-center justify-between text-md text-gray-500 pt-1">
              <span>
                선택 범위: {pageStart}페이지 ~ {pageEnd}페이지
              </span>
              <span>전체: 1 ~ {TOTAL_PAGES}</span>
            </div>

            <div className="px-1">
              <Slider
                range
                min={1}
                max={TOTAL_PAGES}
                value={[pageStart, pageEnd]}
                onChange={(value) => {
                  if (!Array.isArray(value)) return;
                  const [start, end] = value;
                  setPageStart(start);
                  setPageEnd(end);
                }}
                allowCross={false}
                step={1}
                trackStyle={[{ backgroundColor: "#50535b", height: 6 }]}
                railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
                handleStyle={[
                  {
                    borderColor: "#111827",
                    backgroundColor: "#ffffff",
                    width: 16,
                    height: 16,
                    marginTop: -5,
                  },
                  {
                    borderColor: "#111827",
                    backgroundColor: "#ffffff",
                    width: 16,
                    height: 16,
                    marginTop: -5,
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 난이도 */}
        <section className="flex items-center justify-between gap-8">
          <div className="min-w-[140px] space-y-1">
            <h2 className="text-2xl font-medium text-gray-800">난이도</h2>
            <p className="text-md text-gray-500">
              빈칸 개수(비율)에 따른 난이도를 선택합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {DIFFICULTY_OPTIONS.map((opt) => {
              const isActive = difficulty === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDifficulty(opt.value)}
                  className={`flex h-10 w-16 items-center justify-center rounded-md border text-sm transition-colors ${
                    isActive
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="rounded-md bg-gray-900 px-6 py-3 text-lg text-white hover:bg-gray-800"
        >
          저장
        </button>
      </div>
    </div>
  );
}
