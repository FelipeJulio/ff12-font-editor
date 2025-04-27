import type {
  Glyph,
  FontHeader,
  KerningPair,
  EditorSettings,
} from "@/types/typings";

const GLYPHS_KEY = "ff12-text-helper:glyphs";
const HEADER_KEY = "ff12-text-helper:header";
const KERNING_KEY = "ff12-text-helper:kerning";
const SETTINGS_KEY = "ff12-text-helper:settings";

export function saveToLocalStorage(
  glyphs: Glyph[],
  header: FontHeader | null,
  kerning?: KerningPair[],
  settings?: EditorSettings
) {
  localStorage.setItem(GLYPHS_KEY, JSON.stringify(glyphs));
  if (header) localStorage.setItem(HEADER_KEY, JSON.stringify(header));
  if (kerning) localStorage.setItem(KERNING_KEY, JSON.stringify(kerning));
  if (settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadFromLocalStorage(): {
  glyphs: Glyph[];
  header: FontHeader | null;
  kerning: KerningPair[];
  settings: EditorSettings | null;
} {
  const glyphsRaw = localStorage.getItem(GLYPHS_KEY);
  const headerRaw = localStorage.getItem(HEADER_KEY);
  const kerningRaw = localStorage.getItem(KERNING_KEY);
  const settingsRaw = localStorage.getItem(SETTINGS_KEY);

  return {
    glyphs: glyphsRaw ? JSON.parse(glyphsRaw) : [],
    header: headerRaw ? JSON.parse(headerRaw) : null,
    kerning: kerningRaw ? JSON.parse(kerningRaw) : [],
    settings: settingsRaw ? JSON.parse(settingsRaw) : null,
  };
}

export function exportGlyphBackup(
  glyphs: Glyph[],
  header: FontHeader | null,
  kerning: KerningPair[],
  settings: EditorSettings
) {
  const data = {
    glyphs,
    header,
    kerning,
    settings,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const now = Date.now();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `backup_ff12_text_helper_${now}.json`;
  a.click();
}

export function importGlyphBackup(file: File): Promise<{
  glyphs: Glyph[];
  header: FontHeader | null;
  kerning: KerningPair[];
  settings: EditorSettings;
}> {
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
  localStorage.removeItem("ff12-text-helper:settings");

  if (callback) {
    callback();
  }
}
