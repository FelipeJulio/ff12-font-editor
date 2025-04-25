"use client";

import { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FontHeader, Glyph } from "@/types/typings";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  glyphs: Glyph[];
  header: FontHeader | null;
}

export function ColorPicker({
  value,
  onChange,
  glyphs,
  header,
}: ColorPickerProps) {
  const [internalColor, setInternalColor] = useState(value);

  const handleChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;
    setInternalColor(rgba);
    onChange(rgba);
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={glyphs?.length === 0 || !header}>
        <Button
          className="w-20 h-20 p-0 rounded-md border shadow cursor-pointer"
          style={{ backgroundColor: internalColor }}
          aria-label="Color Picker"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <SketchPicker color={internalColor} onChange={handleChange} />
      </PopoverContent>
    </Popover>
  );
}
