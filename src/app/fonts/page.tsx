"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function FontsPage() {
  return (
    <div className="w-full space-y-4 mx-auto py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fonts Guide</h1>
        <p className="text-muted-foreground mt-2">
          Best practices for choosing and editing fonts in the XII Font Editor.
        </p>
      </div>

      <Separator />

      <section>
        <h2 className="text-2xl font-semibold">Choosing a Font</h2>
        <p className="text-muted-foreground mt-2">
          It&apos;s important to choose fonts carefully. Avoid typefaces that
          are too <strong>wide</strong> or <strong>bulky</strong>, as they can
          cause glyphs to overflow their intended spaces, potentially breaking
          in-game text rendering.
        </p>
        <p className="text-muted-foreground mt-2">
          Prefer <strong>condensed</strong> fonts that naturally occupy less
          horizontal space. Always use the <strong>Overlay</strong> feature to
          compare your custom font against the original in-game font for the
          best results.
        </p>
        <p className="text-muted-foreground mt-2">
          Try to keep your customizations as close as possible to the original
          glyph layout. Remember: each glyph block is fully editable, so you can
          replace or adjust characters individually if necessary.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Editing Features</h2>
        <p className="text-muted-foreground mt-2">
          The XII Font Editor provides several tools to help you fine-tune your
          font:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
          <li>
            Upload and preview custom fonts (<Badge>.ttf</Badge> or{" "}
            <Badge>.otf</Badge>)
          </li>
          <li>Align glyphs horizontally and vertically</li>
          <li>Adjust font weight</li>
          <li>Change font style (normal, italic, oblique)</li>
          <li>Resize the font size</li>
          <li>Edit the line spacing (line-height)</li>
          <li>
            Modify glyph positioning with padding controls (left, right, top,
            bottom)
          </li>
          <li>Change the font color</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Overlay Feature</h2>
        <p className="text-muted-foreground mt-2">
          The <strong>Overlay</strong> feature is essential for ensuring
          accuracy. By uploading the original game&apos;s font texture, you can
          visually align and size your glyphs to match the official design as
          closely as possible.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Backup System</h2>
        <p className="text-muted-foreground mt-2">
          All changes are automatically saved locally, ensuring your progress is
          safe even if you refresh the page. You can also manually export and
          import <Badge className="font-extrabold">.json</Badge> backup files to
          move between devices or sessions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Recommended Fonts</h2>
        <p className="text-muted-foreground mt-2">
          When choosing a custom font, prefer professional and well-structured
          font families. Here are a few highly recommended options:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
          <li>
            <strong>Noto Sans</strong> – Wide Unicode coverage, clean and
            neutral style
          </li>
          <li>
            <strong>Roboto</strong> – Good readability, versatile, modern
          </li>
          <li>
            <strong>Inter</strong> – Designed for screen legibility, highly
            optimized for UI
          </li>
        </ul>
        <p className="text-muted-foreground mt-2">
          These fonts offer excellent balance between compactness and
          readability, making them ideal choices for modifications without
          breaking the game&apos;s visual flow.
        </p>
      </section>
    </div>
  );
}
