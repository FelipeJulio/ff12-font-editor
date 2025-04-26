import type { Glyph } from "@/types/typings";

export function calculateNewNXNY(
  canvasRef: HTMLDivElement | null,
  glyphs: Glyph[]
): Glyph[] {
  if (!canvasRef) return glyphs;

  function escapeAttr(value: string) {
    return CSS.escape(value);
  }

  return glyphs.map((glyph) => {
    const block = canvasRef.querySelector(
      `[data-char="${escapeAttr(glyph.chara)}"][data-x="${glyph.x}"][data-y="${
        glyph.y
      }"]`
    ) as HTMLElement;

    if (!block) return glyph;

    const span = block.querySelector("span") as HTMLElement;
    if (!span) return glyph;

    const blockRect = block.getBoundingClientRect();
    const spanRect = span.getBoundingClientRect();

    const centerBlockX = blockRect.left + blockRect.width / 2;
    const centerBlockY = blockRect.top + blockRect.height / 2;

    const centerSpanX = spanRect.left + spanRect.width / 2;
    const centerSpanY = spanRect.top + spanRect.height / 2;

    const deltaX = centerBlockX - centerSpanX;
    const deltaY = centerBlockY - centerSpanY;

    return {
      ...glyph,
      nX: Math.round(span.offsetWidth + deltaX),
      nY: Math.round(glyph.nY + deltaY),
      unicode16leChar: glyph.unicode16leChar ?? glyph.u16 ?? null,
    };
  });
}
