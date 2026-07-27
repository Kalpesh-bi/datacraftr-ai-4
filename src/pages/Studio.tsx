import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FileText, Image, Share2, CreditCard, UtensilsCrossed, QrCode, Zap, Shield, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-emerald-100 via-teal-50 to-transparent rounded-full blur-3xl opacity-70" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6 animate-[fadeIn_0.6s_ease-out]">
            <Sparkles className="w-4 h-4" />
            Introducing DataCraftr Studio — AI-powered asset creation
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05]">
            Create anything for<br />your business in <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">minutes.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            One platform. AI-powered. Professional templates. Build resumes, banners, social posts, menus, business cards, and QR posters — all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/datacraftr-studio"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:shadow-xl hover:shadow-emerald-200 transition-all"
            >
              Start Creating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Explore Templates
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-500" /> Lightning fast</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> Secure</span>
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-emerald-500" /> 50+ templates</span>
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need</h2>
            <p className="mt-3 text-gray-500">Six powerful tools. One unified workflow.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: FileText, name: 'Resume Builder', desc: 'ATS-friendly resumes with AI-optimized content.', color: 'from-emerald-400 to-teal-500' },
              { icon: Image, name: 'Banner Maker', desc: 'Stunning banners for web, ads, and social.', color: 'from-teal-400 to-cyan-500' },
              { icon: Share2, name: 'Social Post Maker', desc: 'Scroll-stopping posts for every platform.', color: 'from-green-400 to-emerald-500' },
              { icon: CreditCard, name: 'Business Card Maker', desc: 'Modern cards with QR and contact integration.', color: 'from-lime-400 to-emerald-500' },
              { icon: UtensilsCrossed, name: 'Menu Maker', desc: 'Beautiful digital and print menus.', color: 'from-emerald-500 to-green-600' },
              { icon: QrCode, name: 'QR + Poster Maker', desc: 'Generate QR codes and posters with AI.', color: 'from-teal-500 to-emerald-600' },
            ].map((tool, i) => (
              <div
                key={tool.name}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-md mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{tool.name}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{tool.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  Open tool <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to create?</h2>
            <p className="mt-3 text-emerald-50">Join thousands of businesses using DataCraftr Studio.</p>
            <Link
              to="/datacraftr-studio"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-emerald-700 font-medium hover:shadow-2xl transition-all"
            >
              Open Studio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
