import type { KerningPair } from "@/types/typings";

export async function parseKerningKerFile(file: File): Promise<KerningPair[]> {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  const entries: KerningPair[] = [];
  const totalEntries = Math.floor(buffer.byteLength / 12);

  for (let i = 0; i < totalEntries; i++) {
    const xOffset = i * 12;
    const leftCharCode = view.getUint32(xOffset, true);
    const rightCharCode = view.getUint32(xOffset + 4, true);
    const kerning = view.getInt32(xOffset + 8, true);

    entries.push({ leftCharCode, rightCharCode, xOffset: kerning });
  }

  return entries;
}
