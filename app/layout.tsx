import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";
import { THEME_SCRIPT } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Drop the "(Horatio)" parenthetical for the browser-tab title.
const shortName = profile.name.replace(/\s*\([^)]*\)/g, "").trim();

export const metadata: Metadata = {
  title: {
    default: shortName,
    template: `%s · ${shortName}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
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
      // The theme script below sets data-theme before React loads.
      suppressHydrationWarning
      data-theme="dark"
      // The Netflix-style pages scroll smoothly to row links (globals.css);
      // this tells Next.js to turn that off during page changes.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Dark or light, from the visitor's choice (lib/theme.ts), before the page draws. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
