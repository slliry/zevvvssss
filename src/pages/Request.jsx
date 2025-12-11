import { useEffect, useState } from 'react';
import { ArrowRight, Mail, Phone, Building2 } from 'lucide-react';
import { apiRequest } from '../lib/apiClient.js';

const perks = [
  {
    title: 'Персональный разбор',
    description: 'Определим ваш текущий уровень зрелости и предложим дорожную карту внедрения Zeus GRC.',
  },
  {
    title: 'Демо-доступ',
    description: 'Получите доступ к песочнице, чтобы протестировать ключевые сценарии платформы.',
  },
  {
    title: 'План интеграции',
    description: 'Подготовим схему интеграции с вашими системами и оценку сроков запуска.',
  },
];

const COOLDOWN_SECONDS = 15;

export default function Request() {
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);

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
        message: `Мы уже получили заявку. Подождите ${cooldownLeft} с перед повторной отправкой.`,
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      await apiRequest('/api/requests', {
        method: 'POST',
        body: payload,
      });
      setStatus({
        type: 'success',
        message: 'Спасибо! Мы свяжемся с вами в течение рабочего дня.',
      });
      form.reset();
      setCooldownLeft(COOLDOWN_SECONDS);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message ?? 'Произошла ошибка, попробуйте позже.',
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
            Заявка
          </p>
          <h1 className="mb-4 text-4xl font-normal text-[#1A1A1A] md:text-5xl">
            Заполните форму, и мы подготовим консультацию
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            Расскажите о ваших задачах — команда Zeus предложит оптимальный сценарий внедрения.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-[0_35px_80px_rgba(0,102,255,0.08)]"
            >
            <h2 className="mb-6 text-2xl font-normal text-[#1A1A1A]">Данные компании</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Имя и фамилия
                <input
                  required
                  type="text"
                  name="name"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder="Алексей Петров"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Компания
                <input
                  required
                  type="text"
                  name="company"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder="Zeus Group"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder="you@company.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Телефон
                <input
                  type="tel"
                  name="phone"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                  placeholder="+7 (900) 123-45-67"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 md:col-span-2">
                Роль
                <select
                  name="role"
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30"
                >
                  <option value="ciso">CISO / Руководитель по безопасности</option>
                  <option value="risk">Менеджер по рискам</option>
                  <option value="compliance">Комплаенс-офицер</option>
                  <option value="it">IT-директор</option>
                  <option value="other">Другая роль</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 md:col-span-2">
                Задачи или контекст
                <textarea
                  name="message"
                  rows={4}
                  maxLength={700}
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#1A1A1A] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/30 resize-none"
                  placeholder="Какие процессы хотите автоматизировать? Какие нормативы важны?..."
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading || cooldownLeft > 0}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-3xl bg-[#0066FF] px-8 py-4 text-center text-white transition hover:bg-[#0052CC] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? 'Отправляем…'
                : cooldownLeft > 0
                  ? `Готово! Повторно через ${cooldownLeft} с`
                  : 'Отправить заявку'}
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
              <h3 className="mb-3 text-2xl font-normal text-[#1A1A1A]">Что вы получите</h3>
              <p className="text-gray-600">
                После отправки формы мы назначим встречу, подберём релевантный сценарий и передадим материалы
                для аргументации внутри компании.
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
                support@zeus-grc.com
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#0066FF]" size={18} />
                +7 707 388 66 39
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="text-[#0066FF]" size={18} />
                г.Алматы, проспект Достык, 290
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
              <p className="text-base font-semibold text-emerald-800">Заявка отправлена</p>
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
