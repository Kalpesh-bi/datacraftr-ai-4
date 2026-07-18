const formatIST = (date: string) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Eye, MousePointerClick, Clock, TrendingUp,
  TrendingDown, Mail, CalendarCheck, Smartphone, Monitor, Tablet,
  LogOut, RefreshCw, Download, Search, ChevronLeft, ChevronRight,
  Globe, MapPin, Activity, Bell, X, Shield, ArrowUpRight, ArrowDownRight,
  FileText, Phone, Building2, MessageSquare, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { useAdminAuth } from '../lib/useAdminAuth';

const ADMIN_DATA_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-data`;

type Tab = 'overview' | 'live' | 'traffic' | 'leads' | 'visitors';
type DateFilter = 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'this_month' | 'last_month' | 'this_year' | 'all';

const dateFilters: { id: DateFilter; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'this_year', label: 'This Year' },
  { id: 'all', label: 'All Time' },
];

function getDateRange(filter: DateFilter): { start: string; end: string } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'today': break;
    case 'yesterday':
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      break;
    case '7d': start.setDate(start.getDate() - 7); break;
    case '30d': start.setDate(start.getDate() - 30); break;
    case '90d': start.setDate(start.getDate() - 90); break;
    case 'this_month': start.setDate(1); break;
    case 'last_month':
      start.setMonth(start.getMonth() - 1, 1);
      end.setDate(0);
      break;
    case 'this_year': start.setMonth(0, 1); break;
    case 'all':
      start.setFullYear(2020, 0, 1);
      break;
  }
  return { start: start.toISOString(), end: end.toISOString() };
}

export default function Admin() {
  const { admin, loading, login, logout } = useAdminAuth();
  const [loginForm, setLoginForm] = useState({ mobile: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (!admin) {
    return (
      <LoginScreen
        form={loginForm}
        setForm={setLoginForm}
        error={loginError}
        setError={setLoginError}
        loading={loginLoading}
        setLoading={setLoginLoading}
        login={login}
      />
    );
  }

  return <Dashboard admin={admin} onLogout={logout} />;
}

function LoginScreen({ form, setForm, error, setError, loading, setLoading, login }: any) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.mobile, form.password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/8 blur-[120px] rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="card p-8 shadow-premium">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Secure access to Datacraftr.ai dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard({ admin, onLogout }: { admin: any; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [data, setData] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const prevLeadsRef = useRef(0);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    try {
      const { start, end } = getDateRange(dateFilter);
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      const [overviewRes, leadsRes, visitorsRes] = await Promise.all([
        fetch(`${ADMIN_DATA_URL}?action=overview&start=${start}&end=${end}`, { headers }),
        fetch(`${ADMIN_DATA_URL}?action=leads`, { headers }),
        fetch(`${ADMIN_DATA_URL}?action=visitors`, { headers }),
      ]);

      if (overviewRes.ok) {
        const overviewData = await overviewRes.json();
        setData(overviewData);
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
        if (leadsData.leads?.length > prevLeadsRef.current && prevLeadsRef.current > 0) {
          const newLeads = leadsData.leads.length - prevLeadsRef.current;
          setNotifications((prev) => [
            { id: Date.now(), message: `${newLeads} new lead${newLeads > 1 ? 's' : ''} received`, time: new Date().toISOString() },
            ...prev,
          ].slice(0, 10));
        }
        prevLeadsRef.current = leadsData.leads?.length || 0;
      }

      if (visitorsRes.ok) {
        const visitorsData = await visitorsRes.json();
        setVisitors(visitorsData.visitors || []);
      }
    } catch {
      // Silent fail
    }
    setLoadingData(false);
  }, [dateFilter]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'live', label: 'Live Visitors', icon: Activity },
    { id: 'traffic', label: 'Traffic', icon: TrendingUp },
    { id: 'leads', label: 'Leads', icon: Mail },
    { id: 'visitors', label: 'Visitor Log', icon: Users },
  ];

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-xl lg:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {admin.name || 'Admin'}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Bell className="w-4 h-4 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-12 w-80 card p-4 shadow-premium z-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                      <button onClick={() => setNotifications([])}>
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                            <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-700">{n.message}</p>
                              <p className="text-xs text-gray-400">{new Date(n.time).toLocaleTimeString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={fetchData} disabled={loadingData} className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <RefreshCw className={`w-4 h-4 text-gray-600 ${loadingData ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Date filters */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-1">
          {dateFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setDateFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === f.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'overview' && <OverviewTab data={data} />}
        {tab === 'live' && <LiveVisitorsTab data={data} />}
        {tab === 'traffic' && <TrafficTab data={data} />}
        {tab === 'leads' && <LeadsTab leads={leads} onUpdate={fetchData} />}
        {tab === 'visitors' && <VisitorsTab visitors={visitors} />}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sublabel, color, trend }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${trend >= 0 ? 'text-brand-600' : 'text-red-500'}`}>
            {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="font-display text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sublabel && <div className="text-xs text-gray-400 mt-1">{sublabel}</div>}
    </motion.div>
  );
}

function OverviewTab({ data }: { data: any }) {
  if (!data) return <LoadingState />;
  const { stats, deviceBreakdown, dailyVisitors, trafficSources, topPages } = data;

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Visitors" value={stats?.totalVisitors || 0} color="bg-gradient-to-br from-brand-500 to-brand-700" />
        <StatCard icon={Activity} label="Active Now" value={stats?.activeVisitors || 0} color="bg-gradient-to-br from-emerald-500 to-teal-600" sublabel="Live visitors" />
        <StatCard icon={Eye} label="Page Views" value={stats?.totalPageViews || 0} color="bg-gradient-to-br from-blue-500 to-indigo-600" />
        <StatCard icon={Clock} label="Avg Session" value={`${stats?.avgSessionDuration || 0}s`} color="bg-gradient-to-br from-amber-500 to-orange-600" />
        <StatCard icon={TrendingDown} label="Bounce Rate" value={`${stats?.bounceRate || 0}%`} color="bg-gradient-to-br from-rose-500 to-red-600" />
        <StatCard icon={Users} label="Returning" value={stats?.returningVisitors || 0} color="bg-gradient-to-br from-violet-500 to-purple-600" />
        <StatCard icon={Users} label="New Visitors" value={stats?.newVisitors || 0} color="bg-gradient-to-br from-cyan-500 to-blue-600" />
        <StatCard icon={Mail} label="Contacts" value={stats?.totalContacts || 0} color="bg-gradient-to-br from-pink-500 to-rose-600" />
        <StatCard icon={CalendarCheck} label="Consultations" value={stats?.totalConsultations || 0} color="bg-gradient-to-br from-teal-500 to-emerald-600" />
        <StatCard icon={MousePointerClick} label="WhatsApp Clicks" value={stats?.whatsappClicks || 0} color="bg-gradient-to-br from-green-500 to-green-700" />
        <StatCard icon={Smartphone} label="Mobile" value={deviceBreakdown?.mobile || 0} color="bg-gradient-to-br from-indigo-500 to-violet-600" />
        <StatCard icon={Monitor} label="Desktop" value={deviceBreakdown?.desktop || 0} color="bg-gradient-to-br from-slate-500 to-gray-700" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Daily visitors chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Daily Visitors</h3>
          <BarChart data={dailyVisitors || []} />
        </div>

        {/* Traffic sources */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {(trafficSources || []).slice(0, 6).map(([source, count]: any) => {
              const total = (trafficSources || []).reduce((sum: number, [, c]: any) => sum + c, 0) || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={source}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{source}</span>
                    <span className="font-semibold text-gray-900">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top pages */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Top Pages</h3>
        <div className="space-y-2">
          {(topPages || []).map(([page, views]: any) => (
            <div key={page} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{page}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{views} views</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device breakdown */}
      <div className="grid sm:grid-cols-3 gap-4">
        <DeviceCard icon={Monitor} label="Desktop" value={deviceBreakdown?.desktop || 0} color="text-blue-600" bg="bg-blue-50" />
        <DeviceCard icon={Smartphone} label="Mobile" value={deviceBreakdown?.mobile || 0} color="text-brand-600" bg="bg-brand-50" />
        <DeviceCard icon={Tablet} label="Tablet" value={deviceBreakdown?.tablet || 0} color="text-amber-600" bg="bg-amber-50" />
      </div>
    </div>
  );
}

function DeviceCard({ icon: Icon, label, value, color, bg }: any) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <div className="font-display text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

function BarChart({ data }: { data: [string, number][] }) {
  if (!data.length) return <p className="text-sm text-gray-400 text-center py-8">No data yet</p>;
  const max = Math.max(...data.map(([, v]) => v)) || 1;
  return (
    <div className="flex items-end gap-1 h-40">
      {data.slice(-20).map(([day, value]) => (
        <div key={day} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-gradient-to-t from-brand-600/40 to-brand-500 hover:from-brand-600/60 hover:to-brand-600 transition-all cursor-default relative group"
            style={{ height: `${(value / max) * 100}%` }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">{value}</span>
          </div>
          <span className="text-[10px] text-gray-400">{day.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

function LiveVisitorsTab({ data }: { data: any }) {
  if (!data) return <LoadingState />;
  const liveVisitors = data.liveVisitors || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-brand-500" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-brand-500 animate-ping" />
        </div>
        <h3 className="font-semibold text-gray-900">{liveVisitors.length} Active Visitors</h3>
      </div>

      {liveVisitors.length === 0 ? (
        <div className="card p-12 text-center">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No active visitors right now</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Page</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Device</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Browser</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">OS</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Source</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Started</th>
                </tr>
              </thead>
              <tbody>
                {liveVisitors.map((v: any, i: number) => (
                  <tr key={v.session_id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                    <td className="px-4 py-3 text-gray-700">{v.entry_page || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {v.city || v.country || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{v.device_type || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{v.browser || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{v.os || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{v.referrer_source || 'direct'}</td>
                    <td className="px-4 py-3 text-gray-500">{v.session_start ? new Date(v.session_start).toLocaleTimeString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function TrafficTab({ data }: { data: any }) {
  if (!data) return <LoadingState />;
  const { dailyVisitors, browserBreakdown, osBreakdown, countryBreakdown, cityBreakdown, trafficSources, topPages } = data;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Visitors Over Time</h3>
          <BarChart data={dailyVisitors || []} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <BreakdownList data={trafficSources || []} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Browser Usage</h3>
          <BreakdownList data={browserBreakdown || []} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Operating Systems</h3>
          <BreakdownList data={osBreakdown || []} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Countries</h3>
          <BreakdownList data={countryBreakdown || []} icon={Globe} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Cities</h3>
          <BreakdownList data={cityBreakdown || []} icon={MapPin} />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Most Visited Pages</h3>
        <div className="space-y-2">
          {(topPages || []).map(([page, views]: any) => (
            <div key={page} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-700">{page}</span>
              <span className="text-sm font-semibold text-gray-900">{views} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BreakdownList({ data, icon: Icon }: { data: [string, number][]; icon?: any }) {
  const total = data.reduce((sum, [, c]) => sum + c, 0) || 1;
  return (
    <div className="space-y-3">
      {data.slice(0, 8).map(([label, count]) => {
        const pct = Math.round((count / total) * 100);
        return (
          <div key={label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="flex items-center gap-1.5 text-gray-700">
                {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
                {label}
              </span>
              <span className="font-semibold text-gray-900">{count} ({pct}%)</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LeadsTab({ leads, onUpdate }: { leads: any[]; onUpdate: () => void }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortKey, setSortKey] = useState('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const pageSize = 10;

  const filtered = leads
    .filter((l) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || [l.name, l.email, l.company, l.phone, l.message].some((v) => (v || '').toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      const matchesType = typeFilter === 'all' || l.lead_type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      if (sortDir === 'asc') return av > bv ? 1 : -1;
      return av < bv ? 1 : -1;
    });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const exportCSV = () => {
    const headers = ['Type', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Date', 'Status'];
    const rows = filtered.map((l) => [
      l.lead_type, l.name, l.email, l.phone, l.company, l.service_interest || '',
      (l.message || '').replace(/"/g, '""'), new Date(l.created_at).toISOString(), l.status || 'new',
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    downloadFile(csv, 'leads.csv', 'text/csv');
  };

  const exportExcel = () => {
    const html = `<table><thead><tr>${['Type', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Date', 'Status'].map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${filtered.map((l) => `<tr><td>${l.lead_type}</td><td>${l.name || ''}</td><td>${l.email || ''}</td><td>${l.phone || ''}</td><td>${l.company || ''}</td><td>${l.service_interest || ''}</td><td>${(l.message || '').replace(/</g, '&lt;')}</td><td>${new Date(l.created_at).toLocaleString()}</td><td>${l.status || 'new'}</td></tr>`).join('')}</tbody></table>`;
    downloadFile(html, 'leads.xls', 'application/vnd.ms-excel');
  };

  const updateStatus = async (lead: any, status: string) => {
    try {
      await fetch(`${ADMIN_DATA_URL}?action=update-lead-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ lead_type: lead.lead_type, lead_id: lead.id, status }),
      });
      onUpdate();
      setSelectedLead({ ...lead, status });
    } catch {
      // Silent fail
    }
  };

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-10 py-2 text-sm"
            />
          </div>
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }} className="input-field py-2 text-sm w-auto">
            <option value="all">All Types</option>
            <option value="contact">Contact</option>
            <option value="consultation">Consultation</option>
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="input-field py-2 text-sm w-auto">
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button onClick={exportExcel} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No leads found</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort('lead_type')}>Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort('name')}>Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort('email')}>Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Company</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Service</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort('created_at')}>Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((l, i) => (
                    <tr
                      key={l.id || i}
                      onClick={() => setSelectedLead(l)}
                      className={`cursor-pointer hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                    >
                      <td className="px-4 py-3">
                        <span className={`badge ${l.lead_type === 'contact' ? 'bg-blue-50 text-blue-700' : 'bg-brand-50 text-brand-700'}`}>
                          {l.lead_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">{l.name || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{l.email || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{l.phone || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{l.company || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{l.service_interest || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(l.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={l.status || 'new'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-1">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 text-sm text-gray-600">{page} / {totalPages}</span>
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Lead detail modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative card p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-50">
                <X className="w-5 h-5 text-gray-400" />
              </button>
              <div className="mb-4">
                <span className={`badge ${selectedLead.lead_type === 'contact' ? 'bg-blue-50 text-blue-700' : 'bg-brand-50 text-brand-700'}`}>
                  {selectedLead.lead_type}
                </span>
                <h3 className="font-display text-xl font-bold text-gray-900 mt-2">{selectedLead.name}</h3>
              </div>
              <div className="space-y-3 text-sm">
                <DetailRow icon={Mail} label="Email" value={selectedLead.email} />
                <DetailRow icon={Phone} label="Phone" value={selectedLead.phone} />
                <DetailRow icon={Building2} label="Company" value={selectedLead.company} />
                <DetailRow icon={FileText} label="Service" value={selectedLead.service_interest} />
                {selectedLead.preferred_date && <DetailRow icon={CalendarCheck} label="Preferred Date" value={selectedLead.preferred_date} />}
                <DetailRow icon={MessageSquare} label="Message" value={selectedLead.message} />
                <DetailRow icon={Clock} label="Received" value={new Date(selectedLead.created_at).toLocaleString()} />
              </div>
              <div className="mt-6 flex gap-2">
                <button onClick={() => updateStatus(selectedLead, 'new')} className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold ${selectedLead.status === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>New</button>
                <button onClick={() => updateStatus(selectedLead, 'contacted')} className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold ${selectedLead.status === 'contacted' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Contacted</button>
                <button onClick={() => updateStatus(selectedLead, 'closed')} className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold ${selectedLead.status === 'closed' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Closed</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-gray-900">{value || '—'}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700',
    contacted: 'bg-amber-50 text-amber-700',
    closed: 'bg-brand-50 text-brand-700',
  };
  return <span className={`badge ${styles[status] || styles.new}`}>{status}</span>;
}

function VisitorsTab({ visitors }: { visitors: any[] }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filtered = visitors.filter((v) => {
    const q = search.toLowerCase();
    return !q || [v.session_id, v.country, v.city, v.browser, v.os, v.device_type, v.entry_page].some((val) => (val || '').toLowerCase().includes(q));
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search visitors..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="input-field pl-10 py-2 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No visitors recorded yet</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Session ID</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Device</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Browser</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">OS</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Entry</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Pages</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((v, i) => (
                    <tr key={v.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">{v.session_id?.slice(0, 16) || '—'}...</td>
                      <td className="px-4 py-3 text-gray-600">{[v.city, v.country].filter(Boolean).join(', ') || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{v.device_type || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{v.browser || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{v.os || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{v.entry_page || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{v.pages_viewed || 0}</td>
                      <td className="px-4 py-3 text-gray-600">{v.duration_seconds ? `${v.duration_seconds}s` : '—'}</td>
                      <td className="px-4 py-3">
                        {v.is_active ? (
                          <span className="flex items-center gap-1 text-brand-600 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" /> Active
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Ended</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{new Date(v.session_start).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-1">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 text-sm text-gray-600">{page} / {totalPages}</span>
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <RefreshCw className="w-8 h-8 text-brand-500 animate-spin" />
    </div>
  );
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
