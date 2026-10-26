import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sreeraj3d.com"),
  title: "Sreeraj — 3D Artist, Character Designer & Animator | Blender Specialist",
  description:
    "Portfolio of Sreeraj, a freelance 3D artist, character designer, and 3D animator specializing in expressive character sculpts, rigging, and cinematic animation in Blender.",
  keywords: [
    "Sreeraj",
    "3D Artist",
    "Character Designer",
    "3D Animator",
    "Blender 3D",
    "Character Sculpting",
    "Rigging",
    "Unreal Engine",
    "ZBrush",
    "Substance Painter",
  ],
  authors: [{ name: "Sreeraj" }],
  creator: "Sreeraj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sreeraj3d.com",
    title: "Sreeraj — 3D Artist, Character Designer & Animator",
    description:
      "Crafting expressive characters and cinematic 3D animations in Blender. Explore interactive 3D turntables, breakdowns, and showreels.",
    siteName: "Sreeraj 3D Portfolio",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Sreeraj 3D Character Art & Animation Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sreeraj — 3D Artist, Character Designer & Animator",
    description:
      "Crafting expressive characters and cinematic 3D animations in Blender. Interactive 3D portfolio.",
    images: ["/og-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="bg-canvas text-text-secondary font-body selection:bg-ember selection:text-ember-dark min-h-screen flex flex-col">
        {/* Skip to Main Content for Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ember focus:text-ember-dark focus:font-semibold focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
