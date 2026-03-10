"use client";

import Image from "next/image";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="QueueTheoryApp"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      priority
    />
  );
}

