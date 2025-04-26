import type { Glyph, KerningPair } from "@/types/typings";

export function generateKerningPairs(
  glyphs: Glyph[],
  originalPairs: KerningPair[]
): KerningPair[] {
  const unicodeMap = new Map<number, Glyph>();
  glyphs.forEach((g) => {
    if (g.unicode16leChar !== null && g.unicode16leChar !== undefined) {
      unicodeMap.set(g.unicode16leChar, g);
    }
  });

  const updatedPairs: KerningPair[] = [];

  for (const pair of originalPairs) {
    const leftGlyph = unicodeMap.get(pair.leftCharCode);
    const rightGlyph = unicodeMap.get(pair.rightCharCode);

    if (!leftGlyph || !rightGlyph) {
      updatedPairs.push(pair);
      continue;
    }

    const leftAdvance = (leftGlyph.nX ?? 0) + (leftGlyph.width ?? 0);
    const rightAdvance = rightGlyph.nX ?? 0;

    const realSpacing = leftAdvance - rightAdvance;
    const newOffset = pair.xOffset - realSpacing;

    updatedPairs.push({
      leftCharCode: pair.leftCharCode,
      rightCharCode: pair.rightCharCode,
      xOffset: newOffset,
    });
  }

  return updatedPairs;
}
