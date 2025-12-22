import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Tasks() {
  const { t } = useTranslation();

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
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl">{t('tasks.title')}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {t('tasks.subtitle')}
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#004aad] via-[#0066cc] to-[#004aad] hidden lg:block"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Tasks */}
          <div className="space-y-6 lg:space-y-8">
            {tasks.map((task, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={task.number}
                  className="relative"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`flex items-center gap-8 lg:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                    {/* Left/Right Content */}
                    <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="mb-2 text-lg lg:text-xl font-bold text-gray-900">{task.title}</h3>
                        <ul className={`space-y-2 text-sm lg:text-base text-gray-600 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                          {task.description.split('\n').map((line, i) => (
                            <li key={i} className="leading-relaxed">• {line.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden lg:flex flex-shrink-0 relative z-10">
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#004aad] border-4 border-white shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      />
                    </div>

                    {/* Right/Left Content (empty spacer) */}
                    <div className="flex-1 hidden lg:block" />

                  </div>

                  {/* Mobile Layout - show dot on left */}
                  <div className="lg:hidden absolute left-0 top-6">
                    <div className="w-3 h-3 rounded-full bg-[#004aad]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
