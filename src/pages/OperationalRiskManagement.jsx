import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    ArrowRight,
    XCircle,
    Sparkles,
    Megaphone,
    Heart,
    Search,
    MonitorCheck,
    Target,
    Shield,
    Zap,
    Eye,
    Network,
    TrendingUp,
    Activity
} from 'lucide-react';

export default function OperationalRiskManagement() {
    const { t } = useTranslation();

    const problems = [
        t('operationalRiskManagement.problems.systematic'),
        t('operationalRiskManagement.problems.manual'),
        t('operationalRiskManagement.problems.database'),
        t('operationalRiskManagement.problems.tracking'),
        t('operationalRiskManagement.problems.linkage'),
        t('operationalRiskManagement.problems.monitoring')
    ];

    const solutions = [
        t('operationalRiskManagement.solutions.assessment'),
        t('operationalRiskManagement.solutions.collection'),
        t('operationalRiskManagement.solutions.planning'),
        t('operationalRiskManagement.solutions.monitoring')
    ];

    const results = [
        { icon: Target, text: t('operationalRiskManagement.results.proactive') },
        { icon: Shield, text: t('operationalRiskManagement.results.reduction') },
        { icon: Zap, text: t('operationalRiskManagement.results.response') },
        { icon: Eye, text: t('operationalRiskManagement.results.transparency') },
        { icon: Network, text: t('operationalRiskManagement.results.integration') },
        { icon: TrendingUp, text: t('operationalRiskManagement.results.efficiency') }
    ];

    const features = [
        {
            icon: Megaphone,
            title: 'Оценка вероятности и влияния',
            description: 'Позволяет оценивать их вероятность и влияние с использованием единых методов.'
        },
        {
            icon: Heart,
            title: 'Сбор и фиксация рисков',
            description: 'Системно собирает и фиксирует операционные риски во всех процессах.'
        },
        {
            icon: Search,
            title: 'Планирование контролей и мер',
            description: 'Формирует планы по контролям и мерам снижения рисков.'
        },
        {
            icon: MonitorCheck,
            title: 'Мониторинг и отчетность',
            description: 'Обеспечивает постоянный мониторинг, обновление статуса и отчетность.'
        }
    ];

    return (
        <div className="bg-[#F7FFFE]">
            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center overflow-hidden bg-[#F7FFFE] py-20 md:py-0">
                <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <Link
                            to="/#modules"
                            className="mb-8 inline-flex items-center gap-2 text-sm text-[#004aad] transition hover:text-[#0066cc]"
                        >
                            ← {t('operationalRiskManagement.backToModules')}
                        </Link>
                        <h1 className="mb-6 text-5xl font-bold text-[#1A1A1A] md:text-7xl">
                            {t('operationalRiskManagement.title')}
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 lg:mx-0">
                            {t('operationalRiskManagement.heroDescription')}
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-10 flex justify-center lg:justify-start"
                        >
                            <Link
                                to="/request"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#004aad] to-[#0066cc] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                            >
                                {t('operationalRiskManagement.cta.button')}
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        {/* Central Circle */}
                        <div className="relative w-[500px] h-[500px]">
                            {/* Center Icon */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#004aad] to-[#0066cc] flex items-center justify-center shadow-2xl">
                                    <Activity size={48} className="text-white" />
                                </div>
                            </motion.div>

                            {/* Orbiting Icons */}
                            {[
                                { icon: Megaphone, delay: 0, color: 'from-[#004aad] to-[#0066cc]' },
                                { icon: Heart, delay: 0.25, color: 'from-[#004aad] to-[#0066cc]' },
                                { icon: Search, delay: 0.5, color: 'from-[#004aad] to-[#0066cc]' },
                                { icon: MonitorCheck, delay: 0.75, color: 'from-[#004aad] to-[#0066cc]' }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                const angle = (index * 90) - 90; // Start from top
                                const radian = (angle * Math.PI) / 180;
                                const radius = 180;
                                const x = radius * Math.cos(radian);
                                const y = radius * Math.sin(radian);

                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute left-1/2 top-1/2"
                                        style={{
                                            x: x - 32,
                                            y: y - 32,
                                        }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1.1, 1],
                                            opacity: 1,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: item.delay,
                                        }}
                                    >
                                        <motion.div
                                            animate={{
                                                y: [0, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: item.delay * 2,
                                                ease: "easeInOut"
                                            }}
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl`}
                                        >
                                            <Icon size={32} className="text-white" />
                                        </motion.div>
                                    </motion.div>
                                );
                            })}

                            {/* Connecting Lines */}
                            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#004aad" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#0066cc" stopOpacity="0.4" />
                                    </linearGradient>
                                </defs>
                                {[0, 1, 2, 3].map((index) => {
                                    const angle = (index * 90) - 90;
                                    const radian = (angle * Math.PI) / 180;
                                    const radius = 180;
                                    const x = 250 + radius * Math.cos(radian);
                                    const y = 250 + radius * Math.sin(radian);

                                    return (
                                        <motion.line
                                            key={index}
                                            x1="250"
                                            y1="250"
                                            x2={x}
                                            y2={y}
                                            stroke="url(#lineGradient)"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                        />
                                    );
                                })}

                                {/* Pulsing Circle */}
                                <motion.circle
                                    cx="250"
                                    cy="250"
                                    r="180"
                                    fill="none"
                                    stroke="#004aad"
                                    strokeWidth="1"
                                    opacity="0.1"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.1, 0.3, 0.1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Before/After Section */}
            <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        {t('operationalRiskManagement.beforeAfter.title')}
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        {t('operationalRiskManagement.beforeAfter.subtitle')}
                    </p>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Problems */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-8"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                <XCircle size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-red-900">
                                {t('operationalRiskManagement.beforeAfter.before')}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {problems.map((problem, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-start gap-2 text-gray-700"
                                >
                                    <XCircle size={16} className="mt-1 flex-shrink-0 text-red-500" />
                                    <span className="text-sm leading-relaxed">{problem}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-3xl border-2 border-[#004aad] bg-gradient-to-br from-[#004aad] to-[#0066cc] p-8 text-white"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                                {t('operationalRiskManagement.beforeAfter.solution')}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {solutions.map((solution, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-start gap-2"
                                >
                                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                                    <span className="text-sm leading-relaxed">{solution}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="rounded-3xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-8"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-green-900">
                                {t('operationalRiskManagement.beforeAfter.result')}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {results.map((result, index) => {
                                const Icon = result.icon;
                                return (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-start gap-2 text-gray-700"
                                    >
                                        <Icon size={16} className="mt-1 flex-shrink-0 text-green-600" />
                                        <span className="text-sm leading-relaxed">{result.text}</span>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-50 py-20 md:py-32">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#004aad] to-[#0066cc] p-12 text-center text-white shadow-2xl md:p-16"
                    >
                        {/* Animated background */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                                {t('operationalRiskManagement.cta.title')}
                            </h2>
                            <p className="mb-8 text-lg text-white/90 md:text-xl">
                                {t('operationalRiskManagement.cta.description')}
                            </p>
                            <Link
                                to="/request"
                                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#004aad] transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
                            >
                                {t('operationalRiskManagement.cta.button')}
                                <ArrowRight
                                    size={20}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
