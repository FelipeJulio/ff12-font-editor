"use client";

import { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { FontHeader, Glyph } from "@/types/typings";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  glyphs: Glyph[];
  header: FontHeader | null;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [internalColor, setInternalColor] = useState(value);

  const handleChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;
    setInternalColor(rgba);
    onChange(rgba);
  };

  return (
    <ChromePicker
      className="colorPicker font-bold"
      color={internalColor}
      onChange={handleChange}
    />
  );
}
