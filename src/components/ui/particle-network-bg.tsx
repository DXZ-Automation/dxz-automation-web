"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COLOR = "rgba(220, 38, 38, 0.85)";
const LINE_COLOR_BASE = "220, 38, 38";
const LINE_COLOR_HIGHLIGHT = "rgba(255, 255, 255,";

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
    this.canvas = canvas;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(mouse: { x: number | null; y: number | null; radius: number }) {
    if (this.x > this.canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= forceDirectionX * force * 5;
        this.y -= forceDirectionY * force * 5;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

/** Fixed, viewport-sized particle network rendered once behind every section so the
 *  hero's animated background reads as one continuous surface for the whole page,
 *  instead of stopping at the hero's fold. Sections stay transparent over it. */
export function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    function init() {
      if (!canvas || !ctx) return;
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        particles.push(new Particle(x, y, directionX, directionY, size, PARTICLE_COLOR, ctx, canvas));
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const connect = () => {
      if (!ctx || !canvas) return;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance =
            (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacityValue = 1 - distance / 20000;

            const dxMouseA = particles[a].x - (mouse.x ?? 0);
            const dyMouseA = particles[a].y - (mouse.y ?? 0);
            const distanceMouseA = Math.sqrt(dxMouseA * dxMouseA + dyMouseA * dyMouseA);

            if (mouse.x !== null && distanceMouseA < mouse.radius) {
              ctx.strokeStyle = `${LINE_COLOR_HIGHLIGHT} ${opacityValue})`;
            } else {
              ctx.strokeStyle = `rgba(${LINE_COLOR_BASE}, ${opacityValue})`;
            }

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!ctx || !canvas) return;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse);
      }
      connect();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 h-full w-full" />
    </div>
  );
}
