import useInView from '../hooks/useInView.js';

const tasks = [
  {
    number: '001',
    title: 'Централизованный учет',
    description: 'Единая база данных всех активов, рисков и процессов компании',
  },
  {
    number: '002',
    title: 'Автоматизация процессов',
    description: 'Автоматические уведомления, отчеты и контроль сроков выполнения задач',
  },
  {
    number: '003',
    title: 'Аналитика и отчетность',
    description: 'Детальная аналитика и готовые шаблоны отчетов для регуляторов',
  },
  {
    number: '004',
    title: 'Интеграция систем',
    description: 'Бесшовная интеграция с существующими корпоративными системами',
  },
  {
    number: '005',
    title: 'Контроль доступа',
    description: 'Гибкая система прав доступа и разграничение полномочий',
  },
  {
    number: '006',
    title: 'Масштабируемость',
    description: 'Решение растет вместе с вашим бизнесом без потери производительности',
  },
];

export default function Tasks() {
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">Что мы решаем</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Ключевые задачи, которые помогает решить Zeus GRC
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF] text-xl font-semibold text-white transition-transform group-hover:scale-110">
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
