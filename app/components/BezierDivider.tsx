"use client";

import { useRef, useEffect } from "react";

type BezierDividerProps = {
  intensity?: number;     // force de distorsion
  maxDistortion?: number; // limite max
  ease?: number;          // vitesse de retour
};

export default function BezierDivider({
  intensity = 1,
  maxDistortion = 120,
  ease = 0.12,
}: BezierDividerProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const progress = useRef(0);
  const target = useRef(0);
  const mouseX = useRef(0.5);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const setPath = () => {
    if (!wrapperRef.current) return;

    const width = wrapperRef.current.offsetWidth;
    const height = 40;

    const d = `
      M 0 ${height}
      Q ${width * mouseX.current} ${height + progress.current}
      ${width} ${height}
    `;

    pathRef.current?.setAttribute("d", d);
  };

  const animate = () => {
    progress.current = lerp(progress.current, target.current, ease);
    setPath();
    rafRef.current = requestAnimationFrame(animate);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    mouseX.current = (e.clientX - rect.left) / rect.width;

    target.current += e.movementY * intensity;
    target.current = Math.max(
      -maxDistortion,
      Math.min(maxDistortion, target.current)
    );
  };

  const onMouseEnter = () => {
    if (!rafRef.current) animate();
  };

  const onMouseLeave = () => {
    target.current = 0;
  };

  useEffect(() => {
    setPath();
    window.addEventListener("resize", setPath);

    return () => {
      window.removeEventListener("resize", setPath);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: "100%",
        height: "60px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <svg width="100%" height="60">
        <path
          ref={pathRef}
          fill="none"
          stroke="rgba(220, 220, 220, 0.426)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
