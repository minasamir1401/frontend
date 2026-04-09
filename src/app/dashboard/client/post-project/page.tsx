"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { API_URL } from "@/lib/api";

export default function PostProjectPage() {
  const { t, isRtl } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "Full-stack",
    skills: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = localStorage.getItem('userId');
    if (!clientId) {
       alert(isRtl ? "يجب تسجيل الدخول أولاً" : "Please log in first");
       window.location.href = "/register";
       return;
    }

    setStatus("loading");
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          budget: parseFloat(formData.budget),
          technologies: formData.skills,
          clientId: clientId
        })
      });

      if (response.status === 401) {
        alert(isRtl ? "انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى" : "Session expired, please log in again");
        window.location.href = "/register?mode=login";
        return;
      }

      if (response.ok) {
        const result = await response.json();
        // Also save to localStorage for immediate UI feedback in older components
        const savedProjects = JSON.parse(localStorage.getItem('client_projects') || '[]');
        localStorage.setItem('client_projects', JSON.stringify([{
           id: result.id,
           title: formData.title,
           description: formData.description,
           budget: `$${formData.budget}`,
           status: isRtl ? "قيد التنفيذ" : "In Progress",
           progress: 0,
           skills: formData.skills,
           client: "Me"
        }, ...savedProjects]));

        setStatus("success");
        setTimeout(() => window.location.href = "/dashboard/client", 1500);
      } else {
        alert(isRtl ? "حدث خطأ أثناء النشر" : "Failed to publish gig");
        setStatus("idle");
      }
    } catch (err) {
      console.error(err);
      alert(isRtl ? "فشل الاتصال بالسيرفر" : "Backend connection failed");
      setStatus("idle");
    }
  };

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen relative overflow-hidden ${isRtl ? 'font-arabic' : ''}`}>
      {/* Structural Scientific Background */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
         <div className="absolute top-[10%] -left-10 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-cyan-600 rotate-[5deg]">{"<"}</div>
         <div className="absolute bottom-[10%] -right-10 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-slate-500 -rotate-12 animate-[pulse_4s_ease-in-out_infinite]">{">"}</div>
      </div>
      <Header />
      <div className={`flex pt-[144px] md:pt-[176px] relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 space-y-12 text-start`}>
          <section className="border-b border-slate-200/50 pb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">
               {isRtl ? 'عرض مشروع جديد' : 'Post a High-End Gig'}
            </h1>
            <p className="text-slate-500 font-medium font-be-vietnam mt-2">
               {isRtl ? 'قم بتوظيف أفضل 1% من المهندسين عالمياً لمشروعك.' : 'Hire the top 1% of engineering talent.'}
            </p>
          </section>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-8 max-w-4xl relative overflow-hidden animate-in">
             <div className={`absolute top-0 ${isRtl ? 'left-0 skew-x-12 translate-x-1/2' : 'right-0 -skew-x-12 translate-x-1/2'} w-32 h-full bg-cyan-500/5`}></div>
             <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none font-mono text-[15rem] font-black leading-none">{"=>"}</div>
             
             <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-plus-jakarta">{isRtl ? 'عنوان المشروع' : 'Gig Title'}</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder={isRtl ? "مثل: فحص البنية التحتية لتطبيق سحابي" : "e.g. Next.js SaaS Infrastructure Audit"}
                    className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500/30 dark:text-white transition-all outline-none font-be-vietnam text-start"
                  />
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                   <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-plus-jakarta">{isRtl ? 'الميزانية ($)' : 'Budget ($)'}</label>
                      <input 
                        required
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        placeholder="5000"
                        className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500/30 dark:text-white transition-all outline-none font-be-vietnam text-start"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-plus-jakarta">{isRtl ? 'التصنيف' : 'Category'}</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500/30 dark:text-white transition-all outline-none appearance-none font-be-vietnam text-start"
                      >
                         <option>Full-stack</option>
                         <option>Security/Web3</option>
                         <option>AI/Machine Learning</option>
                         <option>DevOps/Cloud</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-plus-jakarta">{isRtl ? 'متطلبات المشروع' : 'Project Requirements'}</label>
                   <textarea 
                     required
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                     placeholder={isRtl ? "اكتب المواصفات التقنية بالتفصيل..." : "Detail the technical specifications..."}
                     className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500/30 dark:text-white transition-all outline-none h-48 resize-none font-be-vietnam text-start"
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-plus-jakarta">{isRtl ? 'المهارات المطلوبة' : 'Key Skills Required'}</label>
                   <input 
                     value={formData.skills}
                     onChange={(e) => setFormData({...formData, skills: e.target.value})}
                     placeholder="e.g. Docker, K8s, TypeScript..."
                     className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500/30 dark:text-white transition-all outline-none font-be-vietnam text-start"
                   />
                </div>
             </div>

             <button 
                disabled={status === "loading"}
                className={`w-full py-6 rounded-full font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 font-plus-jakarta ${
                  status === "success" ? "bg-green-500 text-white" : "bg-gradient-to-br from-slate-900 to-black dark:from-white dark:to-slate-200 text-white dark:text-slate-900"
                }`}
             >
                {status === "loading" ? (isRtl ? "جاري النشر..." : "Publishing...") : status === "success" ? (isRtl ? "تم النشر!" : "Gig Live!") : (isRtl ? "نشر المشروع الآن" : "Publish High-End Gig")}
                <span className={`material-symbols-outlined font-black ${isRtl ? '-scale-x-100' : ''}`}>rocket_launch</span>
             </button>
          </form>
        </main>
      </div>
    </div>
  );
}
