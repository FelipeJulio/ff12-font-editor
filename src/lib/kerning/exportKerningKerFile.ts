import type { KerningPair } from "@/types/typings";

export function exportKerningKerFile(pairs: KerningPair[]) {
  const buffer = new ArrayBuffer(pairs.length * 12);
  const view = new DataView(buffer);

  pairs.forEach((pair, i) => {
    const offset = i * 12;
    view.setUint32(offset, pair.leftCharCode, true);
    view.setUint32(offset + 4, pair.rightCharCode, true);
    view.setInt32(offset + 8, pair.xOffset, true);
  });

  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "exported_kerning.ker";
  a.click();
}
