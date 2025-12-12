import { Zap, Lock, Users } from 'lucide-react';
import useInView from '../hooks/useInView.js';

const benefits = [
  {
    icon: Zap,
    title: 'Снижение затрат на комплаенс',
    description: 'Экономия на соблюдении нормативных требований и санкций за счёт автоматизации',
    stats: '25-30%',
  },
  {
    icon: Lock,
    title: 'Эффективность аудитов',
    description: 'Экономия времени на подготовку данных и ускорение процесса проведения аудита',
    stats: '45-90%',
  },
  {
    icon: Users,
    title: 'Покрытие ключевых точек',
    description: 'Повышение процента ключевых точек контроля при подготовке к аудиту',
    stats: '90%',
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
