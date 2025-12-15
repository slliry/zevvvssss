import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function Footer() {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useInView();

  const links = {
    product: [
      t('footer.columns.product.items.modules'),
      t('footer.columns.product.items.integrations'),
      t('footer.columns.product.items.pricing'),
      t('footer.columns.product.items.documentation'),
    ],
    company: [
      t('footer.columns.company.items.about'),
      t('footer.columns.company.items.careers'),
      t('footer.columns.company.items.blog'),
      t('footer.columns.company.items.contacts'),
    ],
    resources: [
      t('footer.columns.resources.items.knowledge'),
      t('footer.columns.resources.items.webinars'),
      t('footer.columns.resources.items.cases'),
      t('footer.columns.resources.items.support'),
    ],
  };

  const contactItems = [
    { icon: Mail, text: 'info@zeusgrc.ru' },
    { icon: Phone, text: '+7 707 388 66 39' },
    { icon: MapPin, text: 'г.Алматы, проспект Достык, 290' },
  ];

  return (
    <footer
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} bg-[#1A1A1A] pt-20 pb-10 text-white`}
      id="contacts"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <img src="/ZEUS_NEW_LOGO_WHITE.svg" alt="Zeus GRC" className="h-10 w-auto" />

            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="space-y-3 text-gray-400">
              {contactItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <FooterColumn title={t('footer.columns.product.title')} items={links.product} />
          <FooterColumn title={t('footer.columns.company.title')} items={links.company} />
          <FooterColumn title={t('footer.columns.resources.title')} items={links.resources} />
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>{t('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="text-white transition-colors hover:text-white">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white transition-colors hover:text-white">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
