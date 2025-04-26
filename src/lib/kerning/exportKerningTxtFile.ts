import type { KerningPair } from "@/types/typings";

export function exportKerningTxtFile(pairs: KerningPair[]) {
  const lines = pairs.map((pair) => {
    return `${pair.leftCharCode
      .toString(16)
      .padStart(4, "0")} ${pair.rightCharCode.toString(16).padStart(4, "0")} ${
      pair.xOffset
    }`;
  });

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "exported_kerning.txt";
  a.click();
}
