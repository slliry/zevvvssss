import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useInView from '../hooks/useInView.js';

export default function CTA() {
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#004aad] to-[#0066cc] p-12 text-center text-white md:p-16 lg:p-20">
          <h2 className="mb-6 text-4xl text-white md:text-5xl lg:text-6xl">Готовы начать?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90 md:text-2xl">
            Получите бесплатную консультацию и узнайте, как Zeus GRC может трансформировать управление рисками в вашей компании
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/request"
              className="group flex items-center justify-center gap-2 rounded-3xl bg-white px-8 py-4 text-[#004aad] transition-colors hover:bg-gray-100"
            >
              Получить консультацию
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
