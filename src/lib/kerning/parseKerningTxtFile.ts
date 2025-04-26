import type { KerningPair } from "@/types/typings";

export async function parseKerningTxtFile(file: File): Promise<KerningPair[]> {
  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const entries: KerningPair[] = [];

  for (const line of lines) {
    const [leftHex, rightHex, offsetStr] = line.split(/\s+/);
    if (!leftHex || !rightHex || !offsetStr) continue;

    entries.push({
      leftCharCode: parseInt(leftHex, 16),
      rightCharCode: parseInt(rightHex, 16),
      xOffset: parseInt(offsetStr, 10),
    });
  }

  return entries;
}
