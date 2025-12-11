import { Zap, Lock, Users } from 'lucide-react';
import useInView from '../hooks/useInView.js';

const benefits = [
  {
    icon: Zap,
    title: 'Быстрое внедрение',
    description: 'Запуск системы за 2 недели с полной настройкой под ваши процессы',
    stats: '14 дней',
  },
  {
    icon: Lock,
    title: 'Безопасность данных',
    description: 'Соответствие ГОСТ, ISO 27001 и другим стандартам информационной безопасности',
    stats: '100% защита',
  },
  {
    icon: Users,
    title: 'Экспертная поддержка',
    description: 'Команда специалистов по GRC готова помочь 24/7',
    stats: '24/7 поддержка',
  },
];

export default function Benefits() {
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
      id="преимущества"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">Почему Zeus GRC</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Преимущества, которые выделяют нас среди конкурентов
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description, stats }, index) => (
            <article
              key={title}
              className="rounded-3xl border border-gray-200 bg-white p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#0066FF] hover:shadow-xl"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF]">
                <Icon className="text-white" size={36} />
              </div>
              <div className="mb-4 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-4xl text-transparent">
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
