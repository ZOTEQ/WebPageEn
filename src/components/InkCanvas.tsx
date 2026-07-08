import { useRef, useEffect } from 'react';

interface Brush {
  x: number; y: number; vx: number; vy: number;
  size: number; color: string; alpha: number;
  life: number; maxLife: number; prevY: number;
}

const COLORS = [
  'rgba(194,65,12,', 'rgba(194,122,90,', 'rgba(120,100,70,',
  'rgba(180,140,80,', 'rgba(160,100,80,', 'rgba(140,120,90,',
];

function createBrush(w: number, h: number): Brush {
  return {
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 2.5, vy: (Math.random() - 0.5) * 2.5,
    size: 50 + Math.random() * 150,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.05 + Math.random() * 0.07,
    life: 0, maxLife: 180 + Math.random() * 350, prevY: 0,
  };
}

export default function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const brushes: Brush[] = [];
    for (let i = 0; i < 30; i++) brushes.push(createBrush(canvas.width, canvas.height));

    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX / canvas.width; mouse.y = e.clientY / canvas.height; };
    window.addEventListener('mousemove', onMove);

    let frame = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      frame++;

      ctx.fillStyle = 'rgba(237,232,224,0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < brushes.length; i++) {
        const b = brushes[i];
        b.life++;

        const dx = mouse.x * canvas.width - b.x;
        const dy = mouse.y * canvas.height - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400 && dist > 1) { b.vx += (dx / dist) * 0.014; b.vy += (dy / dist) * 0.014; }

        b.vx += Math.sin(frame * 0.0028 + i * 0.9) * 0.065;
        b.vy += Math.cos(frame * 0.0022 + i * 0.6) * 0.055;
        b.vx *= 0.974; b.vy *= 0.974;
        const prevX = b.x, prevY = b.y;
        b.x += b.vx; b.y += b.vy;

        if (b.life > b.maxLife || b.x < -200 || b.x > canvas.width + 200 || b.y < -200 || b.y > canvas.height + 200) {
          brushes[i] = createBrush(canvas.width, canvas.height); continue;
        }

        const lr = b.life / b.maxLife;
        const alpha = b.alpha * (1 - lr * lr);
        const size = b.size * (1 + lr * 0.25);

        for (let j = 0; j < 3; j++) {
          const ox = (Math.random() - 0.5) * size * 0.35;
          const oy = (Math.random() - 0.5) * size * 0.35;
          const g = ctx.createRadialGradient(b.x + ox, b.y + oy, 0, b.x + ox, b.y + oy, size * (0.45 + j * 0.22));
          g.addColorStop(0, b.color + (alpha * (0.65 - j * 0.1)) + ')');
          g.addColorStop(1, b.color + '0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(b.x + ox, b.y + oy, size * (0.65 + j * 0.22), 0, Math.PI * 2); ctx.fill();
        }

        const grad = ctx.createLinearGradient(prevX, prevY, b.x, b.y);
        grad.addColorStop(0, b.color + '0)');
        grad.addColorStop(0.5, b.color + (alpha * 0.12) + ')');
        grad.addColorStop(1, b.color + '0)');
        ctx.strokeStyle = grad; ctx.lineWidth = size * 0.18; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.quadraticCurveTo(
          prevX + (b.x - prevX) * 0.5 + Math.sin(frame * 0.008) * 12,
          prevY + (b.y - prevY) * 0.5 + Math.cos(frame * 0.008) * 12,
          b.x, b.y
        );
        ctx.stroke();
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}
