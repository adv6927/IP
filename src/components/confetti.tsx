import { useMemo } from "react";

const COLORS = [
  "oklch(0.83 0.14 88)", // gold
  "oklch(0.9 0.07 95)", // champagne
  "oklch(0.55 0.13 162)", // emerald
  "oklch(0.96 0.015 95)", // cream
];

/** Pure-CSS confetti burst. Render only when a celebration is active. */
export function Confetti({ pieces = 70 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.2 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 260,
        spin: 360 + Math.random() * 900,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        round: Math.random() > 0.55,
      })),
    [pieces],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {bits.map((b) => (
        <span
          key={b.id}
          className="animate-confetti absolute top-0 block"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.round ? b.size : b.size * 0.45,
            backgroundColor: b.color,
            borderRadius: b.round ? "999px" : "2px",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            ["--drift" as string]: `${b.drift}px`,
            ["--spin" as string]: `${b.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
