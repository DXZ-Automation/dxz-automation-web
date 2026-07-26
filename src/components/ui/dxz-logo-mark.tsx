"use client";

import { useEffect, useRef } from "react";

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

function LogoIcon() {
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

    const satelliteCount = 8;
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
      className="relative aspect-[315/350] w-[118px] shrink-0 sm:w-[160px] md:w-[219px] lg:w-[269px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export function DxzLogoMark() {
  return (
    <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      <LogoIcon />
      <div className="flex flex-col">
        <span className="font-mono font-bold leading-none text-white text-[68px] sm:text-[92px] md:text-[126px] lg:text-[155px]">
          DXZ
        </span>
        <span
          className="my-1.5 block bg-[rgb(231,40,40)] sm:my-2 md:my-2.5"
          style={{ height: "clamp(7px, 2.3vw, 15px)" }}
        />
        <span className="font-mono leading-none text-gray-200 text-[30px] sm:text-[41px] md:text-[56px] lg:text-[70px]">
          Automation
        </span>
      </div>
    </div>
  );
}
