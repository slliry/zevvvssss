import { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  LogOut,
  RefreshCcw,
  Search,
  Calendar,
  ArrowUpRight,
  Mail,
  Building2,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusBadge from './StatusBadge.jsx';
import { REQUEST_STATUSES } from '../../constants/requestStatus.js';

const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function groupByStatus(items) {
  return items.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { new: 0, in_review: 0, done: 0, archived: 0 }
  );
}

export default function AdminDashboard() {
  const { token, user, logout } = useAuth();
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    from: '',
    to: '',
  });
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadRequests() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest('/api/requests', {
          token,
          query: {
            ...filters,
            status: filters.status || undefined,
            search: filters.search || undefined,
            from: filters.from || undefined,
            to: filters.to || undefined,
          },
          signal: controller.signal,
        });
        setRequests(data.items);
        setTotal(data.total);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
    return () => controller.abort();
  }, [token, filters, refreshTick]);

  const stats = useMemo(() => groupByStatus(requests), [requests]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ status: '', search: '', from: '', to: '' });
  };

  const handleChangeStatus = async (id, status) => {
    try {
      const updated = await apiRequest(`/api/requests/${id}/status`, {
        method: 'PATCH',
        token,
        body: { status },
      });
      setRequests((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 text-white">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-cyan-300/80">Админ-панель</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Заявки Zeus</h1>
          <p className="mt-2 text-sm text-slate-400">Всего заявок: {total}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">Оператор</p>
            <p className="text-white">{user?.name || user?.email}</p>
          </div>
          <span className="h-6 w-px bg-white/10" />
          <button
            onClick={() => setRefreshTick((tick) => tick + 1)}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-white"
          >
            <RefreshCcw size={16} />
            Обновить
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-rose-100 transition hover:border-rose-400 hover:text-white"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {REQUEST_STATUSES.map((status) => (
          <div
            key={status.value}
            className="rounded-3xl border border-white/5 bg-white/5 p-5 backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{status.label}</p>
            <p className="mt-3 text-4xl font-semibold text-white">
              {stats[status.value] ?? 0}
            </p>
            <p className="text-xs text-slate-500">шт.</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
              <Search size={16} className="text-cyan-300" />
              <input
                type="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Поиск по имени, компании, email…"
                className="bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
              <Filter size={16} className="text-cyan-300" />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="admin-select bg-transparent text-sm text-white focus:outline-none"
              >
                <option value="">Все статусы</option>
                {REQUEST_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <Calendar size={16} className="text-cyan-300" />
              <input
                type="date"
                name="from"
                value={filters.from}
                onChange={handleFilterChange}
                className="bg-transparent focus:outline-none"
              />
              <span className="text-slate-500">—</span>
              <input
                type="date"
                name="to"
                min={filters.from || undefined}
                value={filters.to}
                onChange={handleFilterChange}
                className="bg-transparent focus:outline-none"
              />
            </label>
            <button
              onClick={handleClearFilters}
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white"
            >
              Сбросить
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-slate-400">
                <th className="px-4 py-2">Заявка</th>
                <th className="px-4 py-2">Контакты</th>
                <th className="px-4 py-2">Комментарий</th>
                <th className="px-4 py-2">Статус</th>
                <th className="px-4 py-2 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    Загружаем заявки…
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    Ничего не найдено
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td className="rounded-l-3xl border-y border-l border-white/5 bg-white/5 px-4 py-4 align-top">
                      <p className="text-base font-semibold text-white">{request.name}</p>
                      <p className="text-sm text-slate-400">{request.company}</p>
                      <p className="mt-3 text-xs text-slate-500">{formatDate(request.created_at)}</p>
                    </td>
                    <td className="border-y border-white/5 bg-white/5 px-4 py-4 align-top">
                      <div className="flex flex-col gap-2 text-sm">
                        <span className="inline-flex items-center gap-2 text-slate-300">
                          <Mail size={14} className="text-cyan-300" />
                          {request.email}
                        </span>
                        {request.phone && (
                          <span className="inline-flex items-center gap-2 text-slate-300">
                            <ArrowUpRight size={14} className="text-cyan-300" />
                            {request.phone}
                          </span>
                        )}
                        {request.role && (
                          <span className="inline-flex items-center gap-2 text-slate-300">
                            <Building2 size={14} className="text-cyan-300" />
                            {request.role}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="border-y border-white/5 bg-white/5 px-4 py-4 text-sm text-slate-100">
                      {request.message || '—'}
                    </td>
                    <td className="border-y border-white/5 bg-white/5 px-4 py-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="rounded-r-3xl border-y border-r border-white/5 bg-white/5 px-4 py-4 text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        {REQUEST_STATUSES.filter((option) => option.value !== request.status).map(
                          (option) => (
                            <button
                              key={option.value}
                              onClick={() => handleChangeStatus(request.id, option.value)}
                              className="rounded-2xl border border-white/10 px-3 py-1 text-xs text-slate-200 transition hover:border-cyan-400 hover:text-white"
                            >
                              {option.label}
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
