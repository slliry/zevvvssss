import { TrendingUp, BarChart3, Target } from 'lucide-react';
import { motion } from 'motion/react';
import useInView from '../hooks/useInView.js';

const metrics = [
    {
        icon: TrendingUp,
        title: 'Снижение затрат',
        before: '20',
        after: '10',
        description: 'Снижение количества внешних штрафов и санкций на до 35% (Forrester)',
        improvement: '↓ 25-30%',
    },
    {
        icon: Target,
        title: 'Эффективность аудитов',
        stats: [
            { label: 'Экономия времени на подготовку данных', value: '45%' },
            { label: 'Повышение процента ключевых точек', value: '90%' },
            { label: 'Ускорение процесса устранения несоответствий', value: '60%' },
        ],
    },
    {
        icon: BarChart3,
        title: 'Рост зрелости ИБ',
        before: '1.5',
        after: '3.5',
        description: 'Достижение уровня зрелости 3-4 в течение 12-18 месяцев',
        improvement: '↑ до уровня 3-4',
    },
];

export default function Metrics() {
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
                    <h2 className="mb-4 text-4xl md:text-5xl">Измеримые результаты</h2>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        Реальные показатели эффективности внедрения Zeus GRC
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
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF]">
                            <TrendingUp className="text-white" size={28} />
                        </div>
                        <h3 className="mb-4 text-2xl font-semibold">Снижение затрат</h3>
                        <div className="mb-6 flex items-end gap-8">
                            <div>
                                <div className="text-sm text-gray-500">До ZEUS</div>
                                <div className="text-5xl font-bold text-gray-400">20</div>
                            </div>
                            <div className="mb-2 text-3xl text-[#0066FF]">→</div>
                            <div>
                                <div className="text-sm text-gray-500">После ZEUS</div>
                                <div className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-5xl font-bold text-transparent">
                                    10
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 text-2xl font-semibold text-[#0066FF]">↓ 25-30%</div>
                        <p className="text-gray-600">
                            Снижение количества внешних штрафов и санкций на до 35% (Forrester)
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
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF]">
                            <Target className="text-white" size={28} />
                        </div>
                        <h3 className="mb-6 text-2xl font-semibold">Эффективность аудитов</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Экономия времени</span>
                                    <span className="text-2xl font-bold text-[#0066FF]">45%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100">
                                    <div className="h-2 w-[45%] rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Покрытие точек</span>
                                    <span className="text-2xl font-bold text-[#00D4FF]">90%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100">
                                    <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0066FF]" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Устранение несоответствий</span>
                                    <span className="text-2xl font-bold text-[#0066FF]">60%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100">
                                    <div className="h-2 w-[60%] rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
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
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052CC] to-[#00D4FF]">
                            <BarChart3 className="text-white" size={28} />
                        </div>
                        <h3 className="mb-4 text-2xl font-semibold">Рост зрелости ИБ</h3>
                        <div className="mb-6 flex items-end gap-8">
                            <div>
                                <div className="text-sm text-gray-500">До внедрения</div>
                                <div className="text-5xl font-bold text-gray-400">1.5</div>
                            </div>
                            <div className="mb-2 text-3xl text-[#0066FF]">→</div>
                            <div>
                                <div className="text-sm text-gray-500">После внедрения</div>
                                <div className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-5xl font-bold text-transparent">
                                    3.5
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 text-2xl font-semibold text-[#0066FF]">↑ до уровня 3-4</div>
                        <p className="text-gray-600">Достижение уровня зрелости 3-4 в течение 12-18 месяцев</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                    className="mt-12 rounded-2xl bg-gradient-to-r from-[#0066FF]/5 to-[#00D4FF]/5 p-6 text-center"
                >
                    <p className="text-sm text-gray-600">
                        *Данные основаны на результатах внедрения Zeus GRC в организациях различного масштаба за период
                        12-18 месяцев
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
