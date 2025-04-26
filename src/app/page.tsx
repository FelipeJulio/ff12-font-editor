"use client";

import { useEffect, useRef, useState } from "react";

import { Glyph, KerningPair } from "@/types/typings";
import {
  FontWeightOption,
  TextAlignX,
  TextAlignY,
  FontStyleOption,
  FontHeader,
} from "@/types/typings";

import { Toolbar } from "@/components/Toolbar";
import { toast } from "sonner";
import { GlyphCanvas } from "@/components/GlyphCanvas";
import { parseAtlas } from "@/lib/atlas/parseAtlas";
import { parseKerningFile } from "@/lib/kerning/paserKerning";
import { exportCanvasAsPng } from "../components/hooks/useCanvasExport";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/components/hooks/useBackup";

export default function Home() {
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
  const [kerning, setKerning] = useState<KerningPair[]>([]);
  const [isKerningLoaded, setIsKerningLoaded] = useState(false);
  const [fontSize, setFontSize] = useState("34");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [lineHeight, setLineHeight] = useState(1);
  const [fontWeight, setFontWeight] = useState<FontWeightOption>("400");
  const [fontStyle, setFontStyle] = useState<FontStyleOption>("Normal");
  const [alignX, setAlignX] = useState<TextAlignX>("center");
  const [alignY, setAlignY] = useState<TextAlignY>("center");
  const [padding, setPadding] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [customFont, setCustomFont] = useState<string | null>(null);
  const [overlayImage, setOverlayImage] = useState<string | undefined>();
  const [showOverlay, setShowOverlay] = useState(false);
  const [header, setHeader] = useState<FontHeader | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { glyphs, header, kerning } = loadFromLocalStorage();
    if (glyphs.length) setGlyphs(glyphs);
    if (header) setHeader(header);
    if (kerning.length) {
      setKerning(kerning);
      setIsKerningLoaded(true);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(glyphs, header, kerning);
  }, [glyphs, header, kerning]);

  const handleAtlasUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = /\.(dat|txt)$/i.test(file.name);
    if (!isValid) {
      toast.error("Unsupported file. Please upload a .dat or .txt file.");
      return;
    }

    try {
      const parsed = await parseAtlas(file);
      setGlyphs(parsed.glyphs);
      setHeader(parsed.header);
    } catch (err) {
      console.error("Invalid file content", err);
      toast.error("Invalid file format. Could not parse font data.");
    }
  };

  const handleKerningUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/\.(ker|txt)$/i.test(file.name)) {
      toast.error("Unsupported kerning file. Use .ker or .txt");
      return;
    }

    try {
      const parsed = await parseKerningFile(file);
      setKerning(parsed);
      setIsKerningLoaded(true);
      toast.success("Kerning loaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to parse kerning file");
    }
  };

  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = /\.(ttf|otf)$/i.test(file.name);
    if (!isValid) {
      toast.error("Invalid font format. Please upload a .ttf or .otf file.");
      return;
    }

    const fontName = file.name.replace(/\.[^/.]+$/, "");

    const reader = new FileReader();
    reader.onload = () => {
      const font = new FontFace(fontName, reader.result as ArrayBuffer);
      font.load().then((loaded) => {
        document.fonts.add(loaded);
        setCustomFont(fontName);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleMove = (index: number, dx: number, dy: number) => {
    setGlyphs((prev) =>
      prev.map((g, i) => (i === index ? { ...g, x: g.x + dx, y: g.y + dy } : g))
    );
  };

  const handleReset = () => {
    setGlyphs([]);
    setKerning([]);
    setHeader(null);
    setIsKerningLoaded(false);
    setFontSize("34");
    setFontWeight("400");
    setFontStyle("Normal");
    setFontColor("#ffffff");
    setAlignX("center");
    setAlignY("center");
    setLineHeight(1);
    setPadding({ top: 0, right: 0, bottom: 0, left: 0 });
  };

  const handleCharChange = (index: number, newChar: string) => {
    setGlyphs((prev) =>
      prev.map((g, i) => (i === index ? { ...g, chara: newChar } : g))
    );
  };

  return (
    <div className="h-full flex flex-col overflow-hidden items-center pb-8">
      <Toolbar
        canvasRef={canvasRef}
        onAtlasUpload={handleAtlasUpload}
        onKerningUpload={handleKerningUpload}
        onFontUpload={handleFontUpload}
        onBackupUpload={setGlyphs}
        header={header}
        glyphs={glyphs}
        kerning={kerning}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        fontColor={fontColor}
        setFontColor={setFontColor}
        alignX={alignX}
        setAlignX={setAlignX}
        alignY={alignY}
        setAlignY={setAlignY}
        padding={padding}
        setPadding={setPadding}
        onExportPng={() => exportCanvasAsPng(canvasRef.current)}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        onReset={handleReset}
        onOverlayUpload={setOverlayImage}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
        overlayImage={overlayImage}
      />
      <GlyphCanvas
        ref={canvasRef}
        glyphs={glyphs}
        fontSize={fontSize}
        fontFamily={customFont ?? ""}
        fontColor={fontColor}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        lineHeight={lineHeight}
        alignX={alignX}
        alignY={alignY}
        padding={padding}
        onMove={handleMove}
        onCharChange={handleCharChange}
        overlayImage={overlayImage}
        showOverlay={showOverlay}
        isKerningLoaded={isKerningLoaded}
      />
    </div>
  );
}
