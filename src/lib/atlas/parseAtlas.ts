import type { Glyph, FontHeader } from "@/types/typings";

import { parseAtlasDatFile } from "@/lib/atlas/parseAtlasDatFile";
import { parseAtlasTxtFile } from "@/lib/atlas/parseAtlasTxtFile";

export async function parseAtlas(
  file: File
): Promise<{ header: FontHeader; glyphs: Glyph[] }> {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith(".dat")) {
    return await parseAtlasDatFile(file);
  } else if (fileName.endsWith(".txt")) {
    return await parseAtlasTxtFile(file);
  } else {
    throw new Error("Unsupported file type");
  }
}
