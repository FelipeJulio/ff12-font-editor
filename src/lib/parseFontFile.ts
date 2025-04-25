import type { Glyph, FontHeader } from "@/types/typings";

import { parseDatFile } from "@/lib/parseDatFile";
import { parseTxtFile } from "@/lib/parseTxtFile";

export async function parseFontFile(
  file: File
): Promise<{ header: FontHeader; glyphs: Glyph[] }> {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith(".dat")) {
    return await parseDatFile(file);
  } else if (fileName.endsWith(".txt")) {
    return await parseTxtFile(file);
  } else {
    throw new Error("Unsupported file type");
  }
}
