import type { Glyph, FontHeader, KerningPair } from "@/types/typings";

const GLYPHS_KEY = "ff12-text-helper:glyphs";
const HEADER_KEY = "ff12-text-helper:header";
const KERNING_KEY = "ff12-text-helper:kerning";

export function saveToLocalStorage(
  glyphs: Glyph[],
  header: FontHeader | null,
  kerning?: KerningPair[]
) {
  localStorage.setItem(GLYPHS_KEY, JSON.stringify(glyphs));
  if (header) {
    localStorage.setItem(HEADER_KEY, JSON.stringify(header));
  }
  if (kerning) {
    localStorage.setItem(KERNING_KEY, JSON.stringify(kerning));
  }
}

export function loadFromLocalStorage(): {
  glyphs: Glyph[];
  header: FontHeader | null;
  kerning: KerningPair[];
} {
  const glyphsRaw = localStorage.getItem(GLYPHS_KEY);
  const headerRaw = localStorage.getItem(HEADER_KEY);
  const kerningRaw = localStorage.getItem(KERNING_KEY);

  return {
    glyphs: glyphsRaw ? JSON.parse(glyphsRaw) : [],
    header: headerRaw ? JSON.parse(headerRaw) : null,
    kerning: kerningRaw ? JSON.parse(kerningRaw) : [],
  };
}

export function exportGlyphBackup(glyphs: Glyph[]) {
  const blob = new Blob([JSON.stringify(glyphs, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "glyph_backup.json";
  a.click();
}

export function exportKerningBackup(kerning: KerningPair[]) {
  const blob = new Blob([JSON.stringify(kerning, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kerning_backup.json";
  a.click();
}

export function importGlyphBackup(file: File): Promise<Glyph[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function importKerningBackup(file: File): Promise<KerningPair[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function clearEditorStorage(callback?: () => void) {
  localStorage.removeItem("ff12-text-helper:glyphs");
  localStorage.removeItem("ff12-text-helper:header");
  localStorage.removeItem("ff12-text-helper:kerning");

  if (callback) {
    callback();
  }
}
