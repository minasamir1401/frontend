"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";
import { API_URL } from "@/lib/api";

export default function DeveloperDashboard() {
  const { t, isRtl } = useLanguage();
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      const developerId = localStorage.getItem("userId");
      if (!developerId) {
        setLoading(false);
        return;
      }

      try {
        // We fetch all jobs and filter for proposals by this dev
        // In a real app we'd have /api/proposals/developer/:id
        const response = await fetch(`${API_URL}/jobs`);
        const allJobs = await response.json();
        
        const myProposals: any[] = [];
        allJobs.forEach((job: any) => {
          (job.proposals || []).forEach((prop: any) => {
            if (prop.developerId === developerId) {
              myProposals.push({
                ...prop,
                jobTitle: job.title,
                jobBudget: job.budget,
                jobStatus: job.status
              });
            }
          });
        });
        
        setProposals(myProposals);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, [isRtl]);

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen relative overflow-hidden ${isRtl ? 'font-arabic' : ''}`}>
      {/* Background Code/Scientific Aesthetics */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
         <div className="absolute top-1/4 -left-20 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-cyan-600 rotate-12">{"{}"}</div>
         <div className="absolute top-3/4 -right-20 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-slate-500 -rotate-12 animate-pulse transition-all">{"</>"}</div>
         <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[150px] opacity-30"></div>
      </div>

      <Header />
      
      <div className={`flex pt-60 md:pt-48 relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 text-start`}>
          <div className="max-w-6xl mx-auto space-y-12">
            
            <section className={`flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
              <div className="space-y-2 w-full">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight break-words">
                  {isRtl ? 'عروضي وأعمالي' : 'Gig Portfolio'}
                </h1>
                <p className="text-slate-500 font-medium text-sm sm:text-base">
                  {isRtl ? 'تتبع مساهماتك البرمجية وعروضك النشطة.' : 'Tracking your architectural contributions and active bids.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <Link 
                  href="/jobs"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-cyan-500 text-slate-900 font-extrabold text-sm hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">explore</span>
                  {isRtl ? 'استكشاف الفرص' : 'Explore Gigs'}
                </Link>
              </div>
            </section>

            {loading ? (
               <div className="flex items-center justify-center py-20">
                  <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-20 space-y-6 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full"></div>
                 <span className="material-symbols-outlined text-6xl text-slate-200">code_blocks</span>
                 <div className="space-y-2 px-6">
                   <h2 className="text-xl sm:text-2xl font-bold font-plus-jakarta break-words">{isRtl ? 'لا توجد عروض مقدمة حالياً.' : 'Silence in the vault.'}</h2>
                   <p className="text-slate-500 text-sm sm:text-base">{isRtl ? 'ابدأ بالتقديم على المشاريع لبناء مسيرتك المهنية.' : 'Initialize your career by deploying proposals to active challenges.'}</p>
                 </div>
                 <Link href="/jobs" className="inline-block px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl">{isRtl ? 'قدم عرضك الأول' : 'Deploy First Bid'}</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {proposals.map((prop, index) => (
                  <div key={prop.id} 
                    className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl overflow-hidden hover:shadow-cyan-500/5"
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
                  >
                    {/* Subtle code backdrop for cards */}
                    <div className="absolute -bottom-4 -right-4 text-[8rem] font-mono font-black text-slate-500/5 dark:text-cyan-500/5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                      {index % 2 === 0 ? "&&" : "=>"}
                    </div>
                    
                    <div className={`relative z-10 flex justify-between items-start mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="flex gap-2">
                        <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full ${
                          prop.status === "ACCEPTED" ? "bg-green-500/10 text-green-500 border border-green-500/20" : 
                          prop.status === "PENDING" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : 
                          "bg-slate-500/10 text-slate-500 border border-slate-500/20"
                        }`}>
                          {prop.status}
                        </span>
                        <span className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20">
                          ${prop.budget}
                        </span>
                      </div>
                      <Link href="/messages" className="text-slate-300 hover:text-cyan-500 transition-colors">
                        <span className="material-symbols-outlined">chat_bubble</span>
                      </Link>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 font-plus-jakarta group-hover:text-cyan-600 transition-colors text-slate-900 dark:text-white leading-tight">
                      {prop.jobTitle}
                    </h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-be-vietnam line-clamp-2">
                      {prop.description || (isRtl ? 'عرض فني متكامل يغطي كافة جوانب التنفيذ والتحقق.' : 'Comprehensive technical proposal covering all execution and validation aspects.')}
                    </p>

                    <div className={`flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 gap-6 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-cyan-500 text-sm">schedule</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {isRtl ? 'منذ يومين' : '2 Days Ago'}
                        </span>
                      </div>
                      <Link 
                        href={`/jobs/${prop.jobId}`}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-[11px] uppercase tracking-widest hover:brightness-110 shadow-lg transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                      >
                        {isRtl ? 'تفاصيل المهمة' : 'Mission Brief'}
                        <span className={`material-symbols-outlined text-sm transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
