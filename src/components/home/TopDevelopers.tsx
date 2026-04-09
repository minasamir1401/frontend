"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

type TopDeveloper = {
  id: string;
  name: string;
  title: string;
  skills: string;
  image?: string;
};

export default function TopDevelopersSection() {
  const { isRtl } = useLanguage();
  const [developers, setDevelopers] = useState<TopDeveloper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDevelopers = async () => {
      try {
        const response = await fetch(`${API_URL}/users/developers/all`, { cache: "no-store" });
        if (response.ok) {
          const data: TopDeveloper[] = await response.json();
          setDevelopers(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to load developers list", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopDevelopers();
  }, []);

  // When no developers exist, we show these stunning placeholders to keep the layout visible
  const displayDevelopers = developers.length > 0 ? developers : [
    { id: '1', name: 'Mina Ghareeb', title: 'Senior AI Engineer', skills: 'Python, TensorFlow, React' },
    { id: '2', name: 'Sara K.', title: 'Cloud Architect', skills: 'AWS, Kubernetes, Go' },
    { id: '3', name: 'Youssef B.', title: 'Full Stack Dev', skills: 'Next.js, Node.js, Prisma' },
    { id: '4', name: 'Emma W.', title: 'System Designer', skills: 'Rust, PostgreSQL, Docker' },
  ];

  return (
    <section className="py-32 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800 text-start overflow-hidden relative">
      <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-1/3 h-full bg-cyan-500/5 blur-[120px] pointer-events-none`}></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="space-y-4">
            <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.2em]">{isRtl ? "شبكة الخبراء" : "Expert Network"}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-headline">
              {isRtl ? "نخبة المبرمجين المتاحين" : "Elite Developers Available"}
            </h2>
          </div>
          <Link href="/developers" className="px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            {isRtl ? "تصفح الجميع" : "View Array"} 
            <span className={`material-symbols-outlined text-sm ${isRtl ? 'rotate-180' : ''}`}>arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3, 4].map(key => (
              <div key={key} className="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl"></div>
            ))
          ) : (
            displayDevelopers.map(dev => (
              <Link key={dev.id} href={`/developers`} className="group block bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-[100%] pointer-events-none group-hover:scale-110 transition-transform"></div>
                <div className={`flex items-center gap-4 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-cyan-100 dark:border-cyan-900/30 shrink-0 flex items-center justify-center shadow-sm">
                    {dev.image ? (
                      <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-slate-400">{(dev.name || '?').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className={`${isRtl ? 'text-end' : 'text-start'}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{dev.name}</h3>
                    <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest line-clamp-1">{dev.title || "Developer"}</p>
                  </div>
                </div>
                <div className={`flex flex-wrap gap-1.5 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  {(dev.skills ? dev.skills.split(",") : ["Code"]).slice(0, 3).map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9px] rounded-lg text-slate-500 font-bold whitespace-nowrap tracking-wide uppercase">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </div>
        
        {developers.length === 0 && !loading && (
          <div className="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 text-center">
            <p className="text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest">
               {isRtl ? "↑ يتم عرض بيانات أمثلة لتغطية التصميم (لا يوجد مبرمجين مسجلين بعد) ↑" : "↑ Displaying Mock Data (No registered developers yet) ↑"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
