"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    d: `M-${800 - i * 8 * position} -${400 + i * 10}C-${
      800 - i * 8 * position
    } -${400 + i * 10} -${600 - i * 8 * position} ${500 - i * 10} ${
      300 - i * 8 * position
    } ${700 - i * 10}C${1200 - i * 8 * position} ${900 - i * 10} ${
      1600 - i * 8 * position
    } ${1400 - i * 10} ${1800 - i * 8 * position} ${1600 - i * 10}`,
    color: `rgba(15,23,42,${0.1 + i * 0.02})`,
    width: 0.5 + i * 0.02,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-white dark:text-white"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.15 + path.id * 0.02}
            initial={{ pathLength: 0.2, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.8, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundEffect() {
  return (
    <div className="absolute inset-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
