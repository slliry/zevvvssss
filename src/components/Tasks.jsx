import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function Tasks() {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useInView();

  const tasks = [
    {
      number: '001',
      title: t('tasks.items.001.title'),
      description: t('tasks.items.001.description'),
    },
    {
      number: '002',
      title: t('tasks.items.002.title'),
      description: t('tasks.items.002.description'),
    },
    {
      number: '003',
      title: t('tasks.items.003.title'),
      description: t('tasks.items.003.description'),
    },
    {
      number: '004',
      title: t('tasks.items.004.title'),
      description: t('tasks.items.004.description'),
    },
    {
      number: '005',
      title: t('tasks.items.005.title'),
      description: t('tasks.items.005.description'),
    },
    {
      number: '006',
      title: t('tasks.items.006.title'),
      description: t('tasks.items.006.description'),
    },
    {
      number: '007',
      title: t('tasks.items.007.title'),
      description: t('tasks.items.007.description'),
    },
    {
      number: '008',
      title: t('tasks.items.008.title'),
      description: t('tasks.items.008.description'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">{t('tasks.title')}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {t('tasks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {tasks.map((task, index) => (
            <article
              key={task.number}
              className="group flex gap-6 transition-all duration-500"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#004aad] to-[#0066cc] text-xl font-semibold text-white transition-transform group-hover:scale-110">
                  {task.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl">{task.title}</h3>
                <p className="text-gray-600 leading-relaxed">{task.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
