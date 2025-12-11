import AdminDashboard from '../components/admin/AdminDashboard.jsx';
import AdminLogin from '../components/admin/AdminLogin.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Admin() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/70">
        {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
      </div>
    </div>
  );
}
