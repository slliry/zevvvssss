import { useEffect, useState } from 'react';
import { ArrowRight, Mail, Phone, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EditableTranslation from '../components/EditableTranslation';
import { apiRequest } from '../lib/apiClient.js';

const COOLDOWN_SECONDS = 15;

export default function Request() {
  const { t } = useTranslation();
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  const perks = [
    {
      title: t('request.perks.items.analysis.title'),
      description: t('request.perks.items.analysis.description'),
    },
    {
      title: t('request.perks.items.demo.title'),
      description: t('request.perks.items.demo.description'),
    },
  ];

  useEffect(() => {
    if (cooldownLeft <= 0) return undefined;
    const timer = setInterval(() => {
      setCooldownLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cooldownLeft > 0) {
      setStatus({
        type: 'error',
        message: t('request.messages.cooldownError', { seconds: cooldownLeft }),
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const email = String(payload.email || '').trim().toLowerCase();
    const allowedDomains = ['.com', '.kz'];
    if (!allowedDomains.some((domain) => email.endsWith(domain))) {
      setStatus({
        type: 'error',
        message: 'Email должен оканчиваться на .com или .kz',
      });
      return;
    }
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      await apiRequest('/api/requests', {
        method: 'POST',
        body: payload,
      });
      setStatus({
        type: 'success',
        message: t('request.messages.success'),
      });
      form.reset();
      setCooldownLeft(COOLDOWN_SECONDS);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message ?? t('request.messages.error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-10 text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-[#0066FF]/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-[#0066FF]">
            <EditableTranslation translationKey="request.badge">{t('request.badge')}</EditableTranslation>
          </p>
          <h1 className="mb-4 text-4xl font-normal text-[#1A1A1A] md:text-5xl">
            <EditableTranslation translationKey="request.title">{t('request.title')}</EditableTranslation>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            <EditableTranslation translationKey="request.subtitle">{t('request.subtitle')}</EditableTranslation>
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-[0_35px_80px_rgba(0,102,255,0.08)]"
          >
            <h2 className="mb-6 text-2xl font-normal text-[#1A1A1A]"><EditableTranslation translationKey="request.form.title">{t('request.form.title')}</EditableTranslation></h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <EditableTranslation translationKey="request.form.fields.name.label">{t('request.form.fields.name.label')}</EditableTranslation>
                <input
                  required
                  type="text"
                  name="name"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder=<EditableTranslation translationKey="request.form.fields.name.placeholder">{t('request.form.fields.name.placeholder')}</EditableTranslation>
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <EditableTranslation translationKey="request.form.fields.company.label">{t('request.form.fields.company.label')}</EditableTranslation>
                <input
                  required
                  type="text"
                  name="company"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder=<EditableTranslation translationKey="request.form.fields.company.placeholder">{t('request.form.fields.company.placeholder')}</EditableTranslation>
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <EditableTranslation translationKey="request.form.fields.email.label">{t('request.form.fields.email.label')}</EditableTranslation>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder=<EditableTranslation translationKey="request.form.fields.email.placeholder">{t('request.form.fields.email.placeholder')}</EditableTranslation>
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <EditableTranslation translationKey="request.form.fields.phone.label">{t('request.form.fields.phone.label')}</EditableTranslation>
                <input
                  type="tel"
                  name="phone"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder=<EditableTranslation translationKey="request.form.fields.phone.placeholder">{t('request.form.fields.phone.placeholder')}</EditableTranslation>
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 md:col-span-2">
                <EditableTranslation translationKey="request.form.fields.role.label">{t('request.form.fields.role.label')}</EditableTranslation>
                <select
                  name="role"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                >
                  <option value="ciso"><EditableTranslation translationKey="request.form.fields.role.options.ciso">{t('request.form.fields.role.options.ciso')}</EditableTranslation></option>
                  <option value="risk"><EditableTranslation translationKey="request.form.fields.role.options.risk">{t('request.form.fields.role.options.risk')}</EditableTranslation></option>
                  <option value="compliance"><EditableTranslation translationKey="request.form.fields.role.options.compliance">{t('request.form.fields.role.options.compliance')}</EditableTranslation></option>
                  <option value="it"><EditableTranslation translationKey="request.form.fields.role.options.it">{t('request.form.fields.role.options.it')}</EditableTranslation></option>
                  <option value="other"><EditableTranslation translationKey="request.form.fields.role.options.other">{t('request.form.fields.role.options.other')}</EditableTranslation></option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 md:col-span-2">
                <EditableTranslation translationKey="request.form.fields.message.label">{t('request.form.fields.message.label')}</EditableTranslation>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={700}
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30 resize-none"
                  placeholder=<EditableTranslation translationKey="request.form.fields.message.placeholder">{t('request.form.fields.message.placeholder')}</EditableTranslation>
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading || cooldownLeft > 0}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-3xl bg-[#0066FF] px-8 py-4 text-center text-white transition hover:bg-[#0052CC] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? t('request.form.submitting')
                : cooldownLeft > 0
                  ? t('request.form.cooldown', { seconds: cooldownLeft })
                  : t('request.form.submit')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            {status.type === 'error' && (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                {status.message}
              </div>
            )}
          </form>

          <div className="rounded-3xl border border-white/40 bg-gradient-to-br from-[#E8F2F6] to-white p-8">
            <div className="mb-8">
              <h3 className="mb-3 text-2xl font-normal text-[#1A1A1A]"><EditableTranslation translationKey="request.perks.title">{t('request.perks.title')}</EditableTranslation></h3>
              <p className="text-gray-600">
                <EditableTranslation translationKey="request.perks.subtitle">{t('request.perks.subtitle')}</EditableTranslation>
              </p>
            </div>
            <ul className="mb-8 space-y-4">
              {perks.map((perk) => (
                <li key={perk.title} className="rounded-2xl border border-white/60 bg-white/60 p-4">
                  <p className="font-medium text-[#1A1A1A]">{perk.title}</p>
                  <p className="text-sm text-gray-600">{perk.description}</p>
                </li>
              ))}
            </ul>

            <div className="space-y-5 rounded-2xl border border-white/60 bg-white/70 p-5 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="text-[#0066FF]" size={18} />
                zeus@dmcorp.kz
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#0066FF]" size={18} />
                +7 707 388 66 39
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="text-[#0066FF]" size={18} />
                г.Алматы, улица Римского - Корсакова, 23
              </div>
            </div>
          </div>
        </div>
      </div>

      {status.type === 'success' && (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-700 shadow-xl shadow-emerald-200/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              ✓
            </div>
            <div>
              <p className="text-base font-semibold text-emerald-800"><EditableTranslation translationKey="request.messages.successTitle">{t('request.messages.successTitle')}</EditableTranslation></p>
              <p>{status.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setStatus({ type: null, message: '' })}
              className="text-sm text-emerald-500 transition hover:text-emerald-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
