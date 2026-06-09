import { memo } from 'react';

function ZeusLightning() {
    return (
        <div className="pointer-events-none absolute inset-0">
            {/* Background glow */}
            <div className="hero-veil" />

            {/* Energy Orbs */}
            <div className="zeus-orb zeus-orb--one" />
            <div className="zeus-orb zeus-orb--two" />
            <div className="zeus-orb zeus-orb--three" />
            <div className="zeus-orb zeus-orb--four" />

            {/* Grid background */}
            <div className="hero-gridlines" />
        </div>
    );
}

export default memo(ZeusLightning);
