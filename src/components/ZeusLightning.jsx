import { useEffect, useState } from 'react';

export default function ZeusLightning() {
    const [lightningStrikes, setLightningStrikes] = useState([]);

    useEffect(() => {
        const createLightning = () => {
            const id = Math.random();
            const strike = {
                id,
                x1: Math.random() * 100,
                y1: Math.random() * 100,
                x2: Math.random() * 100,
                y2: Math.random() * 100,
                duration: 0.3 + Math.random() * 0.4,
            };

            setLightningStrikes((prev) => [...prev, strike]);

            setTimeout(() => {
                setLightningStrikes((prev) => prev.filter((s) => s.id !== id));
            }, strike.duration * 1000);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                createLightning();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0">
            {/* Background glow */}
            <div className="hero-veil" />

            {/* Energy Orbs */}
            <div className="zeus-orb zeus-orb--one" />
            <div className="zeus-orb zeus-orb--two" />
            <div className="zeus-orb zeus-orb--three" />
            <div className="zeus-orb zeus-orb--four" />

            {/* Lightning SVG Container */}
            <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="1" />
                        <stop offset="50%" stopColor="#004aad" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.7" />
                    </linearGradient>
                </defs>

                {/* Animated Lightning Strikes */}
                {lightningStrikes.map((strike) => (
                    <g key={strike.id} className="lightning-strike" style={{ animationDuration: `${strike.duration}s` }}>
                        <path
                            d={`M ${strike.x1}% ${strike.y1}% L ${strike.x1 + (strike.x2 - strike.x1) * 0.3}% ${strike.y1 + (strike.y2 - strike.y1) * 0.4}% L ${strike.x1 + (strike.x2 - strike.x1) * 0.5}% ${strike.y1 + (strike.y2 - strike.y1) * 0.5}% L ${strike.x1 + (strike.x2 - strike.x1) * 0.7}% ${strike.y1 + (strike.y2 - strike.y1) * 0.8}% L ${strike.x2}% ${strike.y2}%`}
                            stroke="url(#lightningGradient)"
                            strokeWidth="2"
                            fill="none"
                            filter="url(#glow)"
                            strokeLinecap="round"
                        />
                    </g>
                ))}
            </svg>

            {/* Grid background */}
            <div className="hero-gridlines" />
        </div>
    );
}
