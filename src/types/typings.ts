export type FontWeightOption =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type FontStyleOption = "Normal" | "Italic" | "Oblique";

export type TextAlignX = "left" | "center" | "right";
export type TextAlignY = "top" | "center" | "bottom";

export interface FontHeader {
  glyphCount: number;
  unk1: number;
  glyphs: number;
  width: number;
  height: number;
  defGlyphWidth: number;
  defGlyphHeight: number;
  scale: number;
  unk2: number;
  defKern: number;
  unk3: number;
}

export interface Glyph {
  num: number;
  chara: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nX: number;
  nY: number;
  u16: number;
  nextX: number;
  nextY: number;
  unicode16leChar: number;
}
