"use client";
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { t, isRtl } = useLanguage();
  
  const stats = [
    { name: t('totalEarnings'), value: isRtl ? "$٢٤,٥٠٠" : "$24,500", icon: "payments", color: "text-primary" },
    { name: t('successRate'), value: isRtl ? "٩٨٪" : "98%", icon: "verified", color: "text-secondary" },
    { name: t('avgResponseTime'), value: isRtl ? "ساعتان" : "2h", icon: "schedule", color: "text-tertiary" },
  ];

  const [liveJobs, setLiveJobs] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadJobs = () => {
       const saved = JSON.parse(localStorage.getItem('client_projects') || '[]');
       setLiveJobs(saved);
    };
    loadJobs();
    window.addEventListener('storage', loadJobs);
    return () => window.removeEventListener('storage', loadJobs);
  }, []);

  const months = [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun')];

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />
      
      <div className={`flex pt-[144px] md:pt-[176px] ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-8 space-y-12 text-start`}>
          <section className="relative overflow-hidden rounded-[2.5rem] p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl group">
             <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-cyan-500/10 transition-all duration-700"></div>
            
            <div className={`relative flex flex-col md:flex-row items-center justify-between gap-12 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
              <div className={`flex flex-col md:flex-row items-center gap-10 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white dark:ring-slate-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    alt="Alex Rivers"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OTuIwFmItoGmeNt2T6umCv87RdiOY6kzRNjEsjZMYQ5H1Xp0o2We3qzi9AY-rURpfICWUNUXKbgmXhaog-gPZoFzUwNXOk2ZcW62q9k8-8LqJoDbd3RG6DXCRmRKhWsy4qX6S-RMkUFqWPdoSa4pqClciB1Ne03KyPwj0zCeBu0F-DdkaIIul92f0BiVUfTCYOEm5uhDj8-8-fa9u-OxyDmQSa0EMBDlh6HXh1WlPWh8WXJaZiRZL-oEygi_ZUDCl2Ce-8cfQY"
                  />
                </div>
                <div className={`text-center ${isRtl ? 'md:text-right' : 'md:text-left'} space-y-4`}>
                  <div className={`flex flex-wrap justify-center ${isRtl ? 'md:justify-end' : 'md:justify-start'} items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <h2 className="text-5xl font-extrabold tracking-tight font-plus-jakarta text-slate-900 dark:text-white">Alex Rivers</h2>
                    <span className="px-6 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 text-xs font-bold font-plus-jakarta uppercase tracking-widest">{t('eliteDeveloper')}</span>
                  </div>
                  <div className={`flex items-center justify-center ${isRtl ? 'md:justify-end' : 'md:justify-start'} gap-2 text-cyan-600 font-bold font-be-vietnam ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="material-symbols-outlined">star</span>
                    <span className="text-lg">{isRtl ? "٤.٩/٥ تقييم الأداء" : "4.9/5 Performance Rating"}</span>
                  </div>
                  <p className="text-slate-500 font-be-vietnam max-w-lg leading-relaxed text-sm">
                    {isRtl 
                      ? "متخصص في بنيات السحابة عالية الأداء وواجهات React السلسة. تقديم تجارب مثالية للمؤسسات العالمية."
                      : "Specializing in high-performance cloud architectures and seamless React interfaces. Delivering pixel-perfect experiences for global enterprises."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.name} className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="h-16 w-16 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className={`material-symbols-outlined text-3xl ${stat.color}`}>{stat.icon}</span>
                </div>
                <div className="text-start">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">{stat.value}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group text-start">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <div className={`flex justify-between items-center mb-12 relative z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="text-start">
                  <h4 className="text-2xl font-bold font-plus-jakarta">{t('monthlyRevenue')}</h4>
                  <p className="text-sm text-slate-400 font-be-vietnam">{t('incomeTrends')}</p>
                </div>
                <div className={`flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full ring-1 ring-green-500/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">{t('growth')} +12.4%</span>
                </div>
              </div>

              <div className={`h-72 w-full flex items-end justify-between gap-4 relative z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                 {[40, 65, 55, 85, 75, 95].map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center group/bar">
                     <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-t-2xl relative overflow-hidden transition-all duration-1000 origin-bottom hover:brightness-95 flex items-end" style={{ height: `${h}%` }}>
                       <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/40 to-cyan-400/10 opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                       <div className="w-full h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase font-plus-jakarta tracking-widest">{months[i]}</p>
                   </div>
                 ))}
              </div>
            </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-10 text-start">
                  <h4 className="text-2xl font-bold font-plus-jakarta">{t('skillPulse')}</h4>
                  <div className="space-y-6">
                    {[
                      { name: "React / Next.js", value: 92, color: "bg-cyan-500" },
                      { name: "Node.js / Express", value: 85, color: "bg-blue-500" },
                      { name: "Database Design", value: 78, color: "bg-indigo-500" },
                    ].map((skill) => (
                      <div key={skill.name} className="space-y-3">
                        <div className={`flex justify-between text-xs font-bold font-plus-jakarta tracking-tight ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="text-slate-600 dark:text-slate-300">{skill.name}</span>
                          <span className="text-cyan-600">{isRtl ? `٪${skill.value}` : `${skill.value}%`}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${skill.color} rounded-full transition-all duration-1000`} style={{ width: `${skill.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 rounded-[1.5rem] bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800 group hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300">
                    <p className="text-xs font-medium text-cyan-800 dark:text-cyan-200 group-hover:text-white leading-relaxed">{t('upgradePro')}</p>
                  </div>
                </div>

                {liveJobs.length > 0 && (
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 text-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-xl font-bold font-plus-jakarta">{isRtl ? 'فرص عمل جديدة' : 'Priority Opportunities'}</h4>
                      {liveJobs.slice(0, 2).map((job: any) => (
                        <div key={job.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                           <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">{job.budget}</p>
                           <h5 className="font-bold text-sm mb-2">{job.title}</h5>
                           <button onClick={() => window.location.href = '/jobs'} className="text-[10px] font-black uppercase text-white/60 hover:text-white flex items-center gap-1">
                              {isRtl ? 'عرض المشروع' : 'View Job'} <span className="material-symbols-outlined text-xs">arrow_outward</span>
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          </section>
        </main>
      </div>
    </div>
  );
}
