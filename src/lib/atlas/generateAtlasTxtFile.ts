import type { Glyph, FontHeader } from "@/types/typings";

export function generateAtlasTxtFile(
  header: FontHeader,
  glyphs: Glyph[]
): string {
  const headerLine = `S: ${header.unk1}, glyphs: ${header.glyphs}, w: ${header.width}, h: ${header.height}, dw: ${header.defGlyphWidth}, dh: ${header.defGlyphHeight}, scale: ${header.scale}, s1: ${header.unk2}, dK: ${header.defKern}, s2: ${header.unk3}`;

  const glyphLines = glyphs
    .map((g) => {
      const hex = g.num.toString(16).padStart(8, "0");
      const u16hex =
        g.u16 !== null && g.u16 !== undefined
          ? g.u16.toString(16).padStart(8, "0")
          : "ffffffff";
      return `Num: ${hex}, chara: ${g.chara}, x: ${g.x}, y: ${g.y}, w: ${g.width}, h: ${g.height}, nX: ${g.nX}, nY: ${g.nY}, u16: ${u16hex}`;
    })
    .join("\n");

  return `${headerLine}\n${glyphLines}`;
}
