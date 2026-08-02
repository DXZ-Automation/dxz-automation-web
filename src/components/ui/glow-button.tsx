"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type GlowButtonVariant = "red" | "grey";

interface GlowButtonOwnProps {
  children: ReactNode;
  variant?: GlowButtonVariant;
  className?: string;
}

type GlowButtonProps = GlowButtonOwnProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const BASE =
  "inline-flex items-center justify-center rounded-full px-10 py-5 font-mono text-lg font-medium text-white bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-[0_0_14px_3px_rgba(231,40,40,0.65)] hover:shadow-[0_0_34px_6px_rgba(255,90,90,0.95)] transition-[background-color,box-shadow] duration-300 ease-in";

export function GlowButton({ children, variant: _variant, className = "", href, ...props }: GlowButtonProps) {
  if (href) {
    return (
      <a className={`${BASE} ${className}`} href={href} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${BASE} ${className}`} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
