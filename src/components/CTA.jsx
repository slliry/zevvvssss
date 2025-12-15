import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function CTA() {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} relative py-20 md:py-32 overflow-hidden`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Floating Card Container */}
        <div className="relative mx-auto max-w-5xl">
          {/* Glow Effect Background */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#004aad] via-[#0066cc] to-[#004aad] opacity-75 blur-2xl"></div>

          {/* Main Card */}
          <div className="relative rounded-[2rem] bg-gradient-to-br from-[#004aad] to-[#0066cc] p-12 text-center text-white shadow-2xl md:p-16 lg:p-20">
            {/* Decorative Elements */}
            <div className="absolute top-8 right-8 h-24 w-24 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-8 left-8 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>

            {/* Geometric Decorations */}
            <div className="absolute top-12 left-12 h-16 w-16 rotate-12 rounded-lg border-2 border-white/20"></div>
            <div className="absolute bottom-16 right-16 h-12 w-12 -rotate-12 rounded-full border-2 border-white/20"></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl lg:text-2xl leading-relaxed">
                {t('cta.description')}
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/request"
                  className="group flex items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-semibold text-[#004aad] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {t('cta.button')}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
