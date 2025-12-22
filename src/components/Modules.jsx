import { motion } from 'framer-motion';
import { Shield, AlertTriangle, FileCheck, ListTodo, CheckSquare, Bug, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Modules() {
  const { t } = useTranslation();

  const modules = [
    {
      icon: Shield,
      title: t('modules.items.assetManagement.title'),
      description: t('modules.items.assetManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/asset-management',
    },
    {
      icon: AlertTriangle,
      title: t('modules.items.riskManagement.title'),
      description: t('modules.items.riskManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/risk-management',
    },
    {
      icon: FileCheck,
      title: t('modules.items.auditCompliance.title'),
      description: t('modules.items.auditCompliance.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/audit-compliance',
    },
    {
      icon: ListTodo,
      title: t('modules.items.taskManagement.title'),
      description: t('modules.items.taskManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/task-management',
    },
    {
      icon: CheckSquare,
      title: t('modules.items.controlManagement.title'),
      description: t('modules.items.controlManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/control-management',
    },
    {
      icon: Bug,
      title: t('modules.items.vulnerabilityManagement.title'),
      description: t('modules.items.vulnerabilityManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/vulnerability-management',
    },
    {
      icon: Activity,
      title: t('modules.items.operationalRiskManagement.title'),
      description: t('modules.items.operationalRiskManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/operational-risk-management',
    },
    {
      icon: Zap,
      title: t('modules.items.incidentManagement.title'),
      description: t('modules.items.incidentManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/incident-management',
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

        <div className="relative mx-auto max-w-7xl">
          {/* 2 Large + 6 Small Layout */}
          <div className="space-y-6">

            {/* Top Row - 2 Large Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Asset Management - Large Card */}
              <Link to={modules[0].path} className="group relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative h-full min-h-[320px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#004aad] via-[#0066cc] to-[#004aad] p-8 lg:p-10 text-white shadow-[0_20px_60px_rgba(0,74,173,0.4)] transition-all duration-500"
                >
                  {/* Animated background blobs */}
                  <motion.div
                    className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
                    animate={{ scale: [1, 1.4, 1], x: [0, -20, 0], y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    <motion.div
                      className="mb-6 flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Shield size={40} className="text-white" />
                    </motion.div>

                    <h3 className="mb-3 text-2xl lg:text-3xl font-bold text-white">{modules[0].title}</h3>
                    <p className="text-sm lg:text-base leading-relaxed text-white/90">{modules[0].description}</p>

                    <motion.div
                      className="inline-flex items-center gap-2 text-base font-semibold text-white mt-6"
                      whileHover={{ x: 5 }}
                    >
                      Узнать больше
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-white/20"
                    animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </Link>

              {/* Risk Management - Large Card */}
              <Link to={modules[1].path} className="group relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 lg:p-10 shadow-lg transition-all duration-500 hover:border-[#004aad]/30 hover:shadow-2xl"
                >


                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    <motion.div
                      className={`mb-6 flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${modules[1].color} text-white shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.8 }}
                    >
                      <AlertTriangle size={40} />
                    </motion.div>

                    <h3 className="mb-3 text-2xl lg:text-3xl font-bold text-gray-900">{modules[1].title}</h3>
                    <p className="text-sm lg:text-base leading-relaxed text-gray-600">{modules[1].description}</p>

                    <motion.div className="inline-flex items-center gap-2 text-base font-semibold text-[#004aad] mt-6" whileHover={{ x: 5 }}>
                      Подробнее
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </motion.div>
                  </div>

                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#004aad]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                </motion.div>
              </Link>

            </div>

            {/* Bottom Rows - 6 Small Cards in 2 rows of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {modules.slice(2).map((module, index) => {
                const Icon = module.icon;
                const gradients = [
                  'from-purple-500 to-pink-500',
                  'from-cyan-500 to-blue-500',
                  'from-green-500 to-emerald-500',
                  'from-yellow-500 to-orange-500',
                  'from-indigo-500 to-purple-500',
                  'from-red-500 to-pink-500'
                ];

                return (
                  <Link key={index} to={module.path} className="group relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-6 lg:p-7 shadow-lg transition-all duration-500 hover:border-[#004aad]/30 hover:shadow-2xl"
                    >


                      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                        <motion.div
                          className={`mb-4 flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon size={28} className="lg:w-8 lg:h-8" />
                        </motion.div>

                        <h3 className="mb-3 text-xl lg:text-2xl font-bold text-gray-900">{module.title}</h3>
                        <p className="mb-4 text-sm lg:text-base leading-relaxed text-gray-600 flex-grow">{module.description}</p>

                        <motion.div className="inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-[#004aad]" whileHover={{ x: 5 }}>
                          Подробнее
                          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                        </motion.div>
                      </div>

                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#004aad]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                    </motion.div>
                  </Link>
                );
              })}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
