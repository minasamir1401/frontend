"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useParams } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function JobDetailsMarketPage() {
  const { t, isRtl } = useLanguage();
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [proposal, setProposal] = useState({ message: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs`);
        const jobs = await response.json();
        const found = jobs.find((j: any) => j.id.toString() === params.id);
        setJob(found);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [params.id]);

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    const developerId = localStorage.getItem("userId");
    if (!developerId) {
      alert(isRtl ? "يجب تسجيل الدخول كمهندس أولاً" : "Please log in as an engineer first");
      window.location.href = "/register?role=DEVELOPER";
      return;
    }

    setStatus("loading");
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/proposals`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          description: proposal.message,
          budget: parseFloat(proposal.budget),
          developerId: developerId,
          jobId: job.id
        })
      });

      if (response.status === 401) {
        alert(isRtl ? "انتهت الجلسة، يرجى تسجيل الدخول" : "Session expired, please log in");
        window.location.href = "/register?mode=login";
        return;
      }

      if (response.ok) {
        setStatus("success");
        setTimeout(() => window.location.href = "/messages", 1500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!job) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
       <div className="h-12 w-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />
      <div className={`flex pt-32 md:pt-48 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 text-start`}>
          <div className="max-w-5xl mx-auto space-y-12">
            
            <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -mr-40 -mt-40"></div>
                
                <div className="space-y-8 relative z-10">
                   <div className="flex justify-between items-start">
                      <div className="space-y-4">
                         <div className="flex gap-2">
                            <span className="px-4 py-1.5 bg-cyan-600/10 text-cyan-600 rounded-full text-[10px] font-black uppercase tracking-widest">{isRtl ? 'مشروع موثق' : 'Verified Opportunity'}</span>
                            <span className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest">Open</span>
                         </div>
                         <h1 className="text-6xl font-black text-slate-900 dark:text-white font-headline tracking-tighter leading-[1.1]">{job.title}</h1>
                         <div className="flex items-center gap-6 text-slate-400 font-bold text-sm">
                            <div className="flex items-center gap-2">
                               <span className="material-symbols-outlined text-cyan-500">payments</span>
                               <span>Budget: ${job.budget}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="material-symbols-outlined text-cyan-500">schedule</span>
                               <span>Posted: Just Now</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-100/10">
                      <div className="lg:col-span-7 space-y-8">
                         <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-cyan-600">{isRtl ? 'وصف المشروع' : 'Technical Specifications'}</h4>
                            <p className="text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed font-body">{job.description}</p>
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-cyan-600">{isRtl ? 'المهارات المطلوبة' : 'Core Technologies'}</h4>
                            <div className="flex flex-wrap gap-2">
                               {job.technologies && job.technologies.split(',').map((tech: string) => (
                                 <span key={tech} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 font-bold text-xs uppercase tracking-tight text-slate-600 dark:text-slate-400">{tech.trim()}</span>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="lg:col-span-5">
                         <form onSubmit={handleSubmitProposal} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 space-y-6">
                            <div className="text-center space-y-1 mb-4">
                               <h4 className="text-2xl font-black font-headline">{isRtl ? 'قدم عرضك الآن' : 'Apply for this Gig'}</h4>
                               <p className="text-xs text-slate-500 font-medium">{isRtl ? 'أرسل رسالة احترافية وعرضاً مالياً.' : 'Precision proposal for an elite client.'}</p>
                            </div>
                            
                            <div className="space-y-2">
                               <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{isRtl ? 'رسالة التقديم' : 'Proposal Message'}</label>
                               <textarea 
                                 required
                                 value={proposal.message}
                                 onChange={(e) => setProposal({...proposal, message: e.target.value})}
                                 placeholder={isRtl ? "اشرح لماذا أنت الأنسب لهذا العمل..." : "Why are you the perfect fit for this architecture?"}
                                 className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-transparent focus:border-cyan-500 dark:text-white transition-all outline-none h-40 resize-none font-body text-sm"
                               />
                            </div>

                            <div className="space-y-2">
                               <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{isRtl ? 'العرض المالي للتقديم ($)' : 'Bidding Amount ($)'}</label>
                               <input 
                                 required
                                 type="number"
                                 value={proposal.budget}
                                 onChange={(e) => setProposal({...proposal, budget: e.target.value})}
                                 placeholder={job.budget.toString()}
                                 className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-transparent focus:border-cyan-500 dark:text-white transition-all outline-none font-headline text-sm"
                               />
                            </div>

                            <button 
                               disabled={status === "loading"}
                               className={`w-full py-5 rounded-full font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${
                                 status === "success" ? "bg-green-500 text-white" : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-xl shadow-cyan-500/20"
                               }`}
                            >
                               {status === "loading" ? (isRtl ? "جاري الإرسال..." : "Transmitting...") : status === "success" ? (isRtl ? "تم الإرسال!" : "Proposal Sent!") : (isRtl ? "إرسال العرض" : "Send Proposal")}
                               <span className="material-symbols-outlined font-black">send</span>
                            </button>
                         </form>
                      </div>
                   </div>
                </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
