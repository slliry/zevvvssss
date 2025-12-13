import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import useInView from '../hooks/useInView.js';

const integrations = [
  // Endpoint / Threat Protection
  { name: 'Nmap', logo: '/nmap_logo.png', color: 'from-blue-500 to-blue-700' },
  { name: 'Nessus', logo: '/Nessus-Professional-FullColor-RGB.svg', color: 'from-green-500 to-emerald-600' },
  { name: 'Kaspersky', logo: '/Kaspersky_logo.svg', color: 'from-red-500 to-red-700' },
  { name: 'CrowdStrike', logo: '/CrowdStrike_logo.svg', color: 'from-red-600 to-orange-600' },
  { name: 'Trellix', logo: '/Trellix_Logo.svg', color: 'from-blue-600 to-indigo-700' },
  // Виртуализация и инфраструктура
  { name: 'VMware', logo: '/Vmware-by-broadcom.svg', color: 'from-blue-500 to-cyan-600' },
  // Identity & Access Management
  { name: 'Active Directory', logo: '/active-directory-1.svg', color: 'from-blue-700 to-indigo-800' },
  { name: 'Keycloak', logo: '/Logo_of_Keycloak.svg', color: 'from-indigo-600 to-purple-700' },
];

// Triple the array for infinite scroll
const infiniteIntegrations = [...integrations, ...integrations, ...integrations];

export default function Integrations() {
  const [sectionRef, isVisible] = useInView();
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const pauseTimeoutRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = prev - 1;
        // Reset when scrolled through one set
        if (Math.abs(newOffset) >= integrations.length * 200) {
          return 0;
        }
        return newOffset;
      });
    }, 30); // Smooth 30fps

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);

    // Apply the drag offset
    setOffset((prev) => {
      const newOffset = prev + info.offset.x;
      // Normalize offset to prevent jumping
      const maxOffset = integrations.length * 200;
      if (Math.abs(newOffset) >= maxOffset) {
        return newOffset % maxOffset;
      }
      return newOffset;
    });

    // Set pause state
    setIsPaused(true);

    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Resume after 3 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl">Интеграции</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Легко интегрируется с вашими существующими системами
          </p>
        </motion.div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ x: offset }}
            className="flex cursor-grab gap-6 active:cursor-grabbing"
          >
            {infiniteIntegrations.map((integration, index) => (
              <motion.div
                key={`${integration.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="group relative flex h-48 w-48 flex-shrink-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-2xl"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <div className="flex h-32 w-32 items-center justify-center">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* Animated corner accent */}
                <div
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${integration.color} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-gray-600">Не нашли нужную интеграцию?</p>
          <Link
            to="/request"
            className="inline-block rounded-3xl border-2 border-[#004aad] bg-white px-8 py-3 text-[#004aad] transition-all hover:bg-[#004aad] hover:text-white hover:shadow-lg"
          >
            Обсудить кастомную интеграцию
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
