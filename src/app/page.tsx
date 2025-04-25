"use client";

import { useEffect, useRef, useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import { toast } from "sonner";
import { GlyphCanvas } from "@/components/GlyphCanvas";
import { parseFontFile } from "@/lib/parseFontFile";
import { exportCanvasAsPng } from "@/lib/useCanvasExport";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/useBackup";

import { Glyph } from "@/types/typings";
import {
  FontWeightOption,
  TextAlignX,
  TextAlignY,
  FontStyleOption,
  FontHeader,
} from "@/types/typings";

export default function Home() {
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
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
    const { glyphs, header } = loadFromLocalStorage();
    if (glyphs.length > 0) setGlyphs(glyphs);
    if (header) setHeader(header);
  }, []);

  useEffect(() => {
    saveToLocalStorage(glyphs, header);
  }, [glyphs, header]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = /\.(dat|txt)$/i.test(file.name);
    if (!isValid) {
      toast.error("Unsupported file. Please upload a .dat or .txt file.");
      return;
    }

    try {
      const parsed = await parseFontFile(file);
      setGlyphs(parsed.glyphs);
      setHeader(parsed.header);
    } catch (err) {
      console.error("Invalid file content", err);
      toast.error("Invalid file format. Could not parse font data.");
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
    setFontSize("16");
    setFontWeight("400");
    setFontStyle("Normal");
    setFontColor("#ffffff");
    setAlignX("left");
    setAlignY("top");
    setLineHeight(1.2);
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
        onFileUpload={handleFileUpload}
        onFontUpload={handleFontUpload}
        onBackupUpload={setGlyphs}
        header={header}
        glyphs={glyphs}
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
        fontFamily={customFont ?? "Inter"}
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
      />
    </div>
  );
}
