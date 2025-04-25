import type { Glyph, FontHeader } from "@/types/typings";

export async function parseTxtFile(
  file: File
): Promise<{ header: FontHeader; glyphs: Glyph[] }> {
  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const headerLine = lines.find((line) => line.startsWith("S:"));
  if (!headerLine) throw new Error("Header line not found in .txt file");

  const headerMatch = headerLine.match(
    /S:\s*(\d+),\s*glyphs:\s*(\d+),\s*w:\s*(\d+),\s*h:\s*(\d+),\s*dw:\s*(\d+),\s*dh:\s*(\d+),\s*scale:\s*([\d.]+),\s*s1:\s*(\d+),\s*dK:\s*(\d+),\s*s2:\s*(\d+)/
  );

  if (!headerMatch) throw new Error("Invalid header format in .txt");

  const glyphCount = parseInt(headerMatch[2], 10);

  const header: FontHeader = {
    glyphCount,
    unk1: parseInt(headerMatch[1], 10),
    glyphs: glyphCount,
    width: parseInt(headerMatch[3], 10),
    height: parseInt(headerMatch[4], 10),
    defGlyphWidth: parseInt(headerMatch[5], 10),
    defGlyphHeight: parseInt(headerMatch[6], 10),
    scale: parseFloat(headerMatch[7]),
    unk2: parseInt(headerMatch[8], 10),
    defKern: parseInt(headerMatch[9], 10),
    unk3: parseInt(headerMatch[10], 10),
  };

  const glyphLines = lines.filter((line) => line.startsWith("Num:"));

  const glyphs: Glyph[] = glyphLines.map((line) => {
    const match = line.match(
      /Num:\s*([0-9a-fA-F]+),\s*chara:\s*(.+?),\s*x:\s*(\d+),\s*y:\s*(\d+),\s*w:\s*(\d+),\s*h:\s*(\d+),\s*nX:\s*(\d+),\s*nY:\s*(\d+),\s*u16:\s*([0-9a-fA-F]+)/i
    );

    if (!match) throw new Error(`Invalid glyph line: ${line}`);

    const nX = parseInt(match[7], 10) || 0;
    const nY = parseInt(match[8], 10) || 0;
    const u16 = parseInt(match[9], 16);

    return {
      num: parseInt(match[1], 16),
      chara: match[2],
      x: parseInt(match[3], 10),
      y: parseInt(match[4], 10),
      width: parseInt(match[5], 10),
      height: parseInt(match[6], 10),
      nX,
      nY,
      u16,
      nextX: nX,
      nextY: nY,
      unicode16leChar: u16,
    };
  });

  return { header, glyphs };
}
