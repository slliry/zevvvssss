import { useTranslation } from 'react-i18next';

export default function SEO({
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
        kk: 'Zeus GRC - Тәуекелдерді басқару және комплаенс платформасы'
    };

    const defaultDescription = {
        ru: 'Комплексная платформа для управления рисками, комплаенсом и непрерывностью бизнеса. Автоматизация GRC процессов, управление активами, аудит и контроль.',
        en: 'Comprehensive platform for risk management, compliance, and business continuity. GRC process automation, asset management, audit and control.',
        kk: 'Тәуекелдерді басқару, комплаенс және бизнестің үздіксіздігіне арналған кешенді платформа. GRC процестерін автоматтандыру, активтерді басқару, аудит және бақылау.'
    };

    const defaultKeywords = {
        ru: 'GRC, управление рисками, комплаенс, аудит, управление активами, информационная безопасность, СУИБ, ISO 27001, управление уязвимостями, операционные риски',
        en: 'GRC, risk management, compliance, audit, asset management, information security, ISMS, ISO 27001, vulnerability management, operational risks',
        kk: 'GRC, тәуекелдерді басқару, комплаенс, аудит, активтерді басқару, ақпараттық қауіпсіздік, АҚҚБЖ, ISO 27001, осалдықтарды басқару, операциялық тәуекелдер'
    };

    const pageTitle = title || defaultTitle[currentLang];
    const pageDescription = description || defaultDescription[currentLang];
    const pageKeywords = keywords || defaultKeywords[currentLang];

    const organizationSchema = {
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
    };

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
            <meta property="og:locale" content={currentLang === 'ru' ? 'ru_RU' : currentLang === 'kk' ? 'kk_KZ' : 'en_US'} />
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
