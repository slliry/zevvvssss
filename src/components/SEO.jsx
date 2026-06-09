import { useTranslation } from 'react-i18next';
import { useMemo, memo } from 'react';

function SEO({
    title,
    description,
    keywords,
    image = '/og-image.jpg',
    url,
    type = 'website'
}) {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'ru';

    const siteUrl = 'https://zeusgrc.com';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    const defaultTitle = {
        ru: 'Zeus GRC - Платформа управления рисками и комплаенсом',
        en: 'Zeus GRC - Risk Management and Compliance Platform',
        kk: 'Zeus GRC - Тәуекелдерді басқару және комплаенс платформасы',
        uz: 'Zeus GRC - Risk va muvofiqlik boshqaruvi platformasi',
        ky: 'Zeus GRC - Тобокел жана комплаенс башкаруу платформасы',
        tr: 'Zeus GRC - Risk ve Uyum Yönetimi Platformu'
    };

    const defaultDescription = {
        ru: 'Комплексная платформа для управления рисками, комплаенсом и непрерывностью бизнеса. Автоматизация GRC процессов, управление активами, аудит и контроль.',
        en: 'Comprehensive platform for risk management, compliance, and business continuity. GRC process automation, asset management, audit and control.',
        kk: 'Тәуекелдерді басқару, комплаенс және бизнестің үздіксіздігіне арналған кешенді платформа. GRC процестерін автоматтандыру, активтерді басқару, аудит және бақылау.',
        uz: 'Risk boshqaruvi, muvofiqlik va biznes uzluksizligi uchun kompleks platforma. GRC jarayonlarini avtomatlashtirish, aktivlarni boshqarish, audit va nazorat.',
        ky: 'Тобокелди башкаруу, комплаенс жана бизнестин үзгүлтүксүздүгү үчүн комплекстүү платформа. GRC процесстерин автоматташтыруу, активдерди башкаруу, аудит жана контрол.',
        tr: 'Risk yönetimi, uyum ve iş sürekliliği için kapsamlı platform. GRC süreç otomasyonu, varlık yönetimi, denetim ve kontrol.'
    };

    const defaultKeywords = {
        ru: 'GRC, управление рисками, комплаенс, аудит, управление активами, информационная безопасность, СУИБ, ISO 27001, управление уязвимостями, операционные риски',
        en: 'GRC, risk management, compliance, audit, asset management, information security, ISMS, ISO 27001, vulnerability management, operational risks',
        kk: 'GRC, тәуекелдерді басқару, комплаенс, аудит, активтерді басқару, ақпараттық қауіпсіздік, АҚҚБЖ, ISO 27001, осалдықтарды басқару, операциялық тәуекелдер',
        uz: 'GRC, risk boshqaruvi, muvofiqlik, audit, aktivlar boshqaruvi, axborot xavfsizligi, ISMS, ISO 27001, zaifliklar boshqaruvi, operatsion risklar',
        ky: 'GRC, тобокел башкаруу, комплаенс, аудит, активдерди башкаруу, маалымат коопсуздугу, ISMS, ISO 27001, алсыздыктарды башкаруу, операциялык тобокелдер',
        tr: 'GRC, risk yönetimi, uyum, denetim, varlık yönetimi, bilgi güvenliği, ISMS, ISO 27001, zafiyet yönetimi, operasyonel riskler'
    };

    const pageTitle = useMemo(() => title || defaultTitle[currentLang], [title, currentLang]);
    const pageDescription = useMemo(() => description || defaultDescription[currentLang], [description, currentLang]);
    const pageKeywords = useMemo(() => keywords || defaultKeywords[currentLang], [keywords, currentLang]);

    const organizationSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Zeus GRC",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "127"
        },
        "description": pageDescription,
        "url": siteUrl,
        "image": fullImage,
        "provider": {
            "@type": "Organization",
            "name": "Zeus GRC",
            "url": siteUrl
        }
    }), [pageDescription, fullImage, siteUrl]);

    // React 19 native metadata support - just return the tags directly
    return (
        <>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={pageKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:locale" content={currentLang === 'ru' ? 'ru_RU' : currentLang === 'kk' ? 'kk_KZ' : currentLang === 'uz' ? 'uz_UZ' : currentLang === 'ky' ? 'ky_KG' : currentLang === 'tr' ? 'tr_TR' : 'en_US'} />
            <meta property="og:site_name" content="Zeus GRC" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={fullImage} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="author" content="Zeus GRC" />
            <link rel="canonical" href={fullUrl} />

            {/* Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema)
            }} />
        </>
    );
}

export default memo(SEO);
