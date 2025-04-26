"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="w-full flex flex-col space-y-4 mx-auto py-10 gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Docs</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to use the XII Font Editor effectively.
        </p>
      </div>

      <Separator />

      <section>
        <h2 className="text-2xl font-semibold">Uploading Files</h2>
        <p className="text-muted-foreground mt-2">
          To begin, upload a valid{" "}
          <Badge className="font-extrabold">.dat</Badge> file from the game or a
          previously extracted <Badge>.txt</Badge> file. The tool will parse the
          file and display the corresponding glyphs on the canvas.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">File Parsing</h2>
        <p className="text-muted-foreground mt-2">
          <Badge className="font-extrabold">.dat</Badge> files are parsed using
          a binary <code>DataView</code>, extracting metadata and glyph layout
          details such as coordinates, dimensions, spacing, and Unicode codes.
        </p>
        <p className="text-muted-foreground mt-2">
          <Badge className="font-extrabold">.txt</Badge> files are
          human-readable and include a header line followed by lines describing
          each glyph and its data.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Kerning Support</h2>
        <p className="text-muted-foreground mt-2">
          Kerning adjusts the spacing between specific pairs of characters to
          improve the overall visual balance of text. Without proper kerning,
          combinations like &quot;AV&quot; or &quot;To&quot; may appear awkward
          or uneven.
        </p>
        <p className="text-muted-foreground mt-2">
          Uploading a <Badge className="font-extrabold">.ker</Badge> or{" "}
          <Badge className="font-extrabold">.txt</Badge> kerning file alongside
          the atlas allows the editor to correctly simulate character spacing.
          When exporting, updated kerning data will also be included.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Custom Fonts</h2>
        <p className="text-muted-foreground mt-2">
          You may upload a <Badge className="font-extrabold">.ttf</Badge> or{" "}
          <Badge className="font-extrabold">.otf</Badge> file to preview how
          your glyphs appear in different typefaces. This does not affect export
          — it is for visual reference only.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Overlay Feature</h2>
        <p className="text-muted-foreground mt-2">
          You can extract the original{" "}
          <Badge className="font-extrabold">.dds</Badge> texture from the game,
          convert it to <Badge className="font-extrabold">.png</Badge>, and
          upload it as an overlay. This allows you to compare your custom layout
          side-by-side with the official font atlas.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Editing Tools</h2>
        <p className="text-muted-foreground mt-2">
          The toolbar provides various controls to fine-tune your layout:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
          <li>
            <strong>Alignment</strong> – horizontal and vertical positioning of
            text inside each glyph box
          </li>
          <li>
            <strong>Padding</strong> – adjust space around glyphs (top, right,
            bottom, left)
          </li>
          <li>
            <strong>Font</strong> – control size, weight, style, color, and line
            height
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Backup</h2>
        <p className="text-muted-foreground mt-2">
          You can save your progress by downloading a{" "}
          <Badge className="font-extrabold">.json</Badge> backup file and load
          it again later to continue editing from where you left off.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Exporting</h2>
        <p className="text-muted-foreground mt-2">
          The export options include:
        </p>
        <p className="text-muted-foreground mt-2">Atlas</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
          <li>
            <Badge className="font-extrabold">.dat</Badge> — binary format used
            in-game
          </li>
          <li>
            <Badge className="font-extrabold">.txt</Badge> — editable format for
            reviewing or external compiling
          </li>
          <li>
            <Badge className="font-extrabold">.png</Badge> — canvas export used
            to replace the original{" "}
            <Badge className="font-extrabold">.dds</Badge> atlas file
          </li>
        </ul>
        <p className="text-muted-foreground mt-2">Kerning</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
          <li>
            <Badge className="font-extrabold">.ker</Badge> — kerning data binary
            format used in-game
          </li>
          <li>
            <Badge className="font-extrabold">.txt</Badge> — kerning editable
            format
          </li>
        </ul>
      </section>
    </div>
  );
}
