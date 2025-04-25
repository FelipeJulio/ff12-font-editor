"use client";

import {
  Upload,
  Download,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

import { exportGlyphBackup, importGlyphBackup } from "@/lib/useBackup";
import { calculateNewNXNY } from "@/lib/calculateNewNXNY";
import { generateDatBuffer } from "@/lib/generateDatBuffer";
import { generateTxtFile } from "@/lib/generateTxtFile";

import {
  Glyph,
  FontHeader,
  FontWeightOption,
  FontStyleOption,
  TextAlignX,
  TextAlignY,
} from "@/types/typings";

import clsx from "clsx";

import { saveAs } from "file-saver";
import { useState } from "react";
import { exportProgress } from "@/lib/exportProgress";

interface ToolbarProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFontUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBackupUpload: (glyphs: Glyph[]) => void;
  header: FontHeader | null;
  glyphs: Glyph[];
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

export function Toolbar({
  canvasRef,
  onFileUpload,
  onFontUpload,
  onBackupUpload,
  glyphs,
  fontSize,
  setFontSize,
  fontWeight,
  setFontWeight,
  fontStyle,
  setFontStyle,
  fontColor,
  setFontColor,
  alignX,
  setAlignX,
  alignY,
  setAlignY,
  padding,
  setPadding,
  onExportPng,
  lineHeight,
  setLineHeight,
  onReset,
  onOverlayUpload,
  showOverlay,
  setShowOverlay,
  overlayImage,
  header,
}: ToolbarProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const updatedGlyphs = calculateNewNXNY(canvasRef.current, glyphs);

  const handleBackupImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isJson = /\.json$/i.test(file.name);
    if (!isJson) {
      toast.error("Invalid file. Please upload a .json backup file.");
      return;
    }

    const glyphs = await importGlyphBackup(file);
    onBackupUpload(glyphs);
  };

  const handleExportBackup = () => {
    exportProgress(setProgress, setOpenDialog, () => exportGlyphBackup(glyphs));
  };

  const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only PNG or JPG images are supported.");
      return;
    }

    const url = URL.createObjectURL(file);
    onOverlayUpload(url);
  };

  const onExportDat = () => {
    if (!header) return;
    const datBuffer = generateDatBuffer(header, updatedGlyphs);
    const blob = new Blob([datBuffer], { type: "application/octet-stream" });
    saveAs(blob, "exported_font.dat");
  };

  const exportAtlas = async () => {
    canvasRef.current?.classList.add("clean-glyphys");
    await onExportPng();
  };

  const onExportTtx = () => {
    if (!header) return;
    const content = generateTxtFile(header, updatedGlyphs);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "exported_font.txt");
  };

  const verticalAlignButtons: { val: TextAlignY; icon: React.ElementType }[] = [
    { val: "top", icon: AlignVerticalJustifyStart },
    { val: "center", icon: AlignVerticalJustifyCenter },
    { val: "bottom", icon: AlignVerticalJustifyEnd },
  ];

  const horizontalAlignButtons: { val: TextAlignX; icon: React.ElementType }[] =
    [
      { val: "left", icon: AlignHorizontalJustifyStart },
      { val: "center", icon: AlignHorizontalJustifyCenter },
      { val: "right", icon: AlignHorizontalJustifyEnd },
    ];

  return (
    <div className="w-full space-y-4 mx-auto">
      <div className="flex flex-wrap gap-4 items-start justify-between bg-muted p-4 rounded-xl shadow">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-2">
            <Label>Load .dat or extracted .txt</Label>
            <Input
              className="cursor-pointer"
              type="file"
              accept=".txt,.dat"
              onChange={onFileUpload}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Load font file (otf or ttf)</Label>
            <Input
              className="cursor-pointer"
              type="file"
              accept=".ttf,.otf"
              onChange={onFontUpload}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Overlay</Label>
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleOverlayUpload}
            />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-2">
            <Label className="flex justify-end">Backup</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer">Backup Settings</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <label className="w-full flex items-center gap-2 cursor-pointer">
                    <Upload size={16} />
                    Upload backup file
                    <Input
                      type="file"
                      accept=".json"
                      onChange={handleBackupImport}
                      className="hidden"
                    />
                  </label>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleExportBackup}
                  disabled={glyphs.length === 0 || !header}
                >
                  <Download size={16} />
                  Download backup file
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 items-start justify-between bg-muted p-4 rounded-xl shadow">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Alignment</Label>
            <div className="flex gap-2">
              {horizontalAlignButtons.map(({ val, icon: Icon }) => (
                <Button
                  key={val}
                  disabled={glyphs.length === 0 || !header}
                  variant="outline"
                  className={clsx(
                    "p-2 cursor-pointer",
                    alignX === val && "bg-primary text-white"
                  )}
                  onClick={() => setAlignX(val)}
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {verticalAlignButtons.map(({ val, icon: Icon }) => (
                <Button
                  key={val}
                  disabled={glyphs.length === 0 || !header}
                  variant="outline"
                  className={clsx(
                    "p-2 cursor-pointer",
                    alignY === val && "bg-primary text-white"
                  )}
                  onClick={() => setAlignY(val)}
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Padding</Label>
            <div className="grid grid-cols-2 gap-2">
              {["top", "right", "bottom", "left"].map((side) => (
                <div className="flex flex-row items-center gap-2" key={side}>
                  {side.trim().charAt(0).toUpperCase()}
                  <Input
                    type="number"
                    disabled={glyphs.length === 0 || !header}
                    className="w-20 "
                    placeholder={side}
                    value={padding[side as keyof typeof padding]}
                    onChange={(e) =>
                      setPadding({
                        ...padding,
                        [side]: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Font</Label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  disabled={glyphs.length === 0 || !header}
                  className="w-20"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  placeholder="Size"
                />
                <Select
                  value={fontWeight}
                  onValueChange={setFontWeight}
                  disabled={glyphs.length === 0 || !header}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(9)].map((_, i) => {
                        const val = String((i + 1) * 100);
                        return (
                          <SelectItem key={val} value={val}>
                            {val}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Select
                  value={fontStyle}
                  onValueChange={setFontStyle}
                  disabled={glyphs.length === 0 || !header}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {(
                        ["Normal", "Italic", "Oblique"] as FontStyleOption[]
                      ).map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  className="w-20"
                  step="0.1"
                  min="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  placeholder="Line height"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Color</Label>
            <ColorPicker
              value={fontColor}
              glyphs={glyphs}
              header={header}
              onChange={setFontColor}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Show Overlay</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="overlay-toggle"
                checked={showOverlay}
                onCheckedChange={setShowOverlay}
                disabled={!overlayImage}
              />
              <Label htmlFor="overlay-toggle" className="text-sm">
                {overlayImage
                  ? showOverlay
                    ? "Visible"
                    : "Hidden"
                  : "Upload image first"}
              </Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm flex justify-end">Actions</Label>
          <div className="flex flex-col gap-2 ">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                localStorage.clear();
                onReset();
                window.location.reload();
              }}
            >
              Reset All
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                disabled={glyphs.length === 0 || !header}
              >
                <Button className="cursor-pointer">Download</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    exportProgress(setProgress, setOpenDialog, async () => {
                      onExportDat();
                    })
                  }
                >
                  <Download size={16} />
                  Download .dat
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    exportProgress(setProgress, setOpenDialog, async () => {
                      onExportTtx();
                    })
                  }
                >
                  <Download size={16} />
                  Download .txt
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    exportProgress(setProgress, setOpenDialog, async () => {
                      exportAtlas();
                    })
                  }
                >
                  <Download size={16} />
                  Download atlas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          if (progress < 100) return;
          setOpenDialog(open);
        }}
      >
        <DialogContent
          className="sm:max-w-md"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Exporting file...</DialogTitle>
          </DialogHeader>
          <Progress value={progress} className="mt-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
