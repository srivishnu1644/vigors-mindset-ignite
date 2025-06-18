
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

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

export function Signup({ onBack, onSignIn, onSignUp }: { 
    onBack: () => void; 
    onSignIn: () => void;
    onSignUp: () => void;
}) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignUp();
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black dark:bg-black">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-md mx-auto"
                >
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                        <div className="flex items-center mb-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onBack}
                                className="text-white hover:bg-white/10 mr-3"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h2 className="text-2xl font-bold text-white">Join The Club</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-white">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white/95 hover:bg-white text-black font-semibold py-3"
                            >
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-white/60">
                                Already have an account?{" "}
                                <button onClick={onSignIn} className="text-white hover:underline">
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
