export const REQUEST_STATUSES = [
  { value: 'new', label: 'Новая', colorClass: 'bg-sky-100 text-sky-800 border-sky-200' },
  { value: 'in_review', label: 'В работе', colorClass: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'done', label: 'Завершена', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { value: 'archived', label: 'Архив', colorClass: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export function getStatusMeta(value) {
  return REQUEST_STATUSES.find((status) => status.value === value) ?? REQUEST_STATUSES[0];
}
