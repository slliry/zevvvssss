const particleConfigs = Array.from({ length: 28 }, (_, index) => {
  const t = index + 1;
  const rand = (seed) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const top = 4 + rand(t) * 92;
  const left = 4 + rand(t + 3.33) * 92;
  const variant = index % 4 === 0 ? 'line' : 'dot';
  const size = variant === 'line' ? 2 : 3 + rand(t + 7.21) * 4;

  return {
    top,
    left,
    variant,
    size,
    duration: 10 + rand(t + 5.5) * 8,
    delay: rand(t + 9.9) * -6,
  };
});

export default function FloatingParticles() {
  return (
    <div className="floating-particles" aria-hidden="true">
      {particleConfigs.map(({ top, left, variant, size, duration, delay }, index) => (
        <span
          key={`particle-${index}`}
          className={`particle ${variant === 'line' ? 'particle--line' : 'particle--dot'}`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: variant === 'line' ? `${size}px` : `${size}px`,
            height: variant === 'line' ? `${size * 9}px` : `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
