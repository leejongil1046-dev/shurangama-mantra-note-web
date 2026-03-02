import { getFullText } from "@/lib/mantra-format";
import type { Mantra } from "@/types/mantra";

export function createBlankIndices(mantra: Mantra): Set<number> {
  const fullText = getFullText(mantra);
  const chars = fullText.split("");

  const canBlank = chars
    .map((char, index) => ({ char, index }))
    .filter(({ char }) => char !== " " && char !== "\n");

  const count = Math.max(1, Math.floor(canBlank.length * 0.2));
  const shuffled = [...canBlank].sort(() => Math.random() - 0.5);

  return new Set(shuffled.slice(0, count).map((item) => item.index));
}
