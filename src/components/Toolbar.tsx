"use client";

import {
  FontStyleOption,
  TextAlignX,
  TextAlignY,
  ToolbarProps,
} from "@/types/typings";

import { useRouter } from "next/navigation";

import {
  Download,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  Loader2,
  ChevronDown,
  Trash,
  RotateCcw,
  Plus,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import {
  clearEditorStorage,
  exportGlyphBackup,
  importGlyphBackup,
  saveToLocalStorage,
} from "@/components/hooks/useBackup";
import { calculateNewNXNY } from "@/lib/atlas/calculateNewNXNY";
import { generateAtlasDatBuffer } from "@/lib/atlas/generateAtlasDatBuffer";
import { generateAtlasTxtFile } from "@/lib/atlas/generateAtlasTxtFile";

import clsx from "clsx";

import { saveAs } from "file-saver";
import { useState } from "react";
import { exportProgress } from "@/lib/utils/exportProgress";
import { generateKerningPairs } from "@/lib/kerning/generateKerningPairs";
import { exportKerningKerFile } from "@/lib/kerning/exportKerningKerFile";
import { exportKerningTxtFile } from "@/lib/kerning/exportKerningTxtFile";
import { Toggle } from "./ui/toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFirstLetter";
import { BackupUploader } from "./BackupUploader";

export function Toolbar({
  canvasRef,
  onAtlasUpload,
  onKerningUpload,
  onFontUpload,
  onBackupUpload,
  glyphs,
  kerning,
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
  setTextShadows,
  setTextStrokeColor,
  setTextStrokeSize,
  textShadows,
  textStrokeColor,
  textStrokeSize,
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
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resetLoading, setResetLoading] = useState(false);
  const [exportName, setExportName] = useState("");
  const updatedGlyphs = calculateNewNXNY(canvasRef.current, glyphs);

  const handleBackupImport = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.style.display = "none";

      const removeInput = () => {
        if (input.parentNode) {
          document.body.removeChild(input);
        }
      };

      document.body.appendChild(input);

      input.addEventListener("change", async (e) => {
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (!file) {
          toast.error("No file selected.");
          removeInput();
          return;
        }

        if (!file.name.endsWith(".json")) {
          toast.error("Invalid file. Please select a .json backup file.");
          removeInput();
          return;
        }

        try {
          const data = await importGlyphBackup(file);

          if (!data.header) {
            toast.error("Invalid backup: Missing Atlas header.");
            removeInput();
            return;
          }

          if (!header) {
            toast.error("You need to load an Atlas first.");
            removeInput();
            return;
          }

          const isSameHeader =
            header.width === data.header.width &&
            header.height === data.header.height &&
            header.glyphCount === data.header.glyphCount;

          if (!isSameHeader) {
            toast.error(
              "The backup file does not match the currently loaded Atlas header."
            );
            removeInput();
            return;
          }

          onBackupUpload(data);
          saveToLocalStorage(
            data.glyphs,
            data.header,
            data.kerning,
            data.settings
          );

          toast.success("Backup successfully loaded!");
        } catch (error) {
          console.error(error);
          toast.error("Failed to load the backup file.");
        } finally {
          removeInput();
        }
      });

      input.click();
    } catch (err) {
      console.error("Unexpected error during backup upload", err);
      toast.error("Unexpected error. Please try again.");
    }
  };

  const handleExportBackup = () => {
    exportProgress(setProgress, setOpenDialog, () =>
      exportGlyphBackup(glyphs, header, kerning, {
        fontSize,
        fontColor,
        fontWeight,
        fontStyle,
        alignX,
        alignY,
        lineHeight,
        padding,
        textStrokeSize,
        textStrokeColor,
        textShadows,
        showOverlay,
      })
    );
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
    toast.success("Overlay image loaded successfully!");
  };

  const onExportDat = () => {
    if (!header) return;
    const datBuffer = generateAtlasDatBuffer(header, updatedGlyphs);
    const blob = new Blob([datBuffer], { type: "application/octet-stream" });
    saveAs(blob, "exported_atlas.dat");
  };

  const exportAtlas = async () => {
    canvasRef.current?.classList.add("clean-glyphys");
    await onExportPng();
  };

  const onExportTtx = () => {
    if (!header) return;
    const content = generateAtlasTxtFile(header, updatedGlyphs);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "exported_atlas.txt");
  };

  const onExportKer = () => {
    if (!header) return;
    const updatedGlyphs = calculateNewNXNY(canvasRef.current, glyphs);
    const kerningPairs = generateKerningPairs(updatedGlyphs, kerning);
    exportKerningKerFile(kerningPairs);
  };

  const onExportKerTxt = () => {
    if (!header) return;
    const updatedGlyphs = calculateNewNXNY(canvasRef.current, glyphs);
    const kerningPairs = generateKerningPairs(updatedGlyphs, kerning);
    exportKerningTxtFile(kerningPairs);
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
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <Label>Atlas</Label>
            <Input
              className="cursor-pointer"
              type="file"
              accept=".txt,.dat"
              onChange={onAtlasUpload}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Kerning</Label>
            <Input
              className="cursor-pointer"
              type="file"
              accept=".txt,.ker"
              onChange={onKerningUpload}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Referece Overlay</Label>
            <div className="flex flex-row gap-2">
              <Input
                className="cursor-pointer"
                type="file"
                accept="image/*"
                onChange={handleOverlayUpload}
              />
            </div>
          </div>

          {overlayImage && (
            <>
              <div className="flex flex-col gap-2">
                <Label>Show</Label>
                <div className="flex justify-center items-center grow">
                  <Switch
                    id="overlay-toggle"
                    checked={showOverlay}
                    onCheckedChange={setShowOverlay}
                    disabled={!overlayImage}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 items-end">
            <Label className="flex justify-end">Settings</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer w-10">
                  {resetLoading && <Loader2 className="animate-spin" />}
                  <Settings size={16} />{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <BackupUploader onBackupUpload={handleBackupImport} />

                <DropdownMenuItem
                  onClick={() => {
                    setExportName("backup_ff12_text_helper.json");
                    handleExportBackup();
                  }}
                  disabled={glyphs.length === 0 || !header}
                >
                  <Download size={16} />
                  Export backup file
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setResetLoading(true);
                    setTimeout(() => {
                      clearEditorStorage();
                      onReset();
                      router.refresh();
                      setResetLoading(false);
                    }, 2000);
                  }}
                  disabled={
                    glyphs.length === 0 && !header && kerning.length === 0
                  }
                >
                  <RotateCcw size={16} />
                  Load defaults
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-start justify-start bg-muted p-4 rounded-xl shadow">
        <div className="flex flex-col gap-2">
          <Label>Size and placement</Label>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Alingment
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 max-w-60">
                  <p className="text-sm">Glyph alignment within block</p>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                      {horizontalAlignButtons.map(({ val, icon: Icon }) => (
                        <div key={val} className="flex flex-col gap-2 grow">
                          <Toggle
                            disabled={glyphs.length === 0 || !header}
                            variant={alignX === val ? "outline" : "default"}
                            className={clsx("p-2 cursor-pointer")}
                            onClick={() => setAlignX(val)}
                          >
                            <Icon size={16} />
                          </Toggle>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4">
                      {verticalAlignButtons.map(({ val, icon: Icon }) => (
                        <div key={val} className="flex flex-col gap-2 grow">
                          <Toggle
                            key={val}
                            disabled={glyphs.length === 0 || !header}
                            variant={alignY === val ? "outline" : "default"}
                            className={clsx("p-2 cursor-pointer")}
                            onClick={() => setAlignY(val)}
                          >
                            <Icon size={16} />
                          </Toggle>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Spacing
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 max-w-60">
                  <p className="text-sm">
                    Specific glyph positioning within the block
                  </p>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    {["top", "right", "bottom", "left"].map((side) => (
                      <div
                        className="flex flex-row items-center gap-2"
                        key={side}
                      >
                        <Label className="grow">
                          {capitalizeFirstLetter(side)}
                        </Label>
                        <Input
                          type="number"
                          disabled={glyphs.length === 0 || !header}
                          className="w-30"
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
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Font
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 max-w-60">
                  <p className="text-sm">
                    General font adjustments applied to the glyph.
                  </p>
                  <Separator />
                  <div className="flex flex-row gap-4">
                    <Label className="grow">Font Size</Label>
                    <Input
                      type="number"
                      disabled={glyphs.length === 0 || !header}
                      className="w-24"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      placeholder="Size"
                    />
                  </div>
                  <div className="flex flex-row gap-4">
                    <Label className="grow">Font Style</Label>
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
                  </div>
                  <div className="flex flex-row gap-4">
                    <Label className="grow">Font Weight</Label>
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
                  <div className="flex flex-row gap-4">
                    <Label className="grow">Line Height</Label>
                    <Input
                      type="number"
                      className="w-24"
                      step="0.1"
                      min="0.1"
                      value={lineHeight}
                      onChange={(e) =>
                        setLineHeight(parseFloat(e.target.value))
                      }
                      placeholder="Line height"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Styling and effects</Label>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Color
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 max-w-60">
                  <p className="text-sm">
                    Color that will be applied to the glyph.
                  </p>
                  <Separator />
                  <div className="flex flex-row gap-4">
                    <ColorPicker
                      value={fontColor}
                      glyphs={glyphs}
                      header={header}
                      onChange={setFontColor}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Stroke
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 max-w-60">
                  <p className="text-sm">Set border and color for glyph.</p>
                  <Separator />
                  <div className="flex flex-row gap-4">
                    <Label className="grow">Stroke width</Label>
                    <Input
                      type="number"
                      min={0}
                      value={textStrokeSize}
                      onChange={(e) =>
                        setTextStrokeSize(parseInt(e.target.value) || 0)
                      }
                      className="w-20"
                      placeholder="Size"
                    />
                  </div>
                  <Separator />
                  <div className="flex flex-row gap-4">
                    <ColorPicker
                      value={textStrokeColor}
                      glyphs={glyphs}
                      header={header}
                      onChange={setTextStrokeColor}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Shadows</Label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 max-w-62">
              {textShadows.map((shadow, index) => (
                <Popover key={index}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-3 py-1 max-w-14 w-full"
                    >
                      {index + 1}
                      <ChevronDown size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 p-4 w-60">
                    <p className="text-sm">
                      Sets one or more shadows for the glyph.
                    </p>
                    <Separator />
                    <div className="flex flex-row gap-4">
                      <Label className="grow">Offset X</Label>
                      <Input
                        type="number"
                        value={shadow.offsetX}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          const updated = [...textShadows];
                          updated[index].offsetX = value;
                          setTextShadows(updated);
                        }}
                        className="w-20"
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4">
                      <Label className="grow">Offset Y</Label>
                      <Input
                        type="number"
                        value={shadow.offsetY}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          const updated = [...textShadows];
                          updated[index].offsetY = value;
                          setTextShadows(updated);
                        }}
                        className="w-20"
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4">
                      <Label className="grow">Blur</Label>
                      <Input
                        type="number"
                        value={shadow.blur}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          const updated = [...textShadows];
                          updated[index].blur = value;
                          setTextShadows(updated);
                        }}
                        className="w-20"
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4">
                      <ColorPicker
                        value={shadow.color}
                        glyphs={glyphs}
                        header={header}
                        onChange={(color) => {
                          const updated = [...textShadows];
                          updated[index].color = color;
                          setTextShadows(updated);
                        }}
                      />
                    </div>
                    <Separator />
                    <Button
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => {
                        const updated = textShadows.filter(
                          (_, i) => i !== index
                        );
                        setTextShadows(updated);
                      }}
                    >
                      <Trash size={16} className="mr-2" />
                      Remove Shadow
                    </Button>
                  </PopoverContent>
                </Popover>
              ))}
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  setTextShadows([
                    ...textShadows,
                    { offsetX: 0, offsetY: 0, blur: 0, color: "#000000" },
                  ])
                }
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Custom Font</Label>
          <Input
            className="cursor-pointer"
            type="file"
            accept=".ttf,.otf"
            onChange={onFontUpload}
          />
        </div>
        <div className="flex flex-col gap-2 items-end grow">
          <Label>Download</Label>
          <div className="flex flex-col gap-2 items-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                disabled={glyphs.length === 0 || !header}
              >
                <Button className="cursor-pointer">
                  <Download size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Atlas files</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-800"
                  onClick={() => {
                    setExportName("exported_atlas.dat");
                    exportProgress(setProgress, setOpenDialog, async () => {
                      onExportDat();
                    });
                  }}
                >
                  <Download size={16} />
                  Download as .dat
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-800"
                  onClick={() => {
                    setExportName("exported_atlas.txt");
                    exportProgress(setProgress, setOpenDialog, async () => {
                      onExportTtx();
                    });
                  }}
                >
                  <Download size={16} />
                  Download as .txt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Atlas pattern</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-800"
                  onClick={() => {
                    setExportName("exported_atlas.png");
                    exportProgress(setProgress, setOpenDialog, async () => {
                      exportAtlas();
                    });
                  }}
                >
                  <Download size={16} />
                  Download as .png
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Kerning files</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-800"
                  onClick={() => {
                    setExportName("exported_kerning.ker");
                    exportProgress(setProgress, setOpenDialog, onExportKer);
                  }}
                >
                  Download as .ker
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-800"
                  onClick={() => {
                    setExportName("exported_kerning.txt");
                    exportProgress(setProgress, setOpenDialog, onExportKerTxt);
                  }}
                >
                  Download as .txt
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
            <DialogTitle>
              Generating <span className=" text-gray-500">{exportName}</span>{" "}
              file...
            </DialogTitle>
          </DialogHeader>
          <Progress value={progress} className="mt-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
