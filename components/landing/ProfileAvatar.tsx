import { landing, profile } from "@/lib/content";
import type { ViewerProfile } from "@/lib/content";

/**
 * Square avatar for a "Who's watching?" profile: the profile photo, with
 * sunglasses for the cooler one. Set the size and corners with `className`.
 */
export default function ProfileAvatar({
  viewer,
  className = "",
}: {
  viewer: ViewerProfile;
  className?: string;
}) {
  return (
    <span className={`relative block aspect-square shrink-0 overflow-hidden bg-[#2563eb] ${className}`}>
      {profile.photo ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${profile.photo})`,
            backgroundSize: landing.avatarCrop.size,
            backgroundPosition: landing.avatarCrop.position,
          }}
        />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 10 10" className="absolute inset-0 h-full w-full">
          <text x="5" y="7" textAnchor="middle" fontSize="6" fontWeight="600" fill="#fff">
            {viewer.name.trim().charAt(0).toUpperCase()}
          </text>
        </svg>
      )}
      {viewer.sunglasses ? <Sunglasses /> : null}
    </span>
  );
}

function Sunglasses() {
  const { left, top, width } = landing.sunglasses;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 32"
      className="absolute -translate-x-1/2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.45)]"
      style={{ left, top, width }}
    >
      <path d="M0 3h100v6H0z" fill="#0b0b0b" />
      <path d="M3 6h42l-2 16q-1 7-9 7H14q-8 0-9-7z" fill="#0b0b0b" />
      <path d="M55 6h42l-2 16q-1 7-9 7H66q-8 0-9-7z" fill="#0b0b0b" />
      <path
        d="M13 12l-3 9M65 12l-3 9"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
