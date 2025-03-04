"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { AnchorHTMLAttributes, MouseEvent } from "react";

interface ITransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export default function TransitionLink({
  children,
  href,
  ...props
}: ITransitionLinkProps) {
  const router = useRouter();
  
  const sleep = (time: number) => {
    new Promise((r) => setTimeout(r, time));
  };

  async function handleTransition(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const body = await document.querySelector("body");
    body?.classList.add("page-transition")
    await sleep(1000)
    router.push(href);
    await sleep(1000)
    body?.classList.remove("page-transition");
  }
  return (
    <Link href={href} {...props} onClick={handleTransition}>
      {children}
    </Link>
  );
}
