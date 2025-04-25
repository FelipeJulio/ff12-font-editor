import type { Glyph, FontHeader } from "@/types/typings";

const GLYPHS_KEY = "ff12-text-helper:glyphs";
const HEADER_KEY = "ff12-text-helper:header";

export function saveToLocalStorage(glyphs: Glyph[], header: FontHeader | null) {
  localStorage.setItem(GLYPHS_KEY, JSON.stringify(glyphs));
  if (header) {
    localStorage.setItem(HEADER_KEY, JSON.stringify(header));
  }
}

export function loadFromLocalStorage(): {
  glyphs: Glyph[];
  header: FontHeader | null;
} {
  const glyphsRaw = localStorage.getItem(GLYPHS_KEY);
  const headerRaw = localStorage.getItem(HEADER_KEY);
  return {
    glyphs: glyphsRaw ? JSON.parse(glyphsRaw) : [],
    header: headerRaw ? JSON.parse(headerRaw) : null,
  };
}

// Exporta só os glyphs como JSON
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
