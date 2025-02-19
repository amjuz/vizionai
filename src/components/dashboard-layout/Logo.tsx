// import { Eye } from "lucide-react";
import Link from "next/link";

import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "default" | "glowing";
}

const Logo: React.FC<LogoProps> = ({
  size = 24,
  className = "",
  variant = "default",
}) => {
  const baseColor = variant === 'glowing' ? 'rgb(245, 158, 11)' : 'rgb(161, 98, 7)';
  const containerSize = size * 1.5;
  
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <div
        style={{
          width: containerSize,
          height: containerSize,
        }}
        className={`
        relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5
        flex items-center justify-center
        shadow-lg backdrop-blur-sm
        before:absolute before:inset-0 
        before:rounded-2xl before:p-[1px]
        before:bg-gradient-to-b before:from-white/20 before:to-white/5
        before:-z-10
        ${variant === "glowing" ? "before:animate-pulse" : ""}
        ${className}
      `}
      >
        <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-sm -z-20" />

        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={baseColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`
          relative
          ${
            variant === "glowing"
              ? "drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]"
              : ""
          }
        `}
        >
          {/* Natural curved eyelashes */}
          <path d="M5 8.5C4.5 7.5 3.5 7 3 6.5" strokeWidth="1.2" />
          <path d="M7.5 7.5C7.2 6.2 6.5 5.5 6 5" strokeWidth="1.2" />
          <path d="M10 7C10 5.5 9.5 4.8 9 4.3" strokeWidth="1.2" />
          <path d="M14 7C14 5.5 14.5 4.8 15 4.3" strokeWidth="1.2" />
          <path d="M16.5 7.5C16.8 6.2 17.5 5.5 18 5" strokeWidth="1.2" />
          <path d="M19 8.5C19.5 7.5 20.5 7 21 6.5" strokeWidth="1.2" />

          {/* Eye shape - more almond-like */}
          <path d="M3 12c0 0 3-7 9-7s9 7 9 7-3 7-9 7-9-7-9-7z" />
          <path
            d="M4 12c0 0 2.5-5 8-5s8 5 8 5-2.5 5-8 5-8-5-8-5"
            strokeOpacity="0.3"
          />

          {/* Iris with gradient */}
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="2.5" strokeOpacity="0.5" />

          {/* Pupil */}
          <circle cx="12" cy="12" r="1.5" fill={baseColor} />

          {/* Light reflection */}
          <circle cx="13" cy="11" r="0.5" fill="white" stroke="none" />
        </svg>
      </div>
      <span className="text-lg font-semibold">Vizion AI</span>
    </Link>
  );
};

export default Logo;
