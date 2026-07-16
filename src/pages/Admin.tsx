import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Mail, CalendarCheck, PlayCircle, Users, LogIn, LogOut, RefreshCw, Inbox } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Tab = 'overview' | 'contacts' | 'consultations' | 'demos' | 'newsletter';

export default function Admin() {
  const [tab, setTab] = useState<Tab>('overview');
  const [session, setSession] = useState<import('@supabase/supabase-js').Session | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [contacts, setContacts] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [demos, setDemos] = useState<any[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      (async () => setSession(sess))();
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    const [c, con, d, n] = await Promise.all([
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('consultation_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('demo_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
    ]);
    setContacts(c.data || []);
    setConsultations(con.data || []);
    setDemos(d.data || []);
    setNewsletter(n.data || []);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (session) fetchData();
  }, [session, fetchData]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    const { error } = authMode === 'signin'
      ? await supabase.auth.signInWithPassword(authForm)
      : await supabase.auth.signUp({ email: authForm.email, password: authForm.password });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const signOut = () => supabase.auth.signOut();

  if (!session) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-navy-950 px-4">
        <div className="absolute inset-0 bg-grid-dark opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md"
        >
          <div className="glass-dark rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-600 flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-navy-300 mt-1">Sign in to manage submissions</p>
            </div>
            <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/5">
              <button onClick={() => setAuthMode('signin')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${authMode === 'signin' ? 'bg-white text-navy-900' : 'text-navy-300'}`}>
                Sign In
              </button>
              <button onClick={() => setAuthMode('signup')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${authMode === 'signup' ? 'bg-white text-navy-900' : 'text-navy-300'}`}>
                Sign Up
              </button>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <input type="email" required placeholder="Email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-navy-400 focus:outline-none focus:border-navy-500/50" />
              <input type="password" required placeholder="Password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-navy-400 focus:outline-none focus:border-navy-500/50" />
              {authError && <p className="text-sm text-red-400">{authError}</p>}
              <button type="submit" disabled={authLoading} className="btn-primary w-full">
                <LogIn className="w-4 h-4" />
                {authLoading ? 'Please wait...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Mail; count: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, count: 0 },
    { id: 'contacts', label: 'Contacts', icon: Mail, count: contacts.length },
    { id: 'consultations', label: 'Consultations', icon: CalendarCheck, count: consultations.length },
    { id: 'demos', label: 'Demo Requests', icon: PlayCircle, count: demos.length },
    { id: 'newsletter', label: 'Newsletter', icon: Users, count: newsletter.length },
  ];

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-navy-50">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-sm text-navy-500">Signed in as {session.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchData} className="btn-ghost text-sm" disabled={loadingData}>
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button onClick={signOut} className="btn-outline text-sm py-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 hover:bg-navy-100'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${tab === t.id ? 'bg-white/20' : 'bg-navy-100'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Contact Submissions', value: contacts.length, icon: Mail, color: 'from-blue-500 to-cyan-500' },
              { label: 'Consultation Requests', value: consultations.length, icon: CalendarCheck, color: 'from-navy-500 to-emerald-500' },
              { label: 'Demo Requests', value: demos.length, icon: PlayCircle, color: 'from-purple-500 to-pink-500' },
              { label: 'Newsletter Subscribers', value: newsletter.length, icon: Users, color: 'from-amber-500 to-orange-500' },
            ].map((s) => (
              <div key={s.label} className="card p-6">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-display text-3xl font-bold text-navy-900">{s.value}</div>
                <div className="text-sm text-navy-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'contacts' && <DataTable rows={contacts} />}
        {tab === 'consultations' && <DataTable rows={consultations} />}
        {tab === 'demos' && <DataTable rows={demos} />}
        {tab === 'newsletter' && <DataTable rows={newsletter} />}

        {tab !== 'overview' && (contacts.length === 0 && consultations.length === 0 && demos.length === 0 && newsletter.length === 0) && (
          <div className="card p-12 text-center">
            <Inbox className="w-12 h-12 text-navy-300 mx-auto mb-3" />
            <p className="text-navy-500">No submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DataTable({ rows }: { rows: any[] }) {
  if (rows.length === 0) {
    return (
      <div className="card p-12 text-center">
        <Inbox className="w-12 h-12 text-navy-300 mx-auto mb-3" />
        <p className="text-navy-500">No records yet.</p>
      </div>
    );
  }
  const keys = Object.keys(rows[0]).filter((k) => k !== 'id');
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-50 border-b border-navy-100">
              {keys.map((k) => (
                <th key={k} className="px-4 py-3 text-left font-semibold text-navy-700 capitalize">{k.replace(/_/g, ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50/30'}>
                {keys.map((k) => (
                  <td key={k} className="px-4 py-3 text-navy-600 align-top max-w-xs">
                    {k === 'created_at' ? new Date(row[k]).toLocaleString() : String(row[k] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
