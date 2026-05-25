import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import CTA from '../components/CTA.jsx';

export default function IsMaturityCase() {
    const { t } = useTranslation();

    const solutionItems = t('isMaturityCase.solutionItems', { returnObjects: true }) || [];

    return (
        <div className="bg-[#F7FFFE]">
            <SEO
                title={t('isMaturityCase.title') + ' - Zeus GRC'}
                description={t('isMaturityCase.subtitle')}
                url="/consulting/cases/is-maturity"
            />

            {/* ── Hero ── */}
            <section className="relative flex min-h-screen items-center overflow-hidden bg-[#F5FCFF] py-20 md:py-0">
                <div className="relative mx-auto w-full max-w-[1392px] px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl"
                    >
                        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#004AAD]">
                            {t('isMaturityCase.badge')}
                        </p>
                        <h1
                            style={{
                                fontFamily: 'Barlow, Inter, sans-serif',
                                fontWeight: 300,
                                fontSize: '42px',
                                lineHeight: '52px',
                                color: '#1A1A1A',
                            }}
                        >
                            {t('isMaturityCase.title')}
                        </h1>
                        <p
                            className="mt-6"
                            style={{
                                fontFamily: 'Helvetica, Inter, sans-serif',
                                fontSize: '18px',
                                lineHeight: '29px',
                                color: '#363D42',
                                maxWidth: '760px',
                            }}
                        >
                            {t('isMaturityCase.subtitle')}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                to="/request"
                                className="inline-flex items-center gap-2 rounded-full bg-[#004AAD] px-8 py-4 text-white transition-all hover:bg-[#003580]"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '16px' }}
                            >
                                {t('cta.button')} <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/consulting"
                                className="inline-flex items-center gap-2 rounded-full border border-[#004AAD] px-8 py-4 text-[#004AAD] transition-all hover:bg-[#004AAD]/5"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '16px' }}
                            >
                                {t('businessConsulting.ctaBack')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Описание проблемы ── */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-[1392px] px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 pb-4 text-center"
                    >
                        <h2
                            style={{
                                fontFamily: 'Barlow, Inter, sans-serif',
                                fontWeight: 300,
                                fontSize: '36px',
                                lineHeight: '43px',
                                color: '#1A1A1A',
                            }}
                        >
                            {t('isMaturityCase.problemTitle')}
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: 'Helvetica, Inter, sans-serif',
                            fontSize: '20px',
                            lineHeight: '29px',
                            color: '#363D42',
                        }}
                    >
                        {t('isMaturityCase.problemText')}
                    </motion.p>
                </div>
            </section>

            {/* ── Реализованное решение ── */}
            <section className="bg-[#F5FCFF] py-16">
                <div className="mx-auto max-w-[1392px] px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 pb-4 text-center"
                    >
                        <h2
                            style={{
                                fontFamily: 'Barlow, Inter, sans-serif',
                                fontWeight: 300,
                                fontSize: '36px',
                                lineHeight: '43px',
                                color: '#1A1A1A',
                            }}
                        >
                            {t('isMaturityCase.solutionTitle')}
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                        {Array.isArray(solutionItems) && solutionItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="flex items-start gap-3"
                            >
                                <CheckCircle2 className="mt-1 shrink-0 text-[#004AAD]" size={20} />
                                <span
                                    style={{
                                        fontFamily: 'Helvetica, Inter, sans-serif',
                                        fontSize: '18px',
                                        lineHeight: '29px',
                                        color: '#363D42',
                                    }}
                                >
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Достигнутые результаты ── */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-[1392px] px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 pb-4 text-center"
                    >
                        <h2
                            style={{
                                fontFamily: 'Barlow, Inter, sans-serif',
                                fontWeight: 300,
                                fontSize: '36px',
                                lineHeight: '43px',
                                color: '#1A1A1A',
                            }}
                        >
                            {t('isMaturityCase.resultsTitle')}
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
                        {[t('isMaturityCase.resultsLeft'), t('isMaturityCase.resultsRight')].map((text, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                style={{
                                    fontFamily: 'Helvetica, Inter, sans-serif',
                                    fontSize: '18px',
                                    lineHeight: '29px',
                                    color: '#363D42',
                                }}
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
}
