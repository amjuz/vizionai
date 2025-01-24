import { Sparkle } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Sparkle className="size-8" strokeWidth={1.5} />
      <span className="text-lg font-semibold">Vizion AI</span>
    </Link>
  );
}
