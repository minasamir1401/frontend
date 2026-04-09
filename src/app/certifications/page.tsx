"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function Page() {
  const [activeTest, setActiveTest] = useState(true);
  const handleAction = (label: string) => alert(`${label} initiated!`);

  const tests = [
    { title: "React Advanced", level: "Med", time: "45m", users: "1.2k", icon: "terminal" },
    { title: "Node.js Scalability", level: "Adv", time: "60m", users: "850", icon: "dns" },
    { title: "LLM Integration", level: "Exp", time: "30m", users: "2.4k", icon: "psychology" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Header />
      
      <main className="pt-[194px] md:pt-[226px] pb-20 px-4 sm:px-8 max-w-[1440px] mx-auto space-y-12 md:space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-slate-200/50 pb-12 w-full">
          <div className="space-y-4 w-full">
             <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight font-plus-jakarta text-slate-900 dark:text-white leading-tight break-words">
               Prove Your <br />
               <span className="text-cyan-600">Technical Excellence.</span>
             </h1>
             <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-xl font-be-vietnam leading-relaxed">
               Vegecurity Digital Assessment Center. Pass rigorous audits, collect elite badges, and stand out in the global market.
             </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center gap-6 w-full md:w-auto">
             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-cyan-500/20 shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">military_tech</span>
             </div>
             <div className="min-w-0">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">Total Expertise XP</p>
               <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight truncate">2,840 XP</p>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
             {activeTest && (
               <section className="bg-slate-900 text-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="flex justify-between items-start mb-8 relative z-10 font-be-vietnam">
                    <span className="px-4 py-1.5 bg-cyan-500 text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Audit</span>
                    <div className="text-cyan-400 font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">timer</span>
                      <span className="text-xs sm:text-base">14:52</span>
                    </div>
                 </div>
                 <div className="space-y-6 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold font-plus-jakarta break-words">React Architecture Audit</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Question 8/20: Explain the primary use-case for useLayoutEffect vs useEffect in high-performance rendering.</p>
                    <div className="space-y-3">
                       <div onClick={() => handleAction("Answer Selected")} className="p-4 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/5 cursor-pointer text-xs sm:text-sm transition-all leading-relaxed">Synchronous DOM measurement for layout stability.</div>
                       <div onClick={() => handleAction("Answer Selected")} className="p-4 rounded-xl sm:rounded-2xl bg-cyan-500 text-slate-900 font-bold text-xs sm:text-sm cursor-pointer shadow-lg shadow-cyan-500/20 leading-relaxed">Handling side-effects that don't block the paint process.</div>
                    </div>
                 </div>
                 <button onClick={() => handleAction("Next Question")} className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl text-sm font-bold transition-all relative z-10">Continue Audit</button>
               </section>
             )}

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-8">
               <h3 className="text-xl font-bold font-plus-jakarta">Global Leaderboard</h3>
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                       <span className="text-lg font-black text-slate-200 group-hover:text-cyan-500 transition-colors italic">0{i}</span>
                       <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden ring-2 ring-primary/5"></div>
                       <div className="flex-1">
                         <p className="font-bold text-sm text-slate-800 dark:text-white">Alex Rivers</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Architect</p>
                       </div>
                       <span className="font-bold text-cyan-600">9,420</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-12">
             <section className="space-y-8">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-plus-jakarta text-slate-900 dark:text-white">Available Audits</h2>
                      <p className="text-slate-500 font-medium font-be-vietnam text-sm">Select a skill to verify your expertise level.</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:text-cyan-600 transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
                      <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:text-cyan-600 transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {tests.map(test => (
                      <div key={test.title} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                         <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform shrink-0">
                           <span className="material-symbols-outlined text-xl sm:text-2xl text-cyan-500">{test.icon}</span>
                         </div>
                         <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 font-plus-jakarta break-words">{test.title}</h4>
                         <p className="text-[11px] sm:text-xs text-slate-500 mb-8 leading-relaxed">Full technical assessment covering architecture, performance, and best practices.</p>
                         <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <span className="material-symbols-outlined text-sm">schedule</span>
                              <span>{test.time}</span>
                            </div>
                            <button onClick={() => handleAction(`Assessment for ${test.title}`)} className="text-cyan-600 font-bold text-xs sm:text-sm hover:underline">Start Audit</button>
                         </div>
                      </div>
                    ))}
                 </div>
             </section>

             <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-plus-jakarta text-slate-900 dark:text-white">Expertise Badges</h2>
                  <p className="text-slate-500 font-medium font-be-vietnam">Verified achievements globally recognized in the ecosystem.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['React Elite', 'Security Vetted', 'Cloud Architect', 'API Master'].map(badge => (
                      <div key={badge} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-xl transition-all">
                         <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                           <span className="material-symbols-outlined text-3xl sm:text-4xl text-cyan-500">verified</span>
                         </div>
                         <p className="font-bold text-sm text-slate-800 dark:text-white truncate w-full">{badge}</p>
                         <p className="text-[10px] text-slate-400 font-medium uppercase mt-1 tracking-widest">Awarded 2024</p>
                      </div>
                    ))}
                 </div>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
}
