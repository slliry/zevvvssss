import { Zap, Lock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function Benefits() {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useInView();

  const benefits = [
    {
      icon: Zap,
      title: t('benefits.items.costReduction.title'),
      description: t('benefits.items.costReduction.description'),
      stats: t('benefits.items.costReduction.stats'),
    },
    {
      icon: Lock,
      title: t('benefits.items.auditEfficiency.title'),
      description: t('benefits.items.auditEfficiency.description'),
      stats: t('benefits.items.auditEfficiency.stats'),
    },
    {
      icon: Users,
      title: t('benefits.items.coverage.title'),
      description: t('benefits.items.coverage.description'),
      stats: t('benefits.items.coverage.stats'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
      id="benefits"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">{t('benefits.title')}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description, stats }, index) => (
            <article
              key={title}
              className="rounded-3xl border border-gray-200 bg-white p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#004aad] hover:shadow-xl"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#004aad] to-[#0066cc]">
                <Icon className="text-white" size={36} />
              </div>
              <div className="mb-4 bg-gradient-to-r from-[#004aad] to-[#0066cc] bg-clip-text text-4xl text-transparent">
                {stats}
              </div>
              <h3 className="mb-3 text-2xl">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
