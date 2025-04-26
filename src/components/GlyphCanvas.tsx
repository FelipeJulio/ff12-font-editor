"use client";

import { CanvasProps } from "@/types/typings";
import { GlyphBlock } from "@/components/GlyphBlock";
import { forwardRef } from "react";
import clsx from "clsx";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { CheckCircle2, Circle, LoaderCircle } from "lucide-react";
import { Separator } from "./ui/separator";

export const GlyphCanvas = forwardRef<HTMLDivElement, CanvasProps>(
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
      isKerningLoaded,
    },
    ref
  ) {
    const canvasHeight = Math.max(...glyphs.map((g) => g.y + g.height));
    const isEmpty = glyphs?.length === 0;
    const showStepper = isEmpty || !isKerningLoaded;

    return (
      <div className="flex-1 w-full flex flex-col overflow-hidden justify-center relative mt-4">
        {showStepper && (
          <div className="w-full space-y-4 mx-auto h-full">
            <div className="w-full flex flex-col items-center justify-center bg-muted py-12 pv-6 gap-12 rounded-xl shadow">
              <div className=" flex items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  {isEmpty ? (
                    <Circle />
                  ) : (
                    <CheckCircle2 className="text-green-400" />
                  )}
                  <div className="flex flex-col justify-center items-center w-[150]">
                    <p className="font-text-md font-bold text-muted-foreground whitespace-pre text-center">
                      Load Atlas
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Visual map of glyphs and positions
                    </p>
                  </div>
                </div>
                <Separator className="max-w-30" />
                <div className="flex flex-col items-center justify-center gap-2">
                  {!isKerningLoaded ? (
                    isEmpty ? (
                      <Circle />
                    ) : (
                      <LoaderCircle className="animate-spin" />
                    )
                  ) : (
                    <CheckCircle2 className="text-green-400" />
                  )}
                  <div className="flex flex-col justify-center items-center w-[160]">
                    <p className="font-text-md font-bold text-muted-foreground whitespace-pre text-center">
                      Load Kerning
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Spacing adjustment between letters
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Please load both files to start editing the font atlas.
              </p>
            </div>
          </div>
        )}
        {!showStepper && (
          <ScrollArea
            className={clsx(
              "flex-1 w-full rounded-md border p-4 overflow-auto",
              isEmpty && "hidden"
            )}
          >
            <ScrollBar orientation="horizontal" />
            <div className={clsx("w-max", isEmpty && "hidden")}>
              <div
                className={clsx("relative gylphcanvas overflow-hidden")}
                ref={ref}
                style={{
                  width: 2048,
                  height: canvasHeight,
                  marginInline: "auto",
                  backgroundImage:
                    showOverlay && overlayImage
                      ? `url(${overlayImage})`
                      : "none",
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
        )}
      </div>
    );
  }
);
