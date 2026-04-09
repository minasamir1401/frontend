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
    <div className={`platform-page min-h-screen relative overflow-hidden ${isRtl ? "font-arabic" : ""}`}>
      {/* Structural Scientific Background */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
         <div className="absolute top-[30%] -left-32 opacity-[0.02] dark:opacity-[0.03] text-[25vw] font-mono font-black text-cyan-600 -rotate-[10deg]">{"[ ]"}</div>
         <div className="absolute bottom-[20%] -right-10 opacity-[0.02] dark:opacity-[0.03] text-[15vw] font-mono font-black text-slate-500 rotate-12 animate-[pulse_5s_ease-in-out_infinite]">{"$"}</div>
      </div>
      <Header />
      
      <div className={`flex pt-52 md:pt-48 relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-4 sm:p-8 space-y-12 text-start w-full overflow-hidden`}>
          <section className={`flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <div className="space-y-4 w-full">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight break-words">{isRtl ? 'عروضي وأعمالي' : 'Gig Portfolio'}</h1>
              <p className="text-slate-500 font-medium font-be-vietnam text-sm sm:text-base leading-relaxed">{isRtl ? 'تتبع مساهماتك البرمجية وعروضك النشطة.' : 'Tracking your architectural contributions and active bids.'}</p>
            </div>
            <Link 
              href="/jobs"
              className="w-full sm:w-auto bg-cyan-600 text-white px-8 py-3.5 rounded-full font-extrabold text-sm transition-all hover:bg-cyan-500 active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">explore</span>
              {isRtl ? 'استكشاف الفرص' : 'Explore Gigs'}
            </Link>
          </section>

          {loading ? (
             <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : proposals.length === 0 ? (
            <div className="text-center py-20 space-y-6 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <span className="material-symbols-outlined text-6xl text-slate-200">code_blocks</span>
               <div className="space-y-2 px-6">
                 <h2 className="text-xl sm:text-2xl font-bold font-plus-jakarta break-words">{isRtl ? 'لا توجد عروض مقدمة حالياً.' : 'Silence in the vault.'}</h2>
                 <p className="text-slate-500 text-sm sm:text-base">{isRtl ? 'ابدأ بالتقديم على المشاريع لبناء مسيرتك المهنية.' : 'Initialize your career by deploying proposals to active challenges.'}</p>
               </div>
               <Link href="/jobs" className="inline-block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:brightness-110 transition-all">{isRtl ? 'قدم عرضك الأول' : 'Deploy First Bid'}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {proposals.map((prop, index) => (
                <div key={prop.id} 
                  className={`bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-2 transition-all duration-700 group relative overflow-hidden ${isRtl ? 'text-end' : 'text-start'}`}
                  style={{ animation: `fadeIn 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
                >
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none font-mono text-[10rem] font-black group-hover:scale-110 transition-transform duration-700">{"&&"}</div>
                   <div className={`relative z-10 flex flex-col md:flex-row justify-between items-start gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                      <div className="space-y-4 flex-1">
                         <div className="flex items-center gap-3">
                            <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              prop.status === "PENDING" ? "bg-amber-50 text-amber-600" : 
                              prop.status === "ACCEPTED" ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-400"
                            }`}>
                               {prop.status}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bid: ${prop.budget}</span>
                         </div>
                         <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">{prop.jobTitle}</h3>
                         <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed text-sm">{prop.description}</p>
                      </div>
                      <div className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                         <Link 
                           href={`/messages`}
                           className="w-full sm:w-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-cyan-600 transition-all flex items-center justify-center"
                         >
                           <span className="material-symbols-outlined">chat_bubble</span>
                         </Link>
                         <Link 
                           href={`/jobs/${prop.jobId}`}
                           className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all text-center"
                         >
                           {isRtl ? 'تفاصيل المهمة' : 'Mission Brief'}
                         </Link>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
