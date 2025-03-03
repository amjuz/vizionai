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
  const baseColor =
    variant === "glowing" ? "rgb(245, 158, 11)" : "rgb(161, 98, 7)";
  const containerSize = size * 1.5;

  return (
    <Link href={"/"} className="flex items-center gap-2">
      <div
        style={{
          width: containerSize,
          height: containerSize,
        }}
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 shadow-lg backdrop-blur-sm before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-white/5 before:p-[1px] ${variant === "glowing" ? "before:animate-pulse" : ""} ${className} `}
      >
        <div className="absolute inset-0 -z-20 rounded-2xl bg-black/20 backdrop-blur-sm" />
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <!-- Gradient background --> */}
          <defs>
            <linearGradient
              id="eyeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <radialGradient
              id="irisGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* <!-- Background circle with gradient --> */}
          <circle cx="16" cy="16" r="16" fill="url(#eyeGradient)" />

          {/* <!-- Outer eye shape with subtle shadow --> */}
          <path
            d="M4 16c0 0 4-9.33 12-9.33s12 9.33 12 9.33-4 9.33-12 9.33S4 16 4 16z"
            fill="#422006"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* <!-- Stylized eyelashes - more modern and sleek --> */}
          <path
            d="M7 11.5C6 9.5 4.5 9 3.5 8.5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M10 10C9.5 8 8 7 7 6.5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M13.5 9.5C13.5 7.5 12.5 6 11.5 5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M18.5 9.5C18.5 7.5 19.5 6 20.5 5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M22 10C22.5 8 24 7 25 6.5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M25 11.5C26 9.5 27.5 9 28.5 8.5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* <!-- Inner eye shape with depth --> */}
          <path
            d="M5 16c0 0 3.5-8 11-8s11 8 11 8-3.5 8-11 8S5 16 5 16z"
            fill="#78350f"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* <!-- Iris with gradient --> */}
          <circle
            cx="16"
            cy="16"
            r="5"
            fill="url(#irisGradient)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.8"
          />

          {/* <!-- Pupil with depth --> */}
          <circle
            cx="16"
            cy="16"
            r="2.5"
            fill="#422006"
            stroke="#fbbf24"
            strokeWidth="0.25"
          />

          {/* <!-- Multiple light reflections for depth --> */}
          <circle cx="17.5" cy="14.5" r="1" fill="white" opacity="0.9" />
          <circle cx="15" cy="15" r="0.5" fill="white" opacity="0.7" />

          {/* <!-- Subtle tech circuit lines --> */}
          <path
            d="M16 21.5L16 24"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <path
            d="M16 8L16 10.5"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <path
            d="M10.5 16L8 16"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <path
            d="M24 16L21.5 16"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeLinecap="round"
          />

          {/* <!-- Subtle glow overlay --> */}
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            fill="none"
          />
        </svg>
      </div>
      <span className="text-lg font-semibold">Vizion AI</span>
    </Link>
  );
};

export default Logo;
// <svg
//   width={size}
//   height={size}
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke={baseColor}
//   strokeWidth="1.5"
//   strokeLinecap="round"
//   strokeLinejoin="round"
//   className={`
//   relative
//   ${
//     variant === "glowing"
//       ? "drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]"
//       : ""
//   }
// `}
// >
//   {/* Natural curved eyelashes */}
//   <path d="M5 8.5C4.5 7.5 3.5 7 3 6.5" strokeWidth="1.2" />
//   <path d="M7.5 7.5C7.2 6.2 6.5 5.5 6 5" strokeWidth="1.2" />
//   <path d="M10 7C10 5.5 9.5 4.8 9 4.3" strokeWidth="1.2" />
//   <path d="M14 7C14 5.5 14.5 4.8 15 4.3" strokeWidth="1.2" />
//   <path d="M16.5 7.5C16.8 6.2 17.5 5.5 18 5" strokeWidth="1.2" />
//   <path d="M19 8.5C19.5 7.5 20.5 7 21 6.5" strokeWidth="1.2" />

//   {/* Eye shape - more almond-like */}
//   <path d="M3 12c0 0 3-7 9-7s9 7 9 7-3 7-9 7-9-7-9-7z" />
//   <path
//     d="M4 12c0 0 2.5-5 8-5s8 5 8 5-2.5 5-8 5-8-5-8-5"
//     strokeOpacity="0.3"
//   />

//   {/* Iris with gradient */}
//   <circle cx="12" cy="12" r="3.5" />
//   <circle cx="12" cy="12" r="2.5" strokeOpacity="0.5" />

//   {/* Pupil */}
//   <circle cx="12" cy="12" r="1.5" fill={baseColor} />

//   {/* Light reflection */}
//   <circle cx="13" cy="11" r="0.5" fill="white" stroke="none" />
// </svg>
