"use client";
import Link from "next/link";
import React, { useState } from "react";
import Header from "@/components/layout/Header";

export default function Page() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "تصميم شاشات الدخول والتسجيل", category: "واجهة المستخدم", status: "pending", progress: 0 },
    { id: 2, title: "برمجة لوحة التحكم الرئيسية", category: "الواجهة الأمامية", status: "working", progress: 65 },
    { id: 3, title: "مراجعة ثغرات التشفير", category: "الأمان", status: "review", progress: 100 },
  ]);

  const handleAction = (msg: string) => {
    alert(msg);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Header />
      
      <div className="flex pt-[144px] md:pt-[176px]">
        <aside className="hidden lg:flex flex-col py-8 px-6 gap-6 h-[calc(100vh-176px)] w-80 bg-white dark:bg-slate-900 border-r border-slate-200/50 sticky top-[176px]">
          <div className="space-y-1">
             <Link className="flex items-center gap-3 px-4 py-3 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-xl font-bold shadow-sm" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Overview</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="/jobs">
              <span className="material-symbols-outlined">work</span>
              <span>Projects</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="/messages">
              <span className="material-symbols-outlined">chat</span>
              <span>Messages</span>
            </Link>
          </div>
          
          <div className="mt-auto p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-cyan-500/20 transition-all"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Project Phase</p>
            <p className="font-bold text-sm mb-4">Development V1.0</p>
            <button onClick={() => handleAction("Review initiated!")} className="w-full py-2.5 bg-cyan-500 text-slate-900 rounded-lg text-xs font-bold hover:bg-cyan-400 transition-colors">Request Review</button>
          </div>
        </aside>

        <main className="flex-1 p-8 md:p-12 space-y-12">
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200/20 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-cyan-500/10 transition-all duration-700"></div>
             <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 text-[10px] font-extrabold rounded-full uppercase tracking-widest">Active Workspace</span>
                    <span className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      Live Sync
                    </span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">Vegecurity Platform Core</h1>
                 <div className="flex items-center gap-6 pt-4">
                    <div className="flex -space-x-3">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden ring-4 ring-slate-50 dark:ring-slate-950">
                            <img src={`https://lh3.googleusercontent.com/aida-public/AB6AXuAOj_Cr1xQitlx_kOrA4-CgO2y-5IJZ9NEVsqe3XqXSPH-j3A-Xek7iH6A6MwADHI2u_8Jr7MMR28ki7_JSaD9p68TZVIQU8JWOoLrn0v6FMB5zQkh_qd1r9MXwJKZKiP3U0PKYRtxZwDvoVm4z9T2KjlpLdgWXO3entpv6480GPi6OGqX0TUFOOWWCiaJL1B1mAo8vQrdhx2SlsTH9A_mRg4ct0HdF2M2ylGd7gsCarlzPqxWNsHuKbm04L1uvpX6FBSEXDJseY3s`} alt="team" className="w-full h-full object-cover"/>
                         </div>
                       ))}
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lead Engineer</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-white">Alex Rivers</p>
                    </div>
                 </div>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                 <button onClick={() => handleAction("Exporting workflow...")} className="flex-1 md:flex-none px-8 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold text-sm hover:bg-white dark:hover:bg-slate-700 transition-all">Export</button>
                 <button onClick={() => handleAction("Settings opened")} className="flex-1 md:flex-none px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:brightness-110 shadow-lg shadow-slate-900/20 active:scale-95 transition-all">Project Settings</button>
               </div>
             </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
               <div className="flex justify-between items-center px-4">
                 <h2 className="text-2xl font-bold font-plus-jakarta flex items-center gap-3">
                   <span className="material-symbols-outlined text-cyan-600">view_kanban</span>
                   Sprint Backlog
                 </h2>
                 <button onClick={() => handleAction("New task form coming soon")} className="text-cyan-600 font-bold text-sm hover:underline">+ New Task</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {['pending', 'working', 'review'].map((status) => (
                   <div key={status} className="space-y-4">
                     <div className="flex justify-between items-center px-4 uppercase tracking-[0.2em] text-[10px] font-extrabold text-slate-400">
                       <span>{status === 'pending' ? 'To Do' : status === 'working' ? 'In Progress' : 'Review'}</span>
                       <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg">{tasks.filter(t => t.status === status).length}</span>
                     </div>
                     <div className="space-y-4">
                       {tasks.filter(t => t.status === status).map(task => (
                         <div key={task.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                           <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-2">{task.category}</p>
                           <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-cyan-600 transition-colors">{task.title}</h4>
                           {task.status === 'working' && (
                             <div className="space-y-2 mb-4">
                               <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                 <span>Progress</span>
                                 <span>{task.progress}%</span>
                               </div>
                               <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
                               </div>
                             </div>
                           )}
                           <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800">
                             <div className="w-6 h-6 rounded-full bg-slate-100 border border-white"></div>
                             <span className="material-symbols-outlined text-slate-200 group-hover:text-cyan-500 transition-colors text-lg">chat_bubble</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/20 shadow-sm space-y-8">
                <h3 className="text-xl font-bold font-plus-jakarta flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-600">attachment</span>
                  Resources
                </h3>
                <div className="space-y-3">
                   {['GitHub Repo', 'Figma File', 'API Docs'].map(res => (
                     <button key={res} onClick={() => handleAction(`Opening ${res}...`)} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all group">
                       <span className="text-sm font-bold text-slate-700 dark:text-white">{res}</span>
                       <span className="material-symbols-outlined text-slate-300 group-hover:text-cyan-600 transition-colors">open_in_new</span>
                     </button>
                   ))}
                </div>
              </div>

               <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">AI Review Status</h3>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-cyan-500">verified</span>
                     </div>
                     <div>
                       <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Vetted v2.4</p>
                       <p className="text-sm font-medium opacity-60">Technical quality: 9.8/10</p>
                     </div>
                  </div>
                  <button onClick={() => handleAction("Running AI audit...")} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">Run Full Audit</button>
               </div>
            </div>
          </div>
        </main>
      </div>
      
      <button onClick={() => handleAction("New project initiation triggered")} className="fixed bottom-10 right-10 w-20 h-20 bg-cyan-600 text-white rounded-[2rem] shadow-2xl shadow-cyan-600/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-4xl">add</span>
      </button>
    </div>
  );
}
