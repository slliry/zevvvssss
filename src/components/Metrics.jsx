import { TrendingUp, BarChart3, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function Metrics() {
    const { t } = useTranslation();
    const [sectionRef, isVisible] = useInView();

    return (
        <section
            ref={sectionRef}
            className={`fade-section ${isVisible ? 'fade-section--visible' : ''} bg-gradient-to-b from-white to-gray-50 py-20 md:py-32`}
        >
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h2 className="mb-4 text-4xl md:text-5xl">{t('metrics.title')}</h2>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        {t('metrics.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Metric 1: Cost Reduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
                        className="rounded-3xl border border-gray-200 bg-white p-8"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#004aad] to-[#0066cc]">
                            <TrendingUp className="text-white" size={28} />
                        </div>
                        <h3 className="mb-4 text-2xl font-semibold">{t('metrics.items.costReduction.title')}</h3>
                        <div className="mb-6 flex items-end gap-8">
                            <div>
                                <div className="text-sm text-gray-500">{t('metrics.items.costReduction.before')}</div>
                                <div className="text-5xl font-bold text-gray-400">20</div>
                            </div>
                            <div className="mb-2 text-3xl text-[#004aad]">→</div>
                            <div>
                                <div className="text-sm text-gray-500">{t('metrics.items.costReduction.after')}</div>
                                <div className="bg-gradient-to-r from-[#004aad] to-[#0066cc] bg-clip-text text-5xl font-bold text-transparent">
                                    10
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 text-2xl font-semibold text-[#004aad]">{t('metrics.items.costReduction.improvement')}</div>
                        <p className="text-gray-600">
                            {t('metrics.items.costReduction.description')}
                        </p>
                    </motion.div>

                    {/* Metric 2: Audit Effectiveness */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                        className="rounded-3xl border border-gray-200 bg-white p-8"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#004aad]">
                            <Target className="text-white" size={28} />
                        </div>
                        <h3 className="mb-6 text-2xl font-semibold">{t('metrics.items.auditEfficiency.title')}</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{t('metrics.items.auditEfficiency.timeSaving')}</span>
                                    <span className="text-2xl font-bold text-[#004aad]">45%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100">
                                    <div className="h-2 w-[45%] rounded-full bg-gradient-to-r from-[#004aad] to-[#0066cc]" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{t('metrics.items.auditEfficiency.coverage')}</span>
                                    <span className="text-2xl font-bold text-[#0066cc]">90%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100">
                                    <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-[#0066cc] to-[#004aad]" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{t('metrics.items.auditEfficiency.resolution')}</span>
                                    <span className="text-2xl font-bold text-[#004aad]">60%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100">
                                    <div className="h-2 w-[60%] rounded-full bg-gradient-to-r from-[#004aad] to-[#0066cc]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Metric 3: Maturity Growth */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                        className="rounded-3xl border border-gray-200 bg-white p-8"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#003580] to-[#0066cc]">
                            <BarChart3 className="text-white" size={28} />
                        </div>
                        <h3 className="mb-4 text-2xl font-semibold">{t('metrics.items.maturityGrowth.title')}</h3>
                        <div className="mb-6 flex items-end gap-8">
                            <div>
                                <div className="text-sm text-gray-500">{t('metrics.items.maturityGrowth.before')}</div>
                                <div className="text-5xl font-bold text-gray-400">1.5</div>
                            </div>
                            <div className="mb-2 text-3xl text-[#004aad]">→</div>
                            <div>
                                <div className="text-sm text-gray-500">{t('metrics.items.maturityGrowth.after')}</div>
                                <div className="bg-gradient-to-r from-[#004aad] to-[#0066cc] bg-clip-text text-5xl font-bold text-transparent">
                                    3.5
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 text-2xl font-semibold text-[#004aad]">{t('metrics.items.maturityGrowth.improvement')}</div>
                        <p className="text-gray-600">{t('metrics.items.maturityGrowth.description')}</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                    className="mt-12 rounded-2xl bg-gradient-to-r from-[#004aad]/5 to-[#0066cc]/5 p-6 text-center"
                >
                    <p className="text-sm text-gray-600">
                        {t('metrics.disclaimer')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
