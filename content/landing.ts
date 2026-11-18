import type { LandingContent } from "./types";
import { profile } from "./profile";

// ─────────────────────────────────────────────────────────────
// EDIT ME — the landing page at "/".
// 1. A short intro shows `wordmark` in red, then zooms it out.
// 2. A "Who's watching?" screen shows `profiles`. Every profile opens
//    the same page (`profileHref`). Only the avatar and the banner
//    picture on that page are different.
// ─────────────────────────────────────────────────────────────

export const landing: LandingContent = {
  // "Jingyan (Horatio) Xu" → "Jingyan Xu". Replace with any text you like.
  wordmark: profile.name.replace(/\s*\([^)]*\)/g, "").trim(),
  // `banner` (optional): the background picture of the /browse banner for this profile.
  // Put a GIF / meme / image in /public, then e.g.
  //   banner: { src: "/banners/horatio.gif", alt: "Short description for screen readers" },
  profiles: [
    {
      name: "Horatio",
      // It's Always Sunny in Philadelphia (FX), via GIPHY: l0IykOsxLECVejOzm
      banner: {
        src: "/banners/horatio.mp4",
        alt: "Charlie Day in front of a conspiracy board covered in red string, from It's Always Sunny in Philadelphia",
      },
    },
    {
      name: "Cooler Horatio",
      sunglasses: true,
      // MSNBC, via GIPHY: 456932Jh97sW4yAuq3
      banner: {
        src: "/banners/cooler-horatio.mp4",
        alt: "Steve Kornacki pointing at the 2018 midterm elections map on MSNBC's big board",
      },
    },
  ],
  profileHref: "/browse",
  // If you change profile.jpg, adjust these two so the face sits in the tile.
  avatarCrop: { size: "142.5% auto", position: "56.9% 22.1%" },
  sunglasses: { left: "50%", top: "46%", width: "36%" },
};
