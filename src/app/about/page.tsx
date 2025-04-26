"use client";

import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="w-full space-y-4 mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        About FF12 Text Helper
      </h1>
      <p className="text-muted-foreground text-base leading-relaxed">
        <strong>FF12 Text Helper</strong> is a utility tool designed to assist
        with custom font editing for
        <em> Final Fantasy XII: The Zodiac Age</em>. It allows users to
        visualize, modify, and export glyph data stored in the game’s
        proprietary <code>.dat</code> font files. You can also import and edit
        readable
        <code>.txt</code> dumps or apply visual overlays based on the original
        atlas for accurate comparison.
      </p>

      <Separator />

      <h2 className="text-2xl font-semibold">Purpose</h2>
      <p className="text-muted-foreground text-base leading-relaxed">
        The tool was created with the intent of making it easier for translators
        and modders to bring the game to new languages and regions. Many
        languages require the addition or adjustment of glyphs due to unique
        alphabets, diacritics, or custom symbols. This tool makes that possible
        by offering a visual-first editing experience directly in the browser.
      </p>

      <p className="text-muted-foreground text-base leading-relaxed">
        Beyond translation, <strong>FF12 Text Helper</strong> also empowers the
        modding community to create custom fontpacks for their mods — enabling
        new aesthetics, fantasy scripts, or stylized UIs that enhance the
        identity of total conversions and narrative overhauls.
      </p>

      <Separator />

      <h2 className="text-2xl font-semibold">Technology & Features</h2>
      <p className="text-muted-foreground text-base leading-relaxed">
        This tool was built using <strong>React 19</strong>,{" "}
        <strong>Next.js 15</strong>, and the beautiful{" "}
        <a
          href="https://ui.shadcn.com"
          target="_blank"
          className="underline underline-offset-4"
        >
          ShadCN UI
        </a>{" "}
        component system. It features editable alignment controls, padding, line
        height, font weight and style, full custom font preview support, overlay
        comparisons, and data backup/import/export options. The canvas is built
        to match the in-game atlas resolution, ensuring pixel-perfect fidelity
        when exporting.
      </p>

      <Separator />

      <h2 className="text-2xl font-semibold">Credits</h2>
      <p className="text-muted-foreground text-base leading-relaxed">
        This tool was developed by{" "}
        <a
          href="https://next.nexusmods.com/profile/fehdead?gameId=2304"
          target="_blank"
          className="underline underline-offset-4"
        >
          FehDead
        </a>{" "}
        to support the <strong>Final Fantasy XII</strong> modding community.
      </p>

      <p className="text-muted-foreground text-base leading-relaxed">
        Special thanks go to{" "}
        <a
          href="https://next.nexusmods.com/profile/ffgriever?gameId=2304"
          target="_blank"
          className="underline underline-offset-4"
        >
          ffgriever
        </a>
        , for creating the amazing tools and script to extract font-dat and
        font-ker which I used as a basis for this toll. His work laid the
        foundation for this project — without that tools, this editor wouldn’t
        exist. Full credit is due to him for reverse engineering the original
        data structure and enabling all further exploration.
      </p>
    </div>
  );
}
