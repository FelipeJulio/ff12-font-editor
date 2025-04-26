import type { Glyph, FontHeader } from "@/types/typings";

export async function parseAtlasDatFile(
  file: File
): Promise<{ header: FontHeader; glyphs: Glyph[] }> {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  const LE = true;

  const unk1 = view.getUint32(0, LE);
  const glyphCount = view.getUint32(4, LE);
  const width = view.getUint32(8, LE);
  const height = view.getUint32(12, LE);
  const defGlyphWidth = view.getUint32(16, LE);
  const defGlyphHeight = view.getUint32(20, LE);
  const scale = view.getFloat32(24, LE);
  const unk2 = view.getUint32(28, LE);
  const defKern = view.getUint32(32, LE);
  const unk3 = view.getUint32(36, LE);

  const header: FontHeader = {
    glyphCount,
    unk1,
    glyphs: glyphCount,
    width,
    height,
    defGlyphWidth,
    defGlyphHeight,
    scale,
    unk2,
    defKern,
    unk3,
  };

  const glyphs: Glyph[] = [];
  let offset = 40;
  const decoder = new TextDecoder();

  for (let i = 0; i < glyphCount; i++) {
    const num = view.getUint32(offset, LE);
    offset += 4;

    const utf8 = new Uint8Array(buffer, offset, 4);
    const chara = decoder
      .decode(utf8.slice(0, utf8.indexOf(0) === -1 ? 4 : utf8.indexOf(0)))
      .trim();
    offset += 4;

    const x = view.getUint32(offset, LE);
    offset += 4;
    const y = view.getUint32(offset, LE);
    offset += 4;
    const width = view.getUint32(offset, LE);
    offset += 4;
    const height = view.getUint32(offset, LE);
    offset += 4;
    const nextX = view.getUint32(offset, LE);
    offset += 4;
    const nextY = view.getUint32(offset, LE);
    offset += 4;
    const rawUnicode = view.getUint32(offset, LE);
    const unicode16leChar = rawUnicode === 0xffffffff ? null : rawUnicode;
    offset += 4;

    glyphs.push({
      num,
      chara,
      x,
      y,
      width,
      height,
      nX: nextX,
      nY: nextY,
      u16: unicode16leChar,
      nextX,
      nextY,
      unicode16leChar,
    });
  }

  return { header, glyphs };
}
