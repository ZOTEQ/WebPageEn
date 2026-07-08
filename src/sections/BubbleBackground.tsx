import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  duration: number;
  delay: number;
}

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const colors = [
      'rgba(72, 187, 156, 0.08)',
      'rgba(56, 168, 216, 0.06)',
      'rgba(120, 200, 170, 0.07)',
      'rgba(184, 224, 212, 0.1)',
      'rgba(160, 210, 230, 0.06)',
    ];

    const bubbles: Bubble[] = [];
    const count = Math.min(25, Math.floor(w * h / 50000));

    for (let i = 0; i < count; i++) {
      bubbles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 60 + 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 5,
      });
    }

    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      bubbles.forEach(b => {
        const dy = Math.sin((t + b.delay) * 0.5) * 15;
        const dx = Math.cos((t + b.delay) * 0.3) * 8;
        const x = b.x + dx;
        const y = b.y + dy;

        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
