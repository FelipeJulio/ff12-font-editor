import { KerningPair } from "@/types/typings";

import { parseKerningKerFile } from "./parseKerningKerFile";
import { parseKerningTxtFile } from "./parseKerningTxtFile";

export async function parseKerningFile(file: File): Promise<KerningPair[]> {
  if (file.name.endsWith(".ker")) {
    return parseKerningKerFile(file);
  } else if (file.name.endsWith(".txt")) {
    return parseKerningTxtFile(file);
  } else {
    throw new Error("Unsupported kerning file format");
  }
}
