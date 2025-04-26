"use client";

import { useState } from "react";

import { GlyphBlockProps } from "@/types/typings";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Undo2 } from "lucide-react";

export function GlyphBlock({
  chara,
  x,
  y,
  width,
  height,
  fontSize,
  fontFamily,
  fontColor,
  fontWeight,
  fontStyle,
  lineHeight,
  alignX,
  alignY,
  padding,
  onCharChange,
}: GlyphBlockProps) {
  const [hovered, setHovered] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(chara);

  const isOffset = offsetX !== 0 || offsetY !== 0;

  const moveSpan = (dx: number, dy: number) => {
    setOffsetX((prev) => prev + dx);
    setOffsetY((prev) => prev + dy);
  };

  const resetSpan = () => {
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChar = e.target.value.slice(0, 1);
    setValue(newChar);
    onCharChange?.(newChar);
  };

  const confirmChange = () => {
    setEditing(false);
    onCharChange?.(value);
  };

  return (
    <div
      style={{ top: y, left: x, width, height }}
      className="absolute"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-char={chara}
      data-x={x}
      data-y={y}
    >
      <div
        className={clsx(
          "relative flex gylphbox ",
          alignX === "left" && "justify-start",
          alignX === "center" && "justify-center",
          alignX === "right" && "justify-end",
          alignY === "top" && "items-start",
          alignY === "center" && "items-center",
          alignY === "bottom" && "items-end"
        )}
        style={{
          width,
          height,
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight,
          fontStyle,
          color: fontColor,
          lineHeight,
          paddingTop: padding.top,
          paddingRight: padding.right,
          paddingBottom: padding.bottom,
          paddingLeft: padding.left,
        }}
      >
        {editing ? (
          <input
            autoFocus
            type="text"
            maxLength={1}
            value={value}
            onChange={handleChange}
            onBlur={confirmChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmChange();
            }}
            className="absolute w-full h-full outline-red-500  border- text-center"
            style={{
              transform: `translate(${offsetX * -1}px, ${offsetY * -1}px)`,
            }}
          />
        ) : (
          <span
            className={clsx("glyphitem", { edited: isOffset })}
            style={{
              display: "inline-block",
              transform: `translate(${offsetX * -1}px, ${offsetY * -1}px)`,
              cursor: "pointer",
            }}
            onClick={() => setEditing(true)}
          >
            {value}
          </span>
        )}
        {hovered && (
          <>
            <button
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-black text-xs cursor-pointer p-px rounded-xs bg-white/60 hover:bg-white/100 shadow transition-all"
              onClick={() => moveSpan(0, 1)}
            >
              <ArrowUp size={16} strokeWidth={3} />
            </button>
            <button
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-black text-xs cursor-pointer p-px rounded-xs bg-white/60 hover:bg-white/100 shadow transition-all"
              onClick={() => moveSpan(0, -1)}
            >
              <ArrowDown size={16} strokeWidth={3} />
            </button>
            <button
              className="absolute -left-3 top-1/2 -translate-y-1/2 text-black text-xs cursor-pointer p-px rounded-xs bg-white/60 hover:bg-white/100 shadow transition-all"
              onClick={() => moveSpan(1, 0)}
            >
              <ArrowLeft size={16} strokeWidth={3} />
            </button>
            <button
              className="absolute -right-3 top-1/2 -translate-y-1/2 text-black text-xs cursor-pointer p-px rounded-xs bg-white/60 hover:bg-white/100 shadow transition-all"
              onClick={() => moveSpan(-1, 0)}
            >
              <ArrowRight size={16} strokeWidth={3} />
            </button>
            {isOffset && hovered && (
              <button
                className="absolute -top-3 -right-3 text-white text-xs cursor-pointer p-px rounded-xs bg-red-800 shadow transition-all"
                onClick={resetSpan}
              >
                <Undo2 size={16} strokeWidth={3} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
