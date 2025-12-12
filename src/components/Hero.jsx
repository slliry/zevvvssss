import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useInView from '../hooks/useInView.js';
import ZeusLightning from './ZeusLightning.jsx';

export default function Hero() {
  const [sectionRef, isVisible] = useInView(0.2);

  return (
    <section
      ref={sectionRef}
      id="решения"
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} relative overflow-hidden min-h-screen flex items-center`}
    >
      <ZeusLightning />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-[#004aad]/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-[#004aad]">
            Zeus Platform
          </p>
          <h1 className="mb-6 text-5xl tracking-tight text-[#1A1A1A] md:text-6xl lg:text-7xl">
            Комплексная платформа <br />
            <span className="bg-gradient-to-r from-[#004aad] to-[#0066cc] bg-clip-text text-transparent">
              управления GRC
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-gray-600 md:text-2xl">
            Zeus GRC объединяет управление активами, рисками, аудитом и контролем в единой автоматизированной системе. Обеспечьте соответствие требованиям и прозрачность бизнес-процессов.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/request"
              className="group flex items-center justify-center gap-2 rounded-3xl bg-[#004aad] px-8 py-4 text-white transition-colors hover:bg-[#003580]"
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
