import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    ArrowRight,
    XCircle,
    Sparkles,
    Target,
    Shield,
    Zap,
    Eye,
    Network,
    TrendingUp
} from 'lucide-react';

export default function IncidentManagement() {
    const { t } = useTranslation();

    const problems = [
        t('incidentManagement.problems.chaotic'),
        t('incidentManagement.problems.noProcess'),
        t('incidentManagement.problems.deadlines'),
        t('incidentManagement.problems.rootCause'),
        t('incidentManagement.problems.linkage'),
        t('incidentManagement.problems.reporting')
    ];

    const solutions = [
        t('incidentManagement.solutions.registration'),
        t('incidentManagement.solutions.rootCause'),
        t('incidentManagement.solutions.control'),
        t('incidentManagement.solutions.automation')
    ];

    const results = [
        { icon: Target, text: t('incidentManagement.results.structured') },
        { icon: Shield, text: t('incidentManagement.results.reduction') },
        { icon: Zap, text: t('incidentManagement.results.response') },
        { icon: Eye, text: t('incidentManagement.results.transparency') },
        { icon: Network, text: t('incidentManagement.results.linkage') },
        { icon: TrendingUp, text: t('incidentManagement.results.improvement') }
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
                            ← {t('incidentManagement.backToModules')}
                        </Link>
                        <h1 className="mb-6 text-5xl font-bold text-[#1A1A1A] md:text-7xl">
                            {t('incidentManagement.title')}
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 lg:mx-0">
                            {t('incidentManagement.heroDescription')}
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
                                {t('incidentManagement.cta.button')}
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hidden lg:flex lg:justify-center lg:items-center"
                        style={{
                            filter: 'drop-shadow(0 20px 60px rgba(0, 74, 173, 0.3))',
                        }}
                    >
                        <img
                            src="/incidentmanagement.png"
                            alt="Incident Management"
                            className="h-auto w-full max-w-[400px] object-contain"
                        />
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
                        {t('incidentManagement.beforeAfter.title')}
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        {t('incidentManagement.beforeAfter.subtitle')}
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
                                {t('incidentManagement.beforeAfter.before')}
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
                                {t('incidentManagement.beforeAfter.solution')}
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
                                {t('incidentManagement.beforeAfter.result')}
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
                                {t('incidentManagement.cta.title')}
                            </h2>
                            <p className="mb-8 text-lg text-white/90 md:text-xl">
                                {t('incidentManagement.cta.description')}
                            </p>
                            <Link
                                to="/request"
                                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#004aad] transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
                            >
                                {t('incidentManagement.cta.button')}
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
