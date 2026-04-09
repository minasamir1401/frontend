"use client";
import Link from "next/link";
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";
import { API_URL } from "@/lib/api";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const handleBid = (title: string) => {
    alert(`Elite Application Sent for: ${title}`);
    window.location.href = "/messages";
  };

  const [jobs, setJobs] = React.useState<any[]>([]);

  const loadJobs = async () => {
    const defaultJobs = [
      { id: 1, title: isRtl ? "واجهة لوحة تحكم التكنولوجيا المالية" : "Fintech Dashboard UI", budget: "$3,000 - $5,000", urgency: "Medium", type: "Full-time", tags: ["React", "D3.js"], posted: "2h ago", featured: false },
      { id: 2, title: isRtl ? "تدقيق بروتوكول DeFi" : "DeFi Protocol Audit", budget: "$25,000", urgency: "Urgent", type: "Contract", tags: ["Solidity", "EVM"], posted: "Immediate", featured: true },
      { id: 3, title: isRtl ? "واجهة تطبيق صحي للهواتف" : "Mobile Health App UI", budget: "$5,000 - $7,000", urgency: "Medium", type: "Contract", tags: ["Mobile", "Figma"], posted: "5h ago", featured: false },
    ];
    
    try {
      const response = await fetch(`${API_URL}/jobs`);
      const backendJobs = await response.json();
      
      const mappedBackend = backendJobs.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        budget: `$${p.budget}`,
        urgency: "New",
        type: "Remote",
        tags: p.technologies ? p.technologies.split(',').map((s: string) => s.trim()) : ["Engineering"],
        posted: "Just now",
        featured: false
      }));
      
      const saved = JSON.parse(localStorage.getItem('client_projects') || '[]');
      const mappedSaved = saved.filter((s:any) => !mappedBackend.find((b:any) => b.id === s.id)).map((p: any) => ({
        ...p,
        urgency: "Local",
        tags: p.skills ? p.skills.split(',').map((s: string) => s.trim()) : ["Engineering"],
        posted: "Recently",
        featured: false
      }));
      
      setJobs([...mappedBackend, ...mappedSaved, ...defaultJobs]);
    } catch (err) {
      console.warn("Backend fetch failed, using local only", err);
      const saved = JSON.parse(localStorage.getItem('client_projects') || '[]');
      setJobs([...saved, ...defaultJobs]);
    }
  };

  React.useEffect(() => {
    loadJobs();
    window.addEventListener('storage', loadJobs);
    return () => window.removeEventListener('storage', loadJobs);
  }, [isRtl]);

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen relative overflow-hidden animate-ui-fade-in ${isRtl ? 'font-arabic' : ''}`} style={{ animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
      {/* Background Code/Scientific Aesthetics */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
         <div className="absolute top-1/4 -left-20 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-cyan-600 rotate-12">{"{}"}</div>
         <div className="absolute top-3/4 -right-20 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-slate-500 -rotate-12 animate-system-pulse transition-all">{"</>"}</div>
         <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[150px] opacity-30"></div>
      </div>

      <Header />
      
      <div className={`flex pt-60 md:pt-48 relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 text-start`}>
          <div className="max-w-6xl mx-auto space-y-12">
            
            <section className={`flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-8 animate-ui-slide-down ${isRtl ? 'md:flex-row-reverse' : ''}`}>
              <div className="space-y-2 w-full">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight break-words">{t('marketplace')}</h1>
                <p className="text-slate-500 font-medium text-sm sm:text-base">{t('explorePremium')}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative group w-full sm:w-auto">
                   <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors`}>
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input 
                    placeholder={t('searchPlaceholder')} 
                    className={`${isRtl ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 outline-none w-full sm:w-80 transition-all font-be-vietnam text-sm`}
                  />
                </div>
                <button className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-cyan-600 hover:animate-btn-bounce transition-all active:scale-95 w-full sm:w-auto">
                  <span className="material-symbols-outlined">tune</span>
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {jobs.map((job, index) => (
                <div key={job.id} 
                  className={`group relative p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl overflow-hidden animate-ui-slide-down hover:animate-card-glow ${
                  job.featured 
                  ? "bg-slate-900 text-white shadow-2xl shadow-cyan-500/10 xl:col-span-2 2xl:col-span-1" 
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-cyan-500/5"
                }`}
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                >
                  {/* Subtle code backdrop for cards */}
                  <div className="absolute -bottom-4 -right-4 text-[8rem] font-mono font-black text-slate-500/5 dark:text-cyan-500/5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    {index % 2 === 0 ? "[]" : "()"}
                  </div>
                  
                  <div className={`relative z-10 flex justify-between items-start mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="flex gap-2">
                      <span className={`px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-full ${job.featured ? "bg-cyan-500 text-slate-900" : "bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"}`}>
                        {job.urgency === "Urgent" ? t('urgentPriority') : t('verified')}
                      </span>
                    </div>
                    <button className={`${job.featured ? "text-white/40 hover:text-cyan-400" : "text-slate-300 hover:text-cyan-500"} transition-colors`}>
                      <span className="material-symbols-outlined">bookmark</span>
                    </button>
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 font-plus-jakarta ${job.featured ? "group-hover:text-cyan-400" : "group-hover:text-cyan-600"} transition-colors`}>{job.title}</h3>
                  <p className={`text-sm mb-8 leading-relaxed font-be-vietnam line-clamp-2 ${job.featured ? "text-slate-400" : "text-slate-500"}`}>
                    {job.description || (isRtl ? "مطلوب بنية تحتية عالية الأداء وتكامل سلس لهذا المكون الأساسي من المنصة." : "High-performance architecture and seamless integration required for this critical component of the platform.")}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${job.featured ? "bg-white/10 border-white/20" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700"} mr-2`}>
                      <span className="material-symbols-outlined text-cyan-500 text-lg">payments</span>
                      <span className="font-bold text-sm">{job.budget}</span>
                    </div>
                    {job.tags && job.tags.map((tag: string) => (
                      <span key={tag} className={`px-4 py-1.5 text-[10px] font-bold rounded-xl border ${job.featured ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100/10 gap-6 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-cyan-500 text-base">verified_user</span>
                      </div>
                      <span className="text-xs font-medium opacity-60">QuantStamp Verified</span>
                    </div>
                    <Link 
                      href={`/jobs/${job.id}`}
                      className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-sm transition-all hover:animate-btn-bounce active:scale-95 text-center flex items-center justify-center gap-2 group/btn relative overflow-hidden ${
                        job.featured 
                        ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20" 
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
                      }`}
                    >
                      <span className={`absolute inset-0 opacity-0 group-hover/btn:animate-btn-ripple rounded-full pointer-events-none ${job.featured ? 'bg-white/20' : 'bg-white/10 dark:bg-slate-900/10'}`}></span>
                      {isRtl ? 'عرض التفاصيل' : 'View Code'}
                      <span className={`material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`}>arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
