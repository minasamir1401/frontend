"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useParams } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function ProjectDetailsPage() {
  const { t, isRtl } = useLanguage();
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    try {
      const resp = await fetch(`${API_URL}/jobs`);
      const jobs = await resp.json();
      const found = jobs.find((p: any) => p.id.toString() === params.id);
      
      if (found) {
        setProject({
          ...found,
          budget: `$${found.budget}`,
          progress: 0,
          status: found.status === "OPEN" ? (isRtl ? "متاح" : "Open") : (isRtl ? "قيد التنفيذ" : "In Progress")
        });
        
        // Fetch proposals for this job
        const propResp = await fetch(`${API_URL}/proposals/job/${found.id}`);
        const props = await propResp.json();
        setProposals(props);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const acceptProposal = async (proposalId: string) => {
    if (!window.confirm(isRtl ? "هل أنت متأكد من قبول هذا العرض؟" : "Are you sure you want to accept this proposal?")) return;
    try {
      const resp = await fetch(`${API_URL}/proposals/${proposalId}/accept`, {
        method: "PUT"
      });
      if (resp.ok) {
        alert(isRtl ? "تم قبول العرض والتعاقد بنجاح!" : "Proposal accepted and contract established!");
        loadProject();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateProgress = (val: number) => {
    if (!project) return;
    setProject({ ...project, progress: val });
  };

  if (!project) return null;

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />
      <div className={`flex pt-[144px] md:pt-[176px] ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 space-y-12 text-start`}>
          <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
             
             <div className="space-y-12 relative z-10">
                <div className="space-y-4">
                  <div className="flex gap-2">
                     <span className="px-4 py-1.5 bg-cyan-600/10 text-cyan-600 rounded-full text-[10px] font-black uppercase tracking-widest">{project.category || 'Full-stack'}</span>
                     <span className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest">{project.status}</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600">{project.client?.name || 'Me'}</p>
                  <h1 className="text-5xl font-black text-slate-900 dark:text-white font-plus-jakarta tracking-tighter">{project.title}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{isRtl ? 'نظرة عامة على المشروع' : 'Project Overview'}</h4>
                      <p className="text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed font-be-vietnam">{project.description}</p>
                    </div>

                    <div className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 space-y-8">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{isRtl ? 'عروض المهندسين' : 'Developer Proposals'}</h4>
                       <div className="space-y-4">
                          {proposals.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">{isRtl ? 'لا توجد عروض مقدمة حالياً.' : 'No proposals submitted yet.'}</p>
                          ) : (
                            proposals.map((prop) => (
                              <div key={prop.id} className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-cyan-500/50 transition-all ${prop.status === 'ACCEPTED' ? 'ring-2 ring-green-500' : ''}`}>
                                 <div className="text-start space-y-2">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                          <img src={prop.developer.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OTuIwFmItoGmeNt2T6umCv87RdiOY6kzRNjEsjZMYQ5H1Xp0o2We3qzi9AY-rURpfICWUNUXKbgmXhaog-gPZoFzUwNXOk2ZcW62q9k8-8LqJoDbd3RG6DXCRmRKhWsy4qX6S-RMkUFqWPdoSa4pqClciB1Ne03KyPwj0zCeBu0F-DdkaIIul92f0BiVUfTCYOEm5uhDj8-8-fa9u-OxyDmQSa0EMBDlh6HXh1WlPWh8WXJaZiRZL-oEygi_ZUDCl2Ce-8cfQY'} className="w-full h-full object-cover"/>
                                       </div>
                                       <span className="font-bold text-slate-900 dark:text-white">{prop.developer.name}</span>
                                       <span className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 text-[8px] font-black uppercase rounded-lg">${prop.budget}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-be-vietnam leading-relaxed">{prop.description}</p>
                                 </div>
                                 {prop.status !== 'ACCEPTED' ? (
                                   <button 
                                     onClick={() => acceptProposal(prop.id)}
                                     className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                                   >
                                     {isRtl ? 'الموافقة على العرض' : 'Accept Proposal'}
                                   </button>
                                 ) : (
                                   <span className="px-6 py-3 bg-green-500 text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                      <span className="material-symbols-outlined text-sm">verified</span>
                                      {isRtl ? 'تم القبول' : 'Accepted'}
                                   </span>
                                 )}
                              </div>
                            ))
                          )}
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isRtl ? 'الميزانية المخصصة' : 'Allocated Budget'}</p>
                        <p className="text-4xl font-black text-slate-900 dark:text-white">{project.budget}</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{isRtl ? 'معدل التقدم' : 'Progress'}</h4>
                       <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold font-plus-jakarta">
                             <span>{project.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </section>
        </main>
      </div>
    </div>
  );
}
