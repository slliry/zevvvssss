import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import EditableTranslation from '../components/EditableTranslation';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import ZeusLightning from '../components/ZeusLightning.jsx';
import {
    ArrowRight,
    Users,
    Target,
    BarChart3,
    Shield,
    Layers,
    Settings,
    TrendingUp,
    FileText,
    Zap,
    Eye,
} from 'lucide-react';

export default function Consulting() {
    const { t } = useTranslation();

    const services = [
        { icon: BarChart3,  key: 'businessConsulting',    route: '/consulting/business'     },
        { icon: Settings,   key: 'projectManagement',     route: '/request'                 },
        { icon: FileText,   key: 'bizProcessMethodology', route: '/request'                 },
        { icon: Shield,     key: 'isAudit',               route: '/request'                 },
        { icon: Target,     key: 'isRiskManagement',      route: '/request'                 },
        { icon: Layers,     key: 'isArchitecture',        route: '/request'                 },
        { icon: TrendingUp, key: 'vulnAssessment',        route: '/request'                 },
    ];

    const benefits = [
        { icon: Zap,    key: 'expertise'     },
        { icon: Target, key: 'resultFocused' },
        { icon: Shield, key: 'dataSecurity'  },
        { icon: Eye,    key: 'transparency'  },
    ];

    const cases = [
        { key: 'finance'    },
        { key: 'it'         },
        { key: 'isMaturity' },
    ];

    return (
        <div className="bg-[#F7FFFE]">
            <SEO
                title={t('consulting.title') + ' - Zeus GRC'}
                description={t('consulting.subtitle')}
                url="/consulting"
            />

            {/* ── Hero ── */}
            <section className="relative flex min-h-screen items-center overflow-hidden bg-[#F7FFFE]">
                <ZeusLightning />
                <div className="relative mx-auto max-w-[1440px] w-full px-6 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >
                        <h1 className="mb-6 leading-tight" style={{ fontSize: '72px', lineHeight: '72px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400 }}>
                            <span className="text-[#1A1A1A]">
                                <EditableTranslation translationKey="consulting.heroLine1">{t('consulting.heroLine1') || 'Consulting'}</EditableTranslation>
                            </span>
                            <br />
                            <span className="text-[#004AAD]">
                                <EditableTranslation translationKey="consulting.heroLine2">{t('consulting.heroLine2') || 'Service'}</EditableTranslation>
                            </span>
                        </h1>
                        <p className="mb-10 text-[#4B5563]" style={{ fontSize: '24px', lineHeight: '32px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400 }}>
                            <EditableTranslation translationKey="consulting.subtitle">{t('consulting.subtitle')}</EditableTranslation>
                        </p>
                        <Link
                            to="/request"
                            className="inline-flex items-center gap-3 rounded-3xl bg-[#004AAD] px-8 py-4 text-white transition-all hover:bg-[#003580] hover:shadow-lg"
                            style={{ fontSize: '16px', fontWeight: 500 }}
                        >
                            <EditableTranslation translationKey="consulting.cta.button">{t('consulting.cta.button')}</EditableTranslation>
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── About ── */}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <div className="flex flex-wrap items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="min-w-[280px] flex-1"
                        >
                            <h2 className="mb-4 text-gray-900" style={{ fontSize: '36px', fontWeight: 300, lineHeight: '43px', fontFamily: 'Space Grotesk, sans-serif' }}>
                                <EditableTranslation translationKey="consulting.about.title">{t('consulting.about.title')}</EditableTranslation>
                            </h2>
                            <p className="text-[#363D42]" style={{ fontSize: '18px', lineHeight: '29px' }}>
                                <EditableTranslation translationKey="consulting.about.description">{t('consulting.about.description')}</EditableTranslation>
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="min-w-[280px] flex-1"
                        >
                            <img
                                src="/Flexible, expert consulting.svg"
                                alt="Flexible expert consulting"
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="py-20 md:py-28" style={{ background: '#F0F8FF' }}>
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-[#1A1A1A]" style={{ fontSize: '48px', lineHeight: '48px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400 }}>
                            <EditableTranslation translationKey="consulting.benefits.title">{t('consulting.benefits.title')}</EditableTranslation>
                        </h2>
                        <p className="text-[#4B5563]" style={{ fontSize: '20px', lineHeight: '28px', fontFamily: 'Space Grotesk, sans-serif' }}>
                            <EditableTranslation translationKey="consulting.benefits.subtitle">{t('consulting.benefits.subtitle')}</EditableTranslation>
                        </p>
                    </motion.div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col items-center rounded-3xl bg-white p-8 text-center"
                                style={{ outline: '1px solid #E5E7EB' }}
                            >
                                <div
                                    className="mb-5 flex items-center justify-center"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 24,
                                        background: 'linear-gradient(135deg, #004AAD 0%, #0066CC 100%)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <b.icon size={36} className="text-white" />
                                </div>
                                <h3
                                    className="mb-3 leading-snug text-[#004AAD]"
                                    style={{ fontSize: '24px', lineHeight: '28px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400 }}
                                >
                                    {t(`consulting.benefits.items.${b.key}.title`)}
                                </h3>
                                <p className="text-[#4B5563]" style={{ fontSize: '14px', lineHeight: '26px' }}>
                                    {t(`consulting.benefits.items.${b.key}.description`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Services Catalog ── */}
            <section className="py-20 md:py-28 bg-[#F7FFFE]">
                <div className="mx-auto max-w-[1900px] px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-[#1A1A1A]" style={{ fontSize: '48px', lineHeight: '48px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400 }}>
                            <EditableTranslation translationKey="consulting.services.title">{t('consulting.services.title')}</EditableTranslation>
                        </h2>
                    </motion.div>

                    {/* Row 1 — 4 cards */}
                    <div className="mb-6 grid gap-6" style={{ gridTemplateColumns: 'repeat(4, 430px)', justifyContent: 'center' }}>
                        {services.slice(0, 4).map((s, i) => (
                            <motion.div
                                key={s.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="relative flex flex-col overflow-hidden rounded-3xl bg-white"
                                style={{ width: '430px', height: '490px', border: '1px solid #E5E7EB' }}
                            >
                                {/* blue top bar centered */}
                                <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: 163, height: 8, background: '#015CC1' }} />
                                <div className="flex flex-1 flex-col px-9 pt-10 pb-8">
                                    <h3
                                        className="mb-5 text-center text-black"
                                        style={{ fontSize: '32px', fontFamily: 'Inter, sans-serif', fontWeight: 600, textTransform: 'capitalize', lineHeight: '1.3', overflowWrap: 'break-word' }}
                                    >
                                        {t(`consulting.services.items.${s.key}.title`)}
                                    </h3>
                                    <p className="flex-1 text-center text-black" style={{ fontSize: '14px', lineHeight: '27px', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                                        {t(`consulting.services.items.${s.key}.description`)}
                                    </p>
                                    <div className="mt-6 flex justify-center">
                                        <Link
                                            to={s.route}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#004AAD] px-6 py-3 text-white transition-all hover:bg-[#003580]"
                                            style={{ fontSize: '16px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}
                                        >
                                            {t('common.more')} <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Row 2 — 3 cards centered */}
                    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(3, 430px)', justifyContent: 'center' }}>
                        {services.slice(4).map((s, i) => {
                            const isLast = i === services.slice(4).length - 1;
                            return (
                                <motion.div
                                    key={s.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="relative flex flex-col overflow-hidden rounded-3xl"
                                    style={{
                                        width: '430px',
                                        height: '490px',
                                        background: isLast ? '#004AAD' : 'white',
                                        border: '1px solid #E5E7EB',
                                    }}
                                >
                                    {/* blue top bar centered */}
                                    <div
                                        className="absolute left-1/2 top-0 -translate-x-1/2"
                                        style={{ width: 163, height: 8, background: isLast ? 'white' : '#015CC1' }}
                                    />
                                    <div className="flex flex-1 flex-col px-9 pt-10 pb-8">
                                        <h3
                                            className="mb-5 text-center"
                                            style={{
                                                fontSize: '32px',
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 600,
                                                textTransform: 'capitalize',
                                                lineHeight: '1.3',
                                                color: isLast ? 'white' : 'black',
                                                overflowWrap: 'break-word',
                                            }}
                                        >
                                            {t(`consulting.services.items.${s.key}.title`)}
                                        </h3>
                                        <p
                                            className="flex-1 text-center"
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '27px',
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 400,
                                                color: isLast ? 'white' : 'black',
                                            }}
                                        >
                                            {t(`consulting.services.items.${s.key}.description`)}
                                        </p>
                                        <div className="mt-6 flex justify-center">
                                            <Link
                                                to={s.route}
                                                className="inline-flex items-center gap-2 rounded-full px-6 py-3 transition-all"
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Space Grotesk, sans-serif',
                                                    fontWeight: 500,
                                                    background: isLast ? 'white' : '#004AAD',
                                                    color: isLast ? '#004AAD' : 'white',
                                                }}
                                            >
                                                {t('common.more')} <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 96% + Cases ── */}
            <section className="py-20 md:py-28 bg-[#F7FFFE]">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Top label */}
                        <p className="mb-3 text-center font-semibold uppercase tracking-widest text-[#375EE4]" style={{ fontSize: '14px', letterSpacing: '2px' }}>
                            {t('consulting.whyChooseUs')}
                        </p>

                        {/* 96% headline */}
                        <h2 className="mb-3 text-center text-[#0E1630]" style={{ fontSize: '42px', fontWeight: 700, lineHeight: '52px', fontFamily: 'Inter, sans-serif' }}>
                            <EditableTranslation translationKey="consulting.renew.title">{t('consulting.renew.title')}</EditableTranslation>
                        </h2>
                        <p className="mb-10 text-center text-[#6B7280]" style={{ fontSize: '16px', lineHeight: '26px', maxWidth: '520px', margin: '0 auto 40px' }}>
                            <EditableTranslation translationKey="consulting.renew.description">{t('consulting.renew.description')}</EditableTranslation>
                        </p>

                        {/* Blue featured case — finance */}
                        <div
                            className="relative mb-6 overflow-hidden rounded-3xl p-8 md:p-10"
                            style={{ background: '#0150B3' }}
                        >
                            {/* decorative blur */}
                            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                            {/* icon */}
                            <div className="relative z-10 mb-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                                    <Shield size={22} className="text-white" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="mb-4 text-white" style={{ fontSize: '28px', fontWeight: 600, lineHeight: '38px', fontFamily: 'Inter, sans-serif' }}>
                                    {t('consulting.cases.finance.title')}
                                </h3>
                                <div className="mb-6" style={{ fontSize: '15px', lineHeight: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                                    {t('consulting.cases.finance.description').split('\n\n').map((para, idx) => (
                                        <p key={idx} style={{ color: '#ffffff', marginTop: idx > 0 ? '12px' : '0' }}>{para}</p>
                                    ))}
                                </div>
                                <Link
                                    to="/request"
                                    className="inline-flex items-center gap-2 text-white transition-all hover:gap-3"
                                    style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' }}
                                >
                                    {t('consulting.viewCaseStudy')} <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>

                        {/* Two white cases below */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {cases.slice(1).map((c, i) => (
                                <motion.div
                                    key={c.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="rounded-3xl bg-white p-8"
                                    style={{ border: '1px solid #E5E7EB' }}
                                >
                                    {/* icon */}
                                    <div className="mb-5">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0150B4]">
                                            <Users size={22} className="text-white" />
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-[#0E1630]" style={{ fontSize: '22px', fontWeight: 600, lineHeight: '30px', fontFamily: 'Inter, sans-serif' }}>
                                        {t(`consulting.cases.${c.key}.title`)}
                                    </h3>
                                    <p className="mb-6 text-[#4B5563]" style={{ fontSize: '14px', lineHeight: '23px', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                                        {t(`consulting.cases.${c.key}.description`)}
                                    </p>
                                    <Link
                                        to={c.key === 'isMaturity' ? '/consulting/cases/is-maturity' : '/request'}
                                        className="inline-flex items-center gap-2 text-[#0E1630] transition-all hover:gap-3"
                                        style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' }}
                                    >
                                        {t('consulting.viewCaseStudy')} <ArrowRight size={15} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 md:py-28 bg-[#F7FFFE]">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl p-16 text-center text-white shadow-2xl"
                        style={{ background: 'linear-gradient(171deg, #004AAD 0%, #0066CC 100%)' }}
                    >
                        {/* Decorative blobs */}
                        <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                        <div className="pointer-events-none absolute bottom-8 left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                        {/* Decorative borders */}
                        <div className="pointer-events-none absolute left-14 top-10 h-16 w-16 rotate-12 rounded-xl border-2 border-white/20" />
                        <div className="pointer-events-none absolute bottom-10 right-16 h-12 w-12 -rotate-12 rounded-full border-2 border-white/20" />

                        <div className="relative z-10">
                            <h2 className="mb-6 text-white" style={{ fontSize: '60px', fontWeight: 700, lineHeight: '60px', fontFamily: 'Space Grotesk, sans-serif' }}>
                                <EditableTranslation translationKey="consulting.cta.title">{t('consulting.cta.title')}</EditableTranslation>
                            </h2>
                            <p className="mx-auto mb-10 max-w-2xl text-white/90" style={{ fontSize: '24px', lineHeight: '32px' }}>
                                <EditableTranslation translationKey="consulting.cta.description">{t('consulting.cta.description')}</EditableTranslation>
                            </p>
                            <Link
                                to="/request"
                                className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-[#004AAD] shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
                                style={{ fontSize: '18px', fontWeight: 700 }}
                            >
                                <EditableTranslation translationKey="consulting.cta.button">{t('consulting.cta.button')}</EditableTranslation>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
