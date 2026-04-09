"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function Page() {
  const users = [
    { id: 1, name: "Jamal Sulaiman", email: "jamal.s@vege.com", role: "Vetted", date: "Oct 12, 2023", status: "Active" },
    { id: 2, name: "Layla Ahmed", email: "layla.a@vege.com", role: "Review", date: "Oct 14, 2023", status: "Pending" },
  ];

  const handleAction = (label: string) => {
    alert(`Admin action: ${label} executed.`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Header />
      
      <div className="flex pt-[144px] md:pt-[176px]">
        <aside className="hidden lg:flex flex-col py-8 px-6 gap-6 h-[calc(100vh-176px)] w-80 bg-white dark:bg-slate-900 border-r border-slate-200/50 sticky top-[176px]">
          <div className="space-y-1">
             <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="/dashboard/developer/analytics">
              <span className="material-symbols-outlined">analytics</span>
              <span>Analytics</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-xl font-bold" href="#">
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span>Admin Hub</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="/disputes">
              <span className="material-symbols-outlined">gavel</span>
              <span>Disputes</span>
            </Link>
          </div>
          
          <div className="mt-auto p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-cyan-500/20 transition-all"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Platform Status</p>
            <p className="font-bold text-sm mb-4">Stable V2.5.1</p>
            <button onClick={() => handleAction("System Audit")} className="w-full py-2.5 bg-cyan-500 text-slate-900 rounded-lg text-xs font-bold hover:bg-cyan-400 transition-colors">Full Audit</button>
          </div>
        </aside>

        <main className="flex-1 p-8 md:p-12 space-y-12">
          <section className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-8">
            <div className="space-y-2 text-right lg:text-left">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">Admin Central</h1>
              <p className="text-slate-500 font-medium font-be-vietnam">Managing global ecosystem health and compliance.</p>
            </div>
            <div className="flex gap-4">
               <button onClick={() => handleAction("New Moderator")} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-full font-extrabold text-sm hover:brightness-110 active:scale-95 shadow-lg">New Moderator</button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { label: "Total Revenue", val: "$428,500", sub: "+12.5% vs Prev", icon: "payments", color: "text-green-500" },
               { label: "Active Users", val: "12,840", sub: "76% Annual Goal", icon: "groups", color: "text-cyan-500" },
               { label: "Active Projects", val: "1,204", sub: "42 New Today", icon: "rocket_launch", color: "text-indigo-500" }
             ].map(stat => (
               <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 hover:shadow-lg transition-all group cursor-default">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className={`material-symbols-outlined text-2xl ${stat.color}`}>{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{stat.sub}</p>
                  </div>
               </div>
             ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/30">
                  <h3 className="text-xl font-bold font-plus-jakarta">User Management</h3>
                  <button className="text-cyan-600 font-bold text-sm">Filter</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                     <tr>
                       <th className="px-8 py-5">User</th>
                       <th className="px-8 py-5">Role</th>
                       <th className="px-8 py-5">Joined</th>
                       <th className="px-8 py-5 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                     {users.map(u => (
                       <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                         <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden"></div>
                             <div>
                               <p className="text-sm font-bold text-slate-900 dark:text-white">{u.name}</p>
                               <p className="text-[10px] text-slate-400">{u.email}</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-8 py-6">
                           <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 text-[10px] font-bold uppercase tracking-widest">{u.role}</span>
                         </td>
                         <td className="px-8 py-6 text-sm text-slate-500 font-be-vietnam">{u.date}</td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                               <button onClick={() => handleAction("Edit")} className="p-2 text-slate-400 hover:text-cyan-600 transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                               <button onClick={() => handleAction("Block")} className="p-2 text-slate-400 hover:text-red-500 transition-all"><span className="material-symbols-outlined text-sm">block</span></button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-xl font-bold font-plus-jakarta mb-8">Reports & Flags</h3>
                  <div className="space-y-4">
                     {[
                       { title: "Copyright Violation", priority: "High", sub: "User #8892 flagged by AI audit." },
                       { title: "Inappropriate Bio", priority: "Low", sub: "Automated filter triggered." }
                     ].map(flag => (
                       <div key={flag.title} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-red-500/30 transition-all">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{flag.priority} Priority</span>
                             <span className="material-symbols-outlined text-slate-300 text-sm">flag</span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{flag.title}</h4>
                          <p className="text-[10px] text-slate-500">{flag.sub}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
