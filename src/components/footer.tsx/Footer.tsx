import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto flex w-full flex-col items-center gap-2 py-6 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getUTCFullYear()} Vizion AI Inc. All rights
        reserved{" "}
      </p>
      <nav className="flex gap-6 sm:ml-auto">
        <Link className="gap-4 sm:gap-6 text-xs hover:underline underline-offset-4" href={""}>Terms of service</Link>
        <Link className="gap-4 sm:gap-6 text-xs hover:underline underline-offset-4" href={""}>Privacy policy</Link>
      </nav>
    </footer>
  );
}
