"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { API_URL } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export type TopDeveloper = {
  id: string;
  name: string;
  title: string;
  skills: string;
  image?: string;
  bio?: string;
};

export default function DevelopersPage() {
  const { isRtl } = useLanguage();
  const [developers, setDevelopers] = useState<TopDeveloper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDevelopers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/users/developers/all`, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch developers");

        const data: TopDeveloper[] = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error("Failed to load developers list", error);
        setDevelopers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDevelopers();
  }, []);

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />

      <main className="pt-[160px] md:pt-[240px] pb-32 px-6 md:px-12 relative overflow-hidden">
        {/* Ambient Tech Background */}
        <div className={`absolute top-0 ${isRtl ? 'left-0 rotate-12 -translate-x-1/4' : 'right-0 -skew-x-12 translate-x-1/4'} w-1/2 h-full bg-cyan-100/5 dark:bg-cyan-900/10 transition-all duration-1000 select-none pointer-events-none`}></div>
        <div className={`absolute top-1/4 ${isRtl ? 'right-0' : 'left-0'} w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] opacity-50 pointer-events-none`}></div>
        
        <section className="max-w-7xl mx-auto text-start relative z-10">
          <div className="border-b border-slate-200/50 dark:border-slate-800 pb-12 mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm mb-4">
               <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                 {isRtl ? "قاعدة بيانات الكفاءات" : "Talent Database"}
               </span>
             </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-headline tracking-tight">
              {isRtl ? "نخبة المبرمجين" : "Elite Developers"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-xl max-w-2xl font-be-vietnam leading-relaxed">
              {isRtl ? "قم بتوظيف أفضل 1% من المهندسين عالميا لمشروعك، موثقون بعناية." : "Hire the top 1% of engineers globally. Verified talent for complex architectures."}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200 dark:border-slate-800/50">
              <span className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></span>
              <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">{isRtl ? "جاري الاستعلام عن قاعدة البيانات..." : "Querying Database..."}</p>
            </div>
          ) : developers.length === 0 ? (
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] p-20 border border-slate-100 dark:border-slate-800 text-center text-slate-500">
              <span className="material-symbols-outlined text-7xl text-slate-300 font-extralight mb-6">group_off</span>
              <h3 className="text-slate-900 dark:text-white text-3xl font-black mb-4 font-headline">
                {isRtl ? "لا يوجد مطورون مسجلون" : "No Developers Found"}
              </h3>
              <p className="text-lg max-w-md mx-auto">
                {isRtl ? "تأكد من إطلاق المنصة ونشرها، وسيظهر المبرمجون المسجلون هنا فوراً." : "Once the platform is deployed, registered developers will populate here automatically."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {developers.map((dev) => (
                <div key={dev.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border-2 border-slate-100 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-[100%] pointer-events-none group-hover:scale-110 transition-transform"></div>
                  
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        {dev.image ? (
                          <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-black text-slate-400">{(dev.name || '?').charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white font-headline line-clamp-1">{dev.name || (isRtl ? "غير معروف" : "Unknown")}</h2>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg mt-2 font-mono text-[10px] uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400">
                          <span className="material-symbols-outlined text-[12px]">code</span>
                          <span className="line-clamp-1">{dev.title || "Full-Stack Engineer"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 min-h-[60px] mb-8">
                      {dev.bio || (isRtl ? "مطور برمجيات ذو كفاءة تشغيلية عالية." : "Highly efficient software developer.")}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(dev.skills ? dev.skills.split(",") : ["React", "Node.js", "TypeScript"]).map((skill) => {
                        const s = skill.trim();
                        if (!s) return null;
                        return (
                          <span key={s} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold font-mono">
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <Link href={`/messages`} className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm transition-all border border-slate-200 dark:border-slate-800 group-hover:bg-slate-900 group-hover:dark:bg-white group-hover:text-white group-hover:dark:text-slate-900 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {isRtl ? "بدء محادثة مشفرة" : "Initiate Secure Chat"}
                    <span className="material-symbols-outlined text-lg">forum</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
