"use client";

import { Glyph } from "@/types/typings";
import { GlyphBlock } from "@/components/GlyphBlock";
import { forwardRef } from "react";
import clsx from "clsx";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
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
}

export const GlyphCanvas = forwardRef<HTMLDivElement, Props>(
  function GlyphCanvas(
    {
      glyphs,
      fontSize,
      fontFamily,
      fontColor,
      fontWeight,
      fontStyle,
      lineHeight,
      alignX,
      alignY,
      padding,
      overlayImage,
      showOverlay,
      onCharChange,
    },
    ref
  ) {
    const canvasHeight = Math.max(...glyphs.map((g) => g.y + g.height));
    const isEmpty = glyphs?.length === 0;

    return (
      <div className="flex-1 w-full flex flex-col overflow-hidden justify-center relative mt-4">
        <div className={clsx("w-full space-y-4 mx-auto", !isEmpty && "hidden")}>
          <div className="w-full flex flex-wrap gap-4 items-center justify-center bg-muted p-4 rounded-xl shadow h-40">
            Load a .dat or extracted .txt file to render glyphs here.
          </div>
        </div>
        <ScrollArea className="flex-1 w-full rounded-md border p-4 overflow-auto">
          <ScrollBar orientation="horizontal" />
          <div className={clsx(" w-max", isEmpty && "hidden")}>
            <div
              className={clsx("relative gylphcanvas")}
              ref={ref}
              style={{
                width: 2048,
                height: canvasHeight,
                marginInline: "auto",
                backgroundImage:
                  showOverlay && overlayImage ? `url(${overlayImage})` : "none",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
              }}
            >
              {glyphs.map((glyph, index) => (
                <GlyphBlock
                  key={index}
                  chara={glyph.chara}
                  x={glyph.x}
                  y={glyph.y}
                  width={glyph.width}
                  height={glyph.height}
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  fontColor={fontColor}
                  fontWeight={fontWeight}
                  fontStyle={fontStyle}
                  lineHeight={lineHeight}
                  alignX={alignX}
                  alignY={alignY}
                  padding={padding}
                  nX={glyph.nX}
                  nY={glyph.nY}
                  onCharChange={(newChar) => onCharChange?.(index, newChar)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }
);
