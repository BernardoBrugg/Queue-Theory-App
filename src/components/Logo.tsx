"use client";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logo-grad-1" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="0" y1="32" x2="64" y2="32">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#logo-grad-1)" opacity="0.12" />
      <circle cx="20" cy="36" r="4.5" fill="url(#logo-grad-2)" />
      <circle cx="32" cy="36" r="4.5" fill="url(#logo-grad-2)" opacity="0.7" />
      <circle cx="44" cy="36" r="4.5" fill="url(#logo-grad-2)" opacity="0.4" />
      <path
        d="M44 30C44 22.268 38.627 18 32 18C25.373 18 20 22.268 20 30"
        stroke="url(#logo-grad-1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M38 26C38 21.582 35.314 20 32 20C28.686 20 26 21.582 26 26"
        stroke="url(#logo-grad-1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
