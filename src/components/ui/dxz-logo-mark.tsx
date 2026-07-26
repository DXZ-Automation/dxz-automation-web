"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";

/**
 * Reserves the settled text's natural rendered width so the letter-scramble
 * animation (which cycles through glyphs of varying advance width, since the
 * site font isn't monospace) can't reflow the surrounding layout — without
 * this, the hero logo (horizontally centered) visibly jitters left/right for
 * the ~800ms the scramble runs, a measured CLS regression.
 */
function StableWidthWord({
  text,
  className,
  wrapperClassName,
  children,
}: {
  text: string;
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
}) {
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [text, className]);

  return (
    <div className={cn("relative", wrapperClassName)} style={{ width }}>
      <span
        ref={measureRef}
        aria-hidden="true"
        className={cn("invisible absolute top-0 left-0 whitespace-nowrap", className)}
      >
        {text}
      </span>
      {children}
    </div>
  );
}

/** Exact red sampled from the source dxz-logo.png icon (rgb 231,40,40) — intentionally
 *  distinct from the site's brand red (#dc2626) used in the hero background. */
const LOGO_RED = "231, 40, 40";

interface Node {
  angle: number;
  radius: number;
  speed: number;
  x: number;
  y: number;
  size: number;
}

export function LogoIcon({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let hubRadius = 0;
    const mouse = { x: null as number | null, y: null as number | null };

    const satelliteCount = 12;
    const nodes: Node[] = Array.from({ length: satelliteCount }, (_, i) => ({
      angle: (i / satelliteCount) * Math.PI * 2,
      radius: 0,
      speed: 0.15 + Math.random() * 0.1,
      x: 0,
      y: 0,
      size: 0,
    }));

    function layout() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = width / 2;
      cy = height / 2;
      hubRadius = width * 0.17;
      const orbitRadius = width * 0.38;
      nodes.forEach((n, i) => {
        n.radius = orbitRadius * (0.85 + (i % 2 === 0 ? 0.15 : 0));
        n.size = width * 0.018;
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40) {
        mouse.x = x;
        mouse.y = y;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.angle += 0.0022 * n.speed * 60;
        let nx = cx + Math.cos(n.angle) * n.radius;
        let ny = cy + Math.sin(n.angle) * n.radius;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = nx - mouse.x;
          const dy = ny - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = width * 0.45;
          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius;
            nx += (dx / (dist || 1)) * force * width * 0.08;
            ny += (dy / (dist || 1)) * force * width * 0.08;
          }
        }

        n.x = nx;
        n.y = ny;
      });

      // spokes: hub -> satellite
      ctx.lineWidth = Math.max(1, width * 0.0035);
      nodes.forEach((n) => {
        ctx.strokeStyle = `rgba(${LOGO_RED}, 0.55)`;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      });

      // web: satellite -> neighboring satellite
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const b = nodes[(i + 1) % nodes.length];
        ctx.strokeStyle = `rgba(${LOGO_RED}, 0.3)`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // satellite dots
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${LOGO_RED}, 0.95)`;
        ctx.fill();
      });

      // hub
      ctx.beginPath();
      ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${LOGO_RED})`;
      ctx.fill();
    };

    layout();
    animate();

    window.addEventListener("resize", layout);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", layout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[315/350] w-[118px] shrink-0 sm:w-[160px] md:w-[219px] lg:w-[269px]",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

interface LogoWordmarkProps {
  dxzClassName?: string;
  dxzGapClassName?: string;
  underlineClassName?: string;
  automationClassName?: string;
  automationGapClassName?: string;
  groupRef?: RefObject<HTMLDivElement | null>;
}

export function LogoWordmark({
  dxzClassName,
  dxzGapClassName,
  underlineClassName,
  automationClassName,
  automationGapClassName,
  groupRef,
}: LogoWordmarkProps) {
  const dxzClasses = cn("font-bold leading-none text-white text-[68px] sm:text-[92px] md:text-[126px] lg:text-[155px]", dxzClassName);
  const automationClasses = cn("font-bold leading-none text-gray-200 text-[30px] sm:text-[41px] md:text-[56px] lg:text-[70px]", automationClassName);

  return (
    <div ref={groupRef} className="flex flex-col">
      <StableWidthWord
        text="DXZ"
        className={dxzClasses}
        wrapperClassName={cn("-mb-[14px] sm:-mb-[18px] md:-mb-[24px] lg:-mb-[29.5px]", dxzGapClassName)}
      >
        <HyperText text="DXZ" className={dxzClasses} />
      </StableWidthWord>
      <span
        className={cn(
          "my-0.5 block h-[8px] bg-[rgb(231,40,40)] shadow-[0_0_14px_3px_rgba(231,40,40,0.65)] transition-shadow duration-300 ease-in hover:shadow-[0_0_34px_6px_rgba(255,90,90,0.95)] sm:h-[10px] md:h-[13px] lg:h-[15px]",
          underlineClassName
        )}
      />
      <StableWidthWord
        text="AUTOMATION"
        className={automationClasses}
        wrapperClassName={cn("-mt-[7px] sm:-mt-[9px] md:-mt-[12px] lg:-mt-[14px]", automationGapClassName)}
      >
        <HyperText text="AUTOMATION" className={automationClasses} />
      </StableWidthWord>
    </div>
  );
}

interface DxzLogoProps {
  iconClassName?: string;
  dxzClassName?: string;
  dxzGapClassName?: string;
  underlineClassName?: string;
  automationClassName?: string;
  automationGapClassName?: string;
  gapClassName?: string;
}

/** Icon + wordmark, with the icon's hub vertically centered on the whole DXZ/bar/AUTOMATION
 *  group (measured, not eyeballed, since the group's height shifts with responsive text sizes). */
export function DxzLogo({ iconClassName, dxzClassName, dxzGapClassName, underlineClassName, automationClassName, automationGapClassName, gapClassName }: DxzLogoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconWrapRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [iconMarginTop, setIconMarginTop] = useState(0);

  useEffect(() => {
    const align = () => {
      const container = containerRef.current;
      const iconWrap = iconWrapRef.current;
      const group = groupRef.current;
      if (!container || !iconWrap || !group) return;
      const containerTop = container.getBoundingClientRect().top;
      const groupRect = group.getBoundingClientRect();
      const groupCenterY = groupRect.top + groupRect.height / 2 - containerTop;
      setIconMarginTop(groupCenterY - iconWrap.getBoundingClientRect().height / 2);
    };
    align();
    window.addEventListener("resize", align);
    return () => window.removeEventListener("resize", align);
  }, []);

  return (
    <div ref={containerRef} className={cn("inline-flex items-start gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5", gapClassName)}>
      <div ref={iconWrapRef} style={{ marginTop: iconMarginTop }}>
        <LogoIcon className={iconClassName} />
      </div>
      <LogoWordmark
        dxzClassName={dxzClassName}
        dxzGapClassName={dxzGapClassName}
        underlineClassName={underlineClassName}
        automationClassName={automationClassName}
        automationGapClassName={automationGapClassName}
        groupRef={groupRef}
      />
    </div>
  );
}

export function DxzLogoMark() {
  return <DxzLogo />;
}
