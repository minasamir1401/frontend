"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";
import { API_URL } from "@/lib/api";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const clientId = localStorage.getItem("userId");
      if (!clientId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/jobs?clientId=${clientId}`);
        if (!response.ok) throw new Error("Fetch failed");
        
        const backendJobs = await response.json();
        const mappedBackend = backendJobs.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          budget: `$${p.budget}`,
          status: p.status === "OPEN" ? (isRtl ? "متاح" : "Open") : (isRtl ? "قيد التنفيذ" : "In Progress"),
          progress: p.status === "OPEN" ? 0 : 45,
          skills: p.technologies,
          client: "Me",
          proposalsCount: p.proposals?.length || 0
        }));
        
        setProjects(mappedBackend);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isRtl]);

  const handlePostGig = () => {
    window.location.href = "/dashboard/client/post-project";
  };

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen relative overflow-hidden ${isRtl ? "font-arabic" : ""}`}>
      {/* Structural Scientific Background */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
         <div className="absolute top-[20%] -right-20 opacity-[0.02] dark:opacity-[0.03] text-[25vw] font-mono font-black text-cyan-600 rotate-[15deg]">{"()"}</div>
         <div className="absolute bottom-[10%] -left-10 opacity-[0.02] dark:opacity-[0.03] text-[15vw] font-mono font-black text-slate-500 -rotate-12 animate-[pulse_4s_ease-in-out_infinite]">{"++"}</div>
      </div>
      <Header />
      
      <div className={`flex pt-[144px] md:pt-[176px] relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 space-y-12 text-start`}>
          <section className={`flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <div className="space-y-2 text-start">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">{isRtl ? 'المشاريع الحالية' : 'Active Portfolio'}</h1>
              <p className="text-slate-500 font-medium font-be-vietnam">{isRtl ? 'إدارة البنية التحتية الرقمية العالمية.' : 'Managing global digital infrastructure.'}</p>
            </div>
            <button 
              onClick={handlePostGig}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-full font-extrabold text-sm transition-all hover:brightness-110 active:scale-95 shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              {t('postAProject')}
            </button>
          </section>

          {loading ? (
             <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 space-y-6 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
               <span className="material-symbols-outlined text-6xl text-slate-200">rocket_launch</span>
               <div className="space-y-2">
                 <h2 className="text-2xl font-bold font-plus-jakarta">{isRtl ? 'لا توجد مشاريع نشطة حالياً.' : 'No active projects yet.'}</h2>
                 <p className="text-slate-500">{isRtl ? 'ابدأ بنشر أول تحدٍّ تقني لك لتوظيف نخبة المهندسين.' : 'Start by posting your first technical challenge for elite engineers.'}</p>
               </div>
               <button onClick={handlePostGig} className="px-8 py-3 bg-cyan-600 text-white rounded-full font-bold hover:bg-cyan-500 transition-all">{t('postAProject')}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                {projects.map((project, index) => (
                  <div key={project.id} 
                    className={`bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-2 transition-all duration-700 group relative overflow-hidden ${isRtl ? 'text-end' : 'text-start'}`}
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none font-mono text-[10rem] font-black group-hover:scale-110 transition-transform duration-700">{"//"}</div>
                    <div className="flex-1 space-y-6 relative z-10">
                      <div className={`flex justify-between items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className="flex flex-col gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-1 leading-none">{project.client}</p>
                          <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">{project.title}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            project.status === "In Progress" || project.status === "قيد التنفيذ" ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300" : "bg-green-50 text-green-700"
                          }`}>{project.status}</span>
                          {project.proposalsCount > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-cyan-600/20 animate-pulse">
                               <span className="material-symbols-outlined text-[10px]">mark_email_unread</span>
                               {project.proposalsCount} {isRtl ? 'عروض مقدمة' : 'New Proposals'}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                         <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                            {project.description || (isRtl ? 'لا يوجد وصف متاح للمشروع حالياً.' : 'No description available for this project.')}
                         </p>
                         
                         {project.skills && (
                           <div className={`flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              {project.skills.split(',').map((skill: string) => (
                                <span key={skill} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-lg border border-slate-100 dark:border-slate-700 uppercase tracking-tighter">
                                  {skill.trim()}
                                </span>
                              ))}
                           </div>
                         )}
                      </div>

                      <div className="space-y-2">
                         <div className={`flex justify-between text-xs font-bold text-slate-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span>{isRtl ? 'تقدم التطوير' : 'Development Progress'}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between pt-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="material-symbols-outlined text-slate-400">payments</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{project.budget}</span>
                        </div>
                        <Link 
                          href={`/dashboard/client/project/${project.id}`}
                          className={`text-cyan-600 font-bold text-sm hover:underline flex items-center gap-1`}
                        >
                          {isRtl ? 'عرض التفاصيل' : 'View Details'} <span className={`material-symbols-outlined text-sm ${isRtl ? 'rotate-180' : ''}`}>arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 space-y-6 text-start">
                  <h4 className="text-lg font-bold font-plus-jakarta">{isRtl ? 'إحصائيات الملف' : 'Portfolio Stats'}</h4>
                  <div className="grid grid-cols-1 gap-4">
                     <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'إجمالي المشاريع' : 'Total Gigs'}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{projects.length}</p>
                     </div>
                     <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'إجمالي الإنفاق' : 'Total Invested'}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                          ${projects.reduce((acc, p) => acc + parseFloat(p.budget.replace('$', '')), 0).toLocaleString()}
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
