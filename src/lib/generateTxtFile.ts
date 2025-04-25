import type { Glyph, FontHeader } from "@/types/typings";

export function generateTxtFile(header: FontHeader, glyphs: Glyph[]): string {
  const headerLine = `S: ${header.unk1}, glyphs: ${header.glyphs}, w: ${header.width}, h: ${header.height}, dw: ${header.defGlyphWidth}, dh: ${header.defGlyphHeight}, scale: ${header.scale}, s1: ${header.unk2}, dK: ${header.defKern}, s2: ${header.unk3}`;

  const glyphLines = glyphs
    .map((g) => {
      const hex = g.num.toString(16).padStart(8, "0");
      return `Num: ${hex}, chara: ${g.chara}, x: ${g.x}, y: ${g.y}, w: ${
        g.width
      }, h: ${g.height}, nX: ${g.nX}, nY: ${g.nY}, u16: ${g.u16
        .toString(16)
        .padStart(8, "0")}`;
    })
    .join("\n");

  return `${headerLine}\n${glyphLines}`;
}
