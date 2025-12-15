import { Shield, FileCheck, AlertTriangle, ListTodo, CheckSquare, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Modules() {
  const { t } = useTranslation();

  const centralModule = {
    icon: Shield,
    title: t('modules.items.assetManagement.title'),
    description: t('modules.items.assetManagement.description'),
    features: [
      t('modules.items.assetManagement.features.registry'),
      t('modules.items.assetManagement.features.documents'),
      t('modules.items.assetManagement.features.connections'),
      t('modules.items.assetManagement.features.assessment'),
    ],
    color: 'from-[#004aad] to-[#003580]',
  };

  const modules = [
    {
      icon: AlertTriangle,
      title: t('modules.items.riskManagement.title'),
      description: t('modules.items.riskManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
    },
    {
      icon: FileCheck,
      title: t('modules.items.auditCompliance.title'),
      description: t('modules.items.auditCompliance.description'),
      color: 'from-[#0066cc] to-[#004aad]',
    },
    {
      icon: AlertCircle,
      title: t('modules.items.incidentVulnerability.title'),
      description: t('modules.items.incidentVulnerability.description'),
      color: 'from-[#004aad] to-[#003580]',
    },
    {
      icon: ShieldAlert,
      title: t('modules.items.operationalRisks.title'),
      description: t('modules.items.operationalRisks.description'),
      color: 'from-[#003580] to-[#004aad]',
    },
    {
      icon: ListTodo,
      title: t('modules.items.taskManagement.title'),
      description: t('modules.items.taskManagement.description'),
      color: 'from-[#0066cc] to-[#004aad]',
    },
    {
      icon: CheckSquare,
      title: t('modules.items.controlManagement.title'),
      description: t('modules.items.controlManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
    },
  ];

  return (
    <section className="py-20 md:py-32" id="modules">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl">{t('modules.title')}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {t('modules.subtitle')}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          {/* Connection lines effect */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#004aad" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0066cc" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Central featured module - spans 2 columns on top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="group relative col-span-1 overflow-hidden rounded-3xl border-2 border-[#004aad]/30 bg-gradient-to-br from-[#004aad] to-[#0066cc] p-10 text-white shadow-[0_20px_60px_rgba(0,74,173,0.3)] lg:col-span-2"
            >
              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm">
                  <Shield className="text-white" size={40} />
                </div>
                <h3 className="mb-4 text-3xl font-bold text-white">{centralModule.title}</h3>
                <p className="mb-6 text-lg leading-relaxed text-white/90">
                  {centralModule.description}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {centralModule.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      <span className="text-sm text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated background elements */}
              <motion.div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
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
                className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </motion.div>

            {/* First module on top row */}
            {modules.slice(0, 1).map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8"
                >
                  <div className="relative z-10">
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold">{module.title}</h3>
                    <p className="leading-relaxed text-gray-600">{module.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-[#0066cc]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              );
            })}

            {/* Remaining 5 modules in 3-column grid */}
            {modules.slice(1).map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: (index + 2) * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8"
                >
                  <div className="relative z-10">
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold">{module.title}</h3>
                    <p className="leading-relaxed text-gray-600">{module.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-[#0066cc]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
