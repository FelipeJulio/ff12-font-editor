import type { Glyph, FontHeader } from "@/types/typings";

export function generateDatBuffer(
  header: FontHeader,
  glyphs: Glyph[]
): ArrayBuffer {
  const LE = true;

  const glyphCount = glyphs?.length;
  const totalSize = 40 + glyphCount * 36;
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const encoder = new TextEncoder();

  // Write header
  view.setUint32(0, header.unk1, LE);
  view.setUint32(4, glyphCount, LE);
  view.setUint32(8, header.width, LE);
  view.setUint32(12, header.height, LE);
  view.setUint32(16, header.defGlyphWidth, LE);
  view.setUint32(20, header.defGlyphHeight, LE);
  view.setFloat32(24, header.scale, LE);
  view.setUint32(28, header.unk2, LE);
  view.setUint32(32, header.defKern, LE);
  view.setUint32(36, header.unk3, LE);

  let offset = 40;
  for (const glyph of glyphs) {
    view.setUint32(offset, glyph.num, LE);
    offset += 4;

    const encoded = encoder.encode(glyph.chara.padEnd(4, "\0"));
    for (let i = 0; i < 4; i++) {
      view.setUint8(offset + i, encoded[i] ?? 0);
    }
    offset += 4;

    view.setUint32(offset, glyph.x, LE);
    offset += 4;
    view.setUint32(offset, glyph.y, LE);
    offset += 4;
    view.setUint32(offset, glyph.width, LE);
    offset += 4;
    view.setUint32(offset, glyph.height, LE);
    offset += 4;
    view.setUint32(offset, glyph.nX, LE);
    offset += 4;
    view.setUint32(offset, glyph.nY, LE);
    offset += 4;
    view.setUint32(offset, glyph.u16 ?? 0xffffffff, LE);
    offset += 4;
  }

  return buffer;
}
