import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function isProd() {
//   if (process.env.NODE_ENV === "production") return true;
//   if (process.env.NODE_ENV === "development") return false;
// }
