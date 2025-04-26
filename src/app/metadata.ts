import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "XII Font Editor",
    template: "%s | XII Font Editor",
  },
  description: "An advanced font editor for Final Fantasy XII fonts.",
  applicationName: "XII Font Editor",
  keywords: [
    "Final Fantasy XII",
    "Font Editor",
    "Glyph Editor",
    "Kerning Editor",
    "Game Fonts",
    "Atlas Editor",
  ],
  authors: [{ name: "FehDead" }],
  creator: "FehDead",
  publisher: "FehDead",
  generator: "Next.js",
  metadataBase: new URL("https://ff12fonteditor.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon-32x32.png"],
  },
  openGraph: {
    title: "XII Font Editor",
    description: "An advanced font editor for Final Fantasy XII fonts.",
    siteName: "XII Font Editor",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "XII Font Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XII Font Editor",
    description: "An advanced font editor for Final Fantasy XII fonts.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    title: "XII Font Editor",
    statusBarStyle: "black-translucent",
  },
};
