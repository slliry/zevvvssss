import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useInView from '../hooks/useInView.js';

export default function Hero() {
  const [sectionRef, isVisible] = useInView(0.2);

  return (
    <section
      ref={sectionRef}
      id="решения"
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} relative overflow-hidden py-20 md:py-32 lg:py-40`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-veil" />
        <div className="hero-geometry hero-geometry--one" />
        <div className="hero-geometry hero-geometry--two" />
        <div className="hero-geometry hero-geometry--three" />
        <div className="hero-geometry hero-geometry--four" />
        <div className="hero-gridlines" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-[#0066FF]/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-[#0066FF]">
            Zeus Platform
          </p>
          <h1 className="mb-6 text-5xl tracking-tight text-[#1A1A1A] md:text-6xl lg:text-7xl">
            Управляйте рисками <br />
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              без сложностей
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-gray-600 md:text-2xl">
            Zeus GRC — комплексная платформа для управления рисками, комплаенсом и непрерывностью бизнеса.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/request"
              className="group flex items-center justify-center gap-2 rounded-3xl bg-[#0066FF] px-8 py-4 text-white transition-colors hover:bg-[#0052CC]"
            >
              Попробовать бесплатно
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
