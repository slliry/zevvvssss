import { Shield, FileCheck, AlertTriangle, Bell, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const modules = [
  {
    icon: Shield,
    title: 'Активы',
    description: 'Управление и учет всех критических активов организации',
    color: 'from-[#0066FF] to-[#0052CC]',
  },
  {
    icon: FileCheck,
    title: 'Комплаенс',
    description: 'Контроль соответствия нормативным требованиям и стандартам',
    color: 'from-[#00D4FF] to-[#0066FF]',
  },
  {
    icon: AlertTriangle,
    title: 'Риски',
    description: 'Идентификация, оценка и мониторинг рисков в реальном времени',
    color: 'from-[#0066FF] to-[#00D4FF]',
  },
  {
    icon: Bell,
    title: 'Инциденты',
    description: 'Регистрация и управление инцидентами информационной безопасности',
    color: 'from-[#0052CC] to-[#0066FF]',
  },
  {
    icon: Activity,
    title: 'Непрерывность',
    description: 'Планирование непрерывности бизнеса и аварийного восстановления',
    color: 'from-[#00D4FF] to-[#0052CC]',
  },
  {
    icon: TrendingUp,
    title: 'Операционные риски',
    description: 'Управление операционными рисками и процессами',
    color: 'from-[#0066FF] to-[#00D4FF]',
  },
];

export default function Modules() {
  return (
    <section className="py-20 md:py-32" id="модули">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl">Модули платформы</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Все необходимые инструменты для эффективного управления GRC в одной системе
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(0, 102, 255, 0.03) 0%, rgba(0, 212, 255, 0.03) 100%)',
                  }}
                />

                <motion.div
                  className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#0066FF]/10 to-[#00D4FF]/10 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white`}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                    transition: {
                      rotate: { duration: 0.5 },
                      scale: { duration: 0.2 },
                    },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF] blur-lg opacity-0 group-hover:opacity-50"
                    transition={{ duration: 0.3 }}
                  />
                  <Icon className="relative" size={28} />
                </motion.div>

                <div className="relative z-10">
                  <motion.h3
                    className="mb-3 text-2xl"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {module.title}
                  </motion.h3>
                  <p className="text-gray-600 leading-relaxed">{module.description}</p>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-[#0066FF] opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <motion.div
                    className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-[#0066FF]"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="absolute right-1/3 top-1/3 h-1.5 w-1.5 rounded-full bg-[#00D4FF]"
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="absolute left-1/3 bottom-1/3 h-1 w-1 rounded-full bg-[#0066FF]"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: 0.6,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
