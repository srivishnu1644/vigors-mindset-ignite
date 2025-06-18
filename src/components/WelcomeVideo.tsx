
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function WelcomeVideo({ onComplete }: { onComplete: () => void }) {
    const [currentText, setCurrentText] = useState(0);
    
    const texts = [
        "WELCOME",
        "TO THE VIGORS CLUB",
        "EXPERIENCE YOUR FITNESS WORLD",
        "LIKE NEVER BEFORE",
        "BECAUSE",
        "WE DO IT IN",
        "THE VIGORS WAY",
        "BECAUSE WE BELIEVE IN",
        "MINDSET IS A STATEMENT OF SUCCESS"
    ];

    const durations = [
        1700, // WELCOME - 1.7s
        1700, // TO THE VIGORS CLUB - 1.7s
        1700, // EXPERIENCE YOUR FITNESS WORLD - 1.7s
        1700, // LIKE NEVER BEFORE - 1.7s
        1700, // BECAUSE - 1.7s
        1700, // WE DO IT IN - 1.7s
        1700, // THE VIGORS WAY - 1.7s
        1500, // BECAUSE WE BELIEVE IN - 1.5s
        3000  // MINDSET IS A STATEMENT OF SUCCESS - 3s
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentText < texts.length - 1) {
                setCurrentText(currentText + 1);
            } else {
                onComplete();
            }
        }, durations[currentText]);

        return () => clearTimeout(timer);
    }, [currentText, onComplete, texts.length, durations]);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black dark:bg-black">
            {/* Blurred background */}
            <div className="absolute inset-0 blur-sm">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Sharp overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.h1 
                        key={currentText}
                        initial={{ 
                            opacity: 0, 
                            scale: 0.5, 
                            filter: "blur(20px)",
                            y: 50
                        }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            filter: "blur(0px)",
                            y: 0
                        }}
                        exit={{ 
                            opacity: 0, 
                            scale: 0.8, 
                            filter: "blur(10px)",
                            y: -30
                        }}
                        transition={{ 
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 dark:from-white dark:to-white/80 drop-shadow-2xl"
                    >
                        {texts[currentText]}
                    </motion.h1>
                </motion.div>
            </div>
        </div>
    );
}
