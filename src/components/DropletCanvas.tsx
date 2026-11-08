import React, { useEffect, useRef } from 'react';

interface DropletCanvasProps {
  className?: string;
  intensity?: 'gentle' | 'vivid';
  tintColor?: string;
}

interface Droplet {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  trailLength: number;
  wobblePhase: number;
}

export const DropletCanvas: React.FC<DropletCanvasProps> = ({
  className = '',
  intensity = 'gentle',
  tintColor = 'rgba(255, 255, 255, 0.85)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropletsRef = useRef<Droplet[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const lastSpawnTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect prefers-reduced-motion to respect user vestibular accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateDimensions = (rectWidth: number, rectHeight: number) => {
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for power efficiency
      width = rectWidth;
      height = rectHeight;

      // Canvas internal buffer resolution matched to physical device pixels
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // CSS display size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scale context so drawing operations use CSS pixel coordinates
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initialRect = parent.getBoundingClientRect();
    updateDimensions(initialRect.width, initialRect.height);

    // Initial condensation beads
    const count = intensity === 'vivid' ? 32 : 18;
    dropletsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * (width || 300),
      y: Math.random() * (height || 300),
      radius: 1.2 + Math.random() * 2.4,
      speed: 0.15 + Math.random() * 0.4,
      opacity: 0.35 + Math.random() * 0.45,
      trailLength: 4 + Math.random() * 8,
      wobblePhase: Math.random() * Math.PI * 2
    }));

    // ResizeObserver tracks actual container geometry instead of fragile global window resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          updateDimensions(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(parent);

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (!isDocumentVisible && animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      } else if (isDocumentVisible && !animFrameRef.current && !prefersReducedMotion) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isDocumentVisible) return;
      ctx.clearRect(0, 0, width, height);

      const droplets = dropletsRef.current;
      const speedMultiplier = prefersReducedMotion ? 0 : (isHoveredRef.current ? 2.2 : 0.7);

      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        if (!prefersReducedMotion) {
          d.wobblePhase += 0.04;
          const wobbleX = Math.sin(d.wobblePhase) * 0.35;
          d.y += d.speed * speedMultiplier;
          d.x += wobbleX;

          if (d.y > height + 20) {
            d.y = -10;
            d.x = Math.random() * width;
            d.speed = 0.2 + Math.random() * 0.45;
          }
        }

        // Draw subtle condensation trail
        ctx.beginPath();
        const grad = ctx.createLinearGradient(d.x, d.y - d.trailLength, d.x, d.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${d.opacity * 0.16})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.radius * 0.7;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y - d.trailLength);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();

        // Bead droplet with glass highlight
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity * 0.6})`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 3;
        ctx.fill();

        // Specular pin highlight
        ctx.beginPath();
        ctx.arc(d.x - d.radius * 0.35, d.y - d.radius * 0.35, d.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = tintColor;
        ctx.shadowBlur = 0;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    if (!prefersReducedMotion) {
      animFrameRef.current = requestAnimationFrame(render);
    } else {
      render(); // Static single frame render for reduced motion
    }

    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
    };

    // Throttled interactive droplet spawning to prevent event loop saturation
    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const now = performance.now();
      if (now - lastSpawnTimeRef.current < 65) return; // Max ~15 spawns/sec

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (dropletsRef.current.length < 45) {
        dropletsRef.current.push({
          x: mouseX + (Math.random() - 0.5) * 16,
          y: mouseY + (Math.random() - 0.5) * 16,
          radius: 1.4 + Math.random() * 1.8,
          speed: 0.7 + Math.random() * 1.0,
          opacity: 0.8,
          trailLength: 8 + Math.random() * 12,
          wobblePhase: Math.random() * Math.PI
        });
        lastSpawnTimeRef.current = now;
      }
    };

    parent.addEventListener('mouseenter', onMouseEnter, { passive: true });
    parent.addEventListener('mouseleave', onMouseLeave, { passive: true });
    parent.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      parent.removeEventListener('mouseenter', onMouseEnter);
      parent.removeEventListener('mouseleave', onMouseLeave);
      parent.removeEventListener('mousemove', onMouseMove);
    };
  }, [intensity, tintColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-15 ${className}`}
      aria-hidden="true"
    />
  );
};
