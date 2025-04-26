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
export interface Glyph {
  num: number;
  chara: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nX: number;
  nY: number;
  u16: number | null;
  nextX: number;
  nextY: number;
  unicode16leChar: number | null;
}
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
export interface KerningPair {
  leftCharCode: number;
  rightCharCode: number;
  xOffset: number;
}
export interface ToolbarProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onAtlasUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKerningUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFontUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBackupUpload: (glyphs: Glyph[]) => void;
  header: FontHeader | null;
  glyphs: Glyph[];
  kerning: KerningPair[];
  fontSize: string;
  setFontSize: (val: string) => void;
  fontWeight: FontWeightOption;
  setFontWeight: (val: FontWeightOption) => void;
  fontStyle: FontStyleOption;
  setFontStyle: (val: FontStyleOption) => void;
  fontColor: string;
  setFontColor: (val: string) => void;
  alignX: TextAlignX;
  setAlignX: (val: TextAlignX) => void;
  alignY: TextAlignY;
  setAlignY: (val: TextAlignY) => void;
  padding: { top: number; right: number; bottom: number; left: number };
  setPadding: (pad: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }) => void;
  onExportPng: () => void;
  lineHeight: number;
  setLineHeight: (val: number) => void;
  onReset: () => void;
  onOverlayUpload: (img: string) => void;
  showOverlay: boolean;
  setShowOverlay: (val: boolean) => void;
  overlayImage?: string;
}
export interface CanvasProps {
  glyphs: Glyph[];
  fontSize: string;
  fontFamily: string;
  fontColor: string;
  fontWeight: string;
  fontStyle: string;
  lineHeight: number;
  alignX: string;
  alignY: string;
  padding: { top: number; right: number; bottom: number; left: number };
  onMove: (index: number, dx: number, dy: number) => void;
  overlayImage?: string;
  showOverlay: boolean;
  onCharChange?: (index: number, chara: string) => void;
  isKerningLoaded: boolean;
}
export interface GlyphBlockProps {
  chara: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: string;
  fontFamily: string;
  fontColor: string;
  fontWeight: string;
  fontStyle: string;
  lineHeight: number;
  alignX: string;
  alignY: string;
  padding: { top: number; right: number; bottom: number; left: number };
  nX: number;
  nY: number;
  onCharChange?: (newChar: string) => void;
}
