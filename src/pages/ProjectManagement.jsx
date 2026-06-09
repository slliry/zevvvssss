import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import ScrollIndicator from '../components/ScrollIndicator.jsx';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import CTA from '../components/CTA.jsx';

export default function ProjectManagement() {
    const { t } = useTranslation();

    const valueItems = t('projectManagement.value', { returnObjects: true }) || [];
    const offerItems = t('projectManagement.offer', { returnObjects: true }) || [];

    return (
        <div className="bg-[#F7FFFE]">
            <SEO
                title={t('projectManagement.title') + ' - Zeus GRC'}
                description={t('projectManagement.subtitle')}
                url="/consulting/project-management"
            />

            {/* ── Hero ── */}
            <section className="relative flex min-h-screen items-center overflow-hidden bg-[#F5FCFF] py-20 md:py-0">
                <div className="relative mx-auto w-full max-w-[1392px] px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >
                        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#004AAD]">
                            {t('projectManagement.badge')}
                        </p>
                        <h1 style={{ fontFamily: 'Barlow, Inter, sans-serif', fontWeight: 300, fontSize: '52px', lineHeight: '62px', color: '#1A1A1A' }}>
                            {t('projectManagement.title')}
                        </h1>
                        <p className="mt-6" style={{ fontFamily: 'Helvetica, Inter, sans-serif', fontSize: '18px', lineHeight: '29px', color: '#363D42', maxWidth: '620px' }}>
                            {t('projectManagement.subtitle')}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link to="/request" className="inline-flex items-center gap-2 rounded-full bg-[#004AAD] px-8 py-4 text-white transition-all hover:bg-[#003580]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '16px' }}>
                                {t('projectManagement.ctaMain')} <ArrowRight size={18} />
                            </Link>
                            <Link to="/consulting" className="inline-flex items-center gap-2 rounded-full border border-[#004AAD] px-8 py-4 text-[#004AAD] transition-all hover:bg-[#004AAD]/5" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '16px' }}>
                                {t('projectManagement.ctaBack')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            <ScrollIndicator />
            </section>

            {/* ── Description ── */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-[1392px] px-6 lg:px-16">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-6" style={{ fontFamily: 'Helvetica, Inter, sans-serif', fontSize: '18px', lineHeight: '29px', color: '#363D42' }}>
                        <p>{t('projectManagement.desc1')}</p>
                        <p>{t('projectManagement.desc2')}</p>
                    </motion.div>
                </div>
            </section>

            {/* ── Ценность ── */}
            <section className="bg-[#F5FCFF] py-16">
                <div className="mx-auto max-w-[1392px] px-6 lg:px-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
                        <h2 style={{ fontFamily: 'Barlow, Inter, sans-serif', fontWeight: 300, fontSize: '36px', lineHeight: '43px', color: '#1A1A1A' }}>
                            {t('projectManagement.valueTitle')}
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                        {Array.isArray(valueItems) && valueItems.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-1 shrink-0 text-[#004AAD]" size={20} />
                                <span style={{ fontFamily: 'Helvetica, Inter, sans-serif', fontSize: '18px', lineHeight: '29px', color: '#363D42' }}>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Мы предлагаем ── */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-[1392px] px-6 lg:px-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
                        <h2 style={{ fontFamily: 'Barlow, Inter, sans-serif', fontWeight: 300, fontSize: '36px', lineHeight: '43px', color: '#1A1A1A' }}>
                            {t('projectManagement.offerTitle')}
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                        {Array.isArray(offerItems) && offerItems.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-1 shrink-0 text-[#004AAD]" size={20} />
                                <span style={{ fontFamily: 'Helvetica, Inter, sans-serif', fontSize: '18px', lineHeight: '29px', color: '#363D42' }}>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
}
