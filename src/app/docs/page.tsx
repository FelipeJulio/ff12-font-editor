"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocumentationPage() {
  return (
    <ScrollArea className="flex w-full rounded-md border p-4 overflow-auto mb-4">
      <div className="w-full flex flex-col space-y-4 mx-auto py-10 gap-4 px-2">
        <header>
          <h1 className="text-4xl font-bold">XII Font Editor Documentation</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your definitive guide to mastering the tools and features of the XII
            Font Editor.
          </p>
        </header>

        <Separator />

        <section>
          <h2 className="text-3xl font-bold">Data Formats</h2>
          <p className="mt-2 text-muted-foreground">
            Understanding the file types used by the editor ensures a smooth
            pipeline from editing to in-game deployment.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-2xl font-medium">Atlas Files</h3>
              <p className="mt-1 text-muted-foreground">
                The atlas defines the visual layout of every glyph character.
                Use the following formats depending on your workflow stage:
              </p>
              <ul className="ml-4 list-disc space-y-2 mt-2 text-muted-foreground">
                <li>
                  <Badge>.dat</Badge> <strong>Compiled Binary Atlas</strong>
                  <p className="mt-1">
                    Final format read directly by the game engine. Contains
                    optimized glyph positions and metrics. Always export your
                    final work as <Badge>.dat</Badge> for packaging and in-game
                    use.
                  </p>
                </li>
                <li>
                  <Badge>.txt</Badge> <strong>Editable Atlas Text</strong>
                  <p className="mt-1">
                    Human-readable representation of the atlas structure. Ideal
                    for reviewing numeric values, bulk editing, or version
                    control diffing. Can be recompiled into <Badge>.dat</Badge>{" "}
                    after adjustments.
                  </p>
                </li>
                <li>
                  <Badge>.png</Badge> <strong>Visual Atlas Preview</strong>
                  <p className="mt-1">
                    High-resolution snapshot of the glyph map. Use this to
                    verify visual alignment and replace the original{" "}
                    <Badge>.dds</Badge> file when packaging your file.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Kerning Files</h3>
              <p className="mt-1 text-muted-foreground">
                Kerning tables adjust spacing between individual character pairs
                to improve readability and visual balance.
              </p>
              <ul className="ml-4 list-disc space-y-2 mt-2 text-muted-foreground">
                <li>
                  <Badge>.ker</Badge> <strong>Compiled Binary Kerning</strong>
                  <p className="mt-1">
                    Final kerning data used by the game. Includes pair-specific
                    offsets for precise character spacing. Export as{" "}
                    <Badge>.ker</Badge> for deployment.
                  </p>
                </li>
                <li>
                  <Badge>.txt</Badge> <strong>Editable Kerning Text</strong>
                  <p className="mt-1">
                    Text-based list of kerning pairs and values. Use this for
                    manual tweaking, peer review, or version control. Can be
                    recompiled into <Badge>.ker</Badge> after edits.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-3xl font-bold">Base Functionalities</h2>
          <p className="mt-2 text-muted-foreground">
            Core editor features that form the foundation of your glyph editing
            workflow.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-2xl font-medium">Load Atlas</h3>
              <p className="mt-1 text-muted-foreground">
                Import a <Badge>.dat</Badge> binary atlas or its extracted{" "}
                <Badge>.txt</Badge> counterpart to begin editing glyph positions
                and metrics.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Load Kerning</h3>
              <p className="mt-1 text-muted-foreground">
                Import a <Badge>.ker</Badge> file or its <Badge>.txt</Badge>{" "}
                version to modify pair-specific spacing adjustments.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Reference Overlay</h3>
              <p className="mt-1 text-muted-foreground">
                Overlay a <Badge>.png</Badge> preview generated from the
                original <Badge>.dds</Badge> file beneath your editing canvas.
                This ensures glyph edits stay aligned with the original artwork.
              </p>
              <Alert variant="default" className="mt-2">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Always keep your overlay visible and aligned. Deviations can
                  cause letterbox issues or misaligned glyphs in-game.
                </AlertDescription>
              </Alert>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Settings</h3>
              <ul className="ml-4 list-disc space-y-2 mt-2 text-muted-foreground">
                <li>
                  <strong>Export Backup</strong>: Download a JSON snapshot of
                  your current editing session.
                </li>
                <li>
                  <strong>Import Backup</strong>: Restore a previous session
                  from a JSON file. Header validation prevents importing
                  mismatched atlases.
                </li>
                <li>
                  <strong>Reset Editor</strong>: Clear all loaded files and
                  edits to start fresh without reloading the page.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Autosave</h3>
              <p className="mt-1 text-muted-foreground">
                All edits are persisted in real-time. Your work is never lost
                unless you explicitly reset the editor.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-3xl font-bold">Customization Functionalities</h2>
          <p className="mt-2 text-muted-foreground">
            Advanced tools to fine-tune glyph appearance and typography
            settings.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-2xl font-medium">Alignment</h3>
              <p className="mt-1 text-muted-foreground">
                Snap glyphs horizontally or vertically within their bounding
                box: center, edge, or custom offset.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Spacing</h3>
              <p className="mt-1 text-muted-foreground">
                Adjust glyph padding individually on top, bottom, left, or right
                for pixel-perfect positioning.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Font Options</h3>
              <ul className="ml-4 list-disc space-y-2 mt-2 text-muted-foreground">
                <li>Modify font size with live preview.</li>
                <li>Switch font style: normal, italic, or oblique.</li>
                <li>Adjust font weight from thin to black.</li>
                <li>Set custom line height for vertical rhythm.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Color</h3>
              <p className="mt-1 text-muted-foreground">
                Pick colors with HEX or RGBA support. Sample directly from the
                original <Badge>.dds</Badge> palette to maintain visual
                consistency.
              </p>
              <Alert variant="default" className="mt-2">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Always base your color selection on the source artwork to
                  prevent mismatches in-game.
                </AlertDescription>
              </Alert>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Stroke</h3>
              <p className="mt-1 text-muted-foreground">
                Add an outline around glyphs with adjustable thickness and
                color. Use this to replicate or approximate official stylized
                fonts.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">Shadows</h3>
              <p className="mt-1 text-muted-foreground">
                Layer multiple shadows beneath glyphs. Control offset, blur
                radius, and opacity for depth effects.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">
                Custom Fonts & Characters
              </h3>
              <p className="mt-1 text-muted-foreground">
                Upload your own <Badge>.ttf</Badge> or <Badge>.otf</Badge>{" "}
                fonts. Ensure full Unicode coverage to avoid missing glyphs.
              </p>
              <ul className="ml-4 list-disc space-y-2 mt-2 text-muted-foreground">
                <li>
                  Click any glyph to replace its Unicode codepoint manually.
                </li>
                <li>
                  Verify each replacement against a reference like
                  unicode-table.com to ensure accuracy.
                </li>
                <li>
                  Prefer fonts with spacing characteristics similar to the
                  original to avoid letterboxing issues.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        <section className="pb-12">
          <h2 className="text-3xl font-bold">Export Options</h2>
          <p className="mt-2 text-muted-foreground">
            Finalize your project by exporting all updated assets in the correct
            formats for integration.
          </p>

          <ul className="ml-4 list-disc space-y-3 mt-4 text-muted-foreground">
            <li>
              Export updated atlas as <Badge>.dat</Badge> or <Badge>.txt</Badge>
              .
            </li>
            <li>
              Export visual atlas preview as <Badge>.png</Badge> to replace the
              original <Badge>.dds</Badge>.
            </li>
            <li>
              Export kerning data as <Badge>.ker</Badge> or <Badge>.txt</Badge>.
            </li>
          </ul>

          <Alert variant="default" className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              All exports include your custom spacing, colors, and font choices
              ready for seamless in-game integration.
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </ScrollArea>
  );
}
