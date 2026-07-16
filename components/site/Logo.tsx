import { useId } from "react";

export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const g = `vg-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={g}
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21d4fd" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ff5cf0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#0b0c18" />
      <rect
        x="2.75"
        y="2.75"
        width="42.5"
        height="42.5"
        rx="11.25"
        stroke={`url(#${g})`}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <rect x="7" y="7" width="12" height="12" rx="3.5" fill={`url(#${g})`} />
      <rect x="9.2" y="9.2" width="7.6" height="7.6" rx="2.2" fill="#0b0c18" />
      <rect x="11" y="11" width="4" height="4" rx="1.2" fill={`url(#${g})`} />
      <rect x="29" y="7" width="12" height="12" rx="3.5" fill={`url(#${g})`} />
      <rect x="31.2" y="9.2" width="7.6" height="7.6" rx="2.2" fill="#0b0c18" />
      <rect x="33" y="11" width="4" height="4" rx="1.2" fill={`url(#${g})`} />
      <rect x="7" y="29" width="12" height="12" rx="3.5" fill={`url(#${g})`} />
      <rect x="9.2" y="31.2" width="7.6" height="7.6" rx="2.2" fill="#0b0c18" />
      <rect x="11" y="33" width="4" height="4" rx="1.2" fill={`url(#${g})`} />
      <path
        d="M27.5 27.5 L34 41 L40.5 27.5"
        stroke={`url(#${g})`}
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="text-lg font-semibold tracking-tight">
        Vyntrix<span className="gradient-text"> QR</span>
      </span>
    </span>
  );
}
