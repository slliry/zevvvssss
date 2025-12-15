import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';
import useTypingEffect from '../hooks/useTypingEffect.js';
import ZeusLightning from './ZeusLightning.jsx';

export default function Hero() {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useInView(0.2);

  const heading1 = t('hero.heading1');
  const heading2 = t('hero.heading2');
  const description = t('hero.description');

  const [displayedHeading1, heading1Complete] = useTypingEffect(heading1, 30, 200);
  const [displayedHeading2, heading2Complete] = useTypingEffect(heading2, 30, heading1Complete ? 50 : 999999);
  const [displayedDescription] = useTypingEffect(description, 15, heading2Complete ? 50 : 999999);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} relative overflow-hidden min-h-screen flex items-center`}
    >
      <ZeusLightning />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-[#004aad]/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-[#004aad]">
            {t('hero.badge')}
          </p>
          <h1 className="mb-6 text-5xl tracking-tight text-[#1A1A1A] md:text-6xl lg:text-7xl">
            {displayedHeading1}
            <br />
            <span className="bg-gradient-to-r from-[#004aad] to-[#0066cc] bg-clip-text text-transparent">
              {displayedHeading2}
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-gray-600 md:text-2xl">
            {displayedDescription}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/request"
              className="group flex items-center justify-center gap-2 rounded-3xl bg-[#004aad] px-8 py-4 text-white transition-colors hover:bg-[#003580]"
            >
              {t('hero.cta')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
