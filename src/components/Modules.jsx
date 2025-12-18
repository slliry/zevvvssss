import { Shield, FileCheck, AlertTriangle, ListTodo, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Modules() {
  const { t } = useTranslation();

  const modules = [
    {
      icon: Shield,
      title: t('modules.items.assetManagement.title'),
      description: t('modules.items.assetManagement.description'),
      color: 'from-[#004aad] to-[#003580]',
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
      color: 'from-[#0066cc] to-[#004aad]',
      path: '/modules/audit-compliance',
    },
    {
      icon: ListTodo,
      title: t('modules.items.taskManagement.title'),
      description: t('modules.items.taskManagement.description'),
      color: 'from-[#0066cc] to-[#004aad]',
      path: '/modules/task-management',
    },
    {
      icon: CheckSquare,
      title: t('modules.items.controlManagement.title'),
      description: t('modules.items.controlManagement.description'),
      color: 'from-[#004aad] to-[#0066cc]',
      path: '/modules/control-management',
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

          {/* Hub-Style Layout - Asset Management in Center */}
          <div className="relative mx-auto max-w-6xl">
            {/* Animated connecting lines/arrows */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#004aad" opacity="0.3" />
                </marker>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#004aad" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#004aad" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#004aad" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Top Left Arrow */}
              <motion.line
                x1="50%" y1="50%" x2="25%" y2="20%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Top Right Arrow */}
              <motion.line
                x1="50%" y1="50%" x2="75%" y2="20%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />

              {/* Bottom Left Arrow */}
              <motion.line
                x1="50%" y1="50%" x2="25%" y2="80%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />

              {/* Bottom Right Arrow */}
              <motion.line
                x1="50%" y1="50%" x2="75%" y2="80%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
            </svg>

            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8" style={{ zIndex: 1 }}>
              {/* Top Row - 2 modules */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Risk Management - Top Left */}
                <Link to={modules[1].path} className="group relative">
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative h-full min-h-[220px] overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-500 hover:border-[#004aad]/30 hover:shadow-2xl"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

                    <div className="relative z-10">
                      <motion.div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${modules[1].color} text-white shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <AlertTriangle size={28} />
                      </motion.div>

                      <h3 className="mb-2 text-xl font-bold text-gray-900">{modules[1].title}</h3>
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">{modules[1].description}</p>

                      <motion.div className="inline-flex items-center gap-2 text-sm font-semibold text-[#004aad]" whileHover={{ x: 5 }}>
                        Подробнее
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </motion.div>
                    </div>

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#004aad]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                  </motion.div>
                </Link>

                {/* Audit & Compliance - Top Right */}
                <Link to={modules[2].path} className="group relative">
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative h-full min-h-[220px] overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-500 hover:border-[#004aad]/30 hover:shadow-2xl"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

                    <div className="relative z-10">
                      <motion.div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${modules[2].color} text-white shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FileCheck size={28} />
                      </motion.div>

                      <h3 className="mb-2 text-xl font-bold text-gray-900">{modules[2].title}</h3>
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">{modules[2].description}</p>

                      <motion.div className="inline-flex items-center gap-2 text-sm font-semibold text-[#004aad]" whileHover={{ x: 5 }}>
                        Подробнее
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </motion.div>
                    </div>

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#004aad]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                  </motion.div>
                </Link>
              </div>

              {/* Center - Asset Management (Hero Card) */}
              <div className="lg:col-span-2 flex justify-center">
                <Link to={modules[0].path} className="group relative w-full max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#004aad] via-[#0066cc] to-[#004aad] p-10 text-white shadow-[0_30px_80px_rgba(0,74,173,0.5)] transition-all duration-500"
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

                    <div className="relative z-10 text-center">
                      <motion.div
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Shield size={40} className="text-white" />
                      </motion.div>

                      <h3 className="mb-4 text-4xl font-bold text-white">{modules[0].title}</h3>
                      <p className="mb-6 text-lg leading-relaxed text-white/90">{modules[0].description}</p>

                      <motion.div
                        className="inline-flex items-center gap-2 text-base font-semibold text-white"
                        whileHover={{ x: 5 }}
                      >
                        Узнать больше
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </motion.div>
                    </div>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-white/20"
                      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                </Link>
              </div>

              {/* Bottom Row - 2 modules */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Task Management - Bottom Left */}
                <Link to={modules[3].path} className="group relative">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative h-full min-h-[220px] overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-500 hover:border-[#004aad]/30 hover:shadow-2xl"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

                    <div className="relative z-10">
                      <motion.div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${modules[3].color} text-white shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ListTodo size={28} />
                      </motion.div>

                      <h3 className="mb-2 text-xl font-bold text-gray-900">{modules[3].title}</h3>
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">{modules[3].description}</p>

                      <motion.div className="inline-flex items-center gap-2 text-sm font-semibold text-[#004aad]" whileHover={{ x: 5 }}>
                        Подробнее
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </motion.div>
                    </div>

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#004aad]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                  </motion.div>
                </Link>

                {/* Control Management - Bottom Right */}
                <Link to={modules[4].path} className="group relative">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative h-full min-h-[220px] overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-500 hover:border-[#004aad]/30 hover:shadow-2xl"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

                    <div className="relative z-10">
                      <motion.div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${modules[4].color} text-white shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <CheckSquare size={28} />
                      </motion.div>

                      <h3 className="mb-2 text-xl font-bold text-gray-900">{modules[4].title}</h3>
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">{modules[4].description}</p>

                      <motion.div className="inline-flex items-center gap-2 text-sm font-semibold text-[#004aad]" whileHover={{ x: 5 }}>
                        Подробнее
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </motion.div>
                    </div>

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#004aad]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
