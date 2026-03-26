import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../lib/apiClient.js';

const moduleKeys = [
  'assetManagement',
  'riskManagement',
  'auditCompliance',
  'taskManagement',
  'controlManagement',
  'operationalRiskManagement',
  'vulnerabilityManagement',
  'incidentManagement',
];

export default function ChatAssistant() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState('overview');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const quickActions = ['module', 'demo', 'operator'];

  const moduleDetails = useMemo(
    () =>
      moduleKeys.map((moduleKey) => {
        const title = t(`modules.items.${moduleKey}.title`);
        const shortDescription = t(`modules.items.${moduleKey}.description`);
        const heroDescription = t(`${moduleKey}.heroDescription`);
        const hasHeroDescription = heroDescription !== `${moduleKey}.heroDescription`;

        return {
          key: moduleKey,
          title,
          shortDescription,
          heroDescription: hasHeroDescription ? heroDescription : '',
        };
      }),
    [t]
  );

  const activeModule = useMemo(
    () => moduleDetails.find((module) => module.key === selectedModule) ?? null,
    [moduleDetails, selectedModule]
  );

  const responseText = useMemo(() => {
    if (activeAction === 'module' && activeModule) {
      const heroPart = activeModule.heroDescription ? ` ${activeModule.heroDescription}` : '';
      return `${t('assistant.responses.moduleInfo', { module: activeModule.title })} ${activeModule.shortDescription}${heroPart}`;
    }

    if (activeAction === 'module') {
      return t('assistant.responses.modulePrompt');
    }

    if (activeAction === 'demo') return t('assistant.responses.demo');
    if (activeAction === 'operator') return t('assistant.responses.operator');
    return t('assistant.responses.overview');
  }, [activeAction, activeModule, t]);

  const animateAssistantResponse = () => {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
    }, 650);
  };

  const handleAction = (action) => {
    setHasInteracted(true);
    setActiveAction(action);
    setSelectedModule(null);
    setStatus({ type: null, message: '' });
    animateAssistantResponse();

    setShowContactForm(action === 'demo' || action === 'operator');
  };

  const handleModuleClick = (moduleKey) => {
    setHasInteracted(true);
    setSelectedModule(moduleKey);
    setShowContactForm(false);
    animateAssistantResponse();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await apiRequest('/api/requests', {
        method: 'POST',
        body: {
          ...payload,
          role: payload.role || 'website-visitor',
          source: 'chat-assistant',
        },
      });
      setStatus({ type: 'success', message: t('assistant.contact.success') });
      form.reset();
    } catch (error) {
      setStatus({ type: 'error', message: error.message || t('assistant.contact.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {isOpen ? (
        <div className="flex h-[78vh] w-[92vw] max-h-[680px] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_30px_80px_rgba(0,74,173,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#004aad] to-[#0066cc] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold text-white">{t('assistant.title')}</p>
              <p className="text-xs text-white/85">{t('assistant.subtitle')}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-white/15 p-1.5 transition hover:bg-white/25"
              aria-label={t('assistant.close')}
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top_right,#ecf5ff,#f8fcff_58%)] px-4 py-4">
            <div className="space-y-2 rounded-2xl border border-[#d6e7ff] bg-white/80 p-3">
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-sm text-[#1A1A1A] shadow-sm">
                  {t('assistant.welcome')}
                </div>
              </div>
              {hasInteracted ? (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-[90%] rounded-2xl rounded-tr-md bg-[#004aad] px-3 py-2 text-sm text-white shadow-sm">
                      {t(`assistant.actions.${activeAction}`)}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    {isTyping ? (
                      <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3 py-2 text-sm text-[#6b7b95] shadow-sm">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9cb3d9]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9cb3d9] [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9cb3d9] [animation-delay:240ms]" />
                      </div>
                    ) : (
                      <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-sm leading-relaxed text-[#1A1A1A] shadow-sm">
                        {responseText}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-sm leading-relaxed text-[#1A1A1A] shadow-sm">
                    {responseText}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleAction(action)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                    activeAction === action
                      ? 'border-[#004aad] bg-[#EAF3FF] text-[#004aad]'
                      : 'border-[#DCE9FA] bg-white text-[#2A3A52] hover:border-[#004aad]/35'
                  }`}
                >
                  {t(`assistant.actions.${action}`)}
                </button>
              ))}
            </div>

            {activeAction === 'module' ? (
              <div className="flex flex-wrap gap-2 rounded-2xl border border-[#DCE9FA] bg-white p-2">
                {moduleDetails.map((module) => (
                  <button
                    key={module.key}
                    type="button"
                    onClick={() => handleModuleClick(module.key)}
                    className={`rounded-full border px-2.5 py-1 text-xs transition ${
                      selectedModule === module.key
                        ? 'border-[#004aad] bg-[#EAF3FF] text-[#004aad]'
                        : 'border-[#004aad]/20 bg-[#F6FAFF] text-[#004aad] hover:border-[#004aad]/40'
                    }`}
                  >
                    {module.title}
                  </button>
                ))}
              </div>
            ) : null}

            {showContactForm ? (
              <form onSubmit={handleSubmit} className="space-y-2 rounded-2xl border border-[#DCE9FA] bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{t('assistant.contact.title')}</p>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t('assistant.contact.name')}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#0066cc]"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t('assistant.contact.email')}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#0066cc]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('assistant.contact.phone')}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#0066cc]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#004aad] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#003b89] disabled:opacity-70"
                >
                  {isSubmitting ? t('assistant.contact.sending') : t('assistant.contact.send')}
                </button>
                {status.type ? (
                  <p className={`text-xs ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {status.message}
                  </p>
                ) : null}
              </form>
            ) : null}

            <div className="grid grid-cols-1 gap-2 rounded-2xl bg-white px-3 py-2 text-xs text-gray-600 shadow-sm sm:grid-cols-2">
              <a href="tel:+77073886639" className="inline-flex items-center gap-1 break-all hover:text-[#004aad]">
                <Phone size={12} />
                +7 707 388 66 39
              </a>
              <a href="mailto:zeus@dmcorp.kz" className="inline-flex items-center gap-1 break-all hover:text-[#004aad]">
                <Mail size={12} />
                zeus@dmcorp.kz
              </a>
              <Link to="/request" className="font-semibold text-[#004aad] hover:underline sm:col-span-2">
                {t('assistant.openForm')}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#004aad] to-[#0066cc] text-white shadow-[0_16px_40px_rgba(0,74,173,0.45)] transition hover:scale-105"
        aria-label={t('assistant.open')}
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
