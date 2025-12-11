import { getStatusMeta } from '../../constants/requestStatus.js';

export default function StatusBadge({ status }) {
  const meta = getStatusMeta(status);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${meta.colorClass}`}
    >
      {meta.label}
    </span>
  );
}
