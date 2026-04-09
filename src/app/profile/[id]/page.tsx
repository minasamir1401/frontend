"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function Page() {
  const handleAction = (label: string) => {
    alert(`${label} flow is now being processed by our AI curators.`);
  };

  const skills = ["React", "Next.js", "Solidity", "Node.js", "GraphQL", "AWS Architecture"];
  const portfolio = [
    { title: "DeFi Exchange V3", year: "2024", icon: "currency_exchange" },
    { title: "HealthTech Dashboard", year: "2023", icon: "health_and_safety" },
    { title: "NFT Marketplace", year: "2023", icon: "token" }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20 px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <section className="flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left">
            <div className="relative">
              <div className="w-48 h-48 rounded-[3rem] overflow-hidden shadow-2xl skew-y-3 ring-8 ring-white dark:ring-slate-900">
                <img
                  alt="Alex Rivers"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OTuIwFmItoGmeNt2T6umCv87RdiOY6kzRNjEsjZMYQ5H1Xp0o2We3qzi9AY-rURpfICWUNUXKbgmXhaog-gPZoFzUwNXOk2ZcW62q9k8-8LqJoDbd3RG6DXCRmRKhWsy4qX6S-RMkUFqWPdoSa4pqClciB1Ne03KyPwj0zCeBu0F-DdkaIIul92f0BiVUfTCYOEm5uhDj8-8-fa9u-OxyDmQSa0EMBDlh6HXh1WlPWh8WXJaZiRZL-oEygi_ZUDCl2Ce-8cfQY"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-cyan-500 text-slate-900 p-2.5 rounded-2xl shadow-xl border-4 border-white dark:border-slate-900">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-plus-jakarta">Alex Rivers</h1>
                <p className="text-cyan-600 font-bold text-lg uppercase tracking-widest">Senior Full-stack Developer</p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed font-be-vietnam">
                Crafting high-performance digital experiences for the modern web. Specialized in building scalable SaaS architectures and fluid, responsive interfaces with a focus on editorial design principles.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <span className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                  <span className="material-symbols-outlined text-lg">location_on</span> San Francisco, CA
                </span>
                <span className="flex items-center gap-2 text-sm text-green-500 font-bold">
                  <span className="material-symbols-outlined text-lg">work</span> Available Now
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold font-plus-jakarta">Technical Arsenal</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span key={skill} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-50 transition-all cursor-default">{skill}</span>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold font-plus-jakarta">Curated Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {portfolio.map(pro => (
                 <div key={pro.title} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                    <div className="h-14 w-14 rounded-2xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">{pro.icon}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{pro.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pro.year} • Engineering</p>
                 </div>
               ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-10">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Success Rate</p>
                 <p className="text-5xl font-extrabold font-plus-jakarta tracking-tight">99<span className="text-2xl text-cyan-500">%</span></p>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-xs font-bold font-be-vietnam uppercase tracking-widest opacity-60">
                    <span>Vetting Status</span>
                    <span>Verified Elite</span>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-cyan-500 rounded-full"></div>
                 </div>
              </div>
              <div className="pt-6 space-y-4">
                 <button onClick={() => handleAction("Interview Request")} className="w-full py-4 bg-cyan-500 text-slate-900 rounded-full font-extrabold text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-lg shadow-cyan-500/20">Hire Alex Rivers</button>
                 <button onClick={() => handleAction("Direct Message")} className="w-full py-4 bg-white/10 text-white rounded-full font-bold text-sm hover:bg-white/20 transition-all active:scale-95 border border-white/5">Message</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-8">
             <h4 className="text-xl font-bold font-plus-jakarta">Member Stats</h4>
             <div className="space-y-6">
                {[
                  { label: "Total Projects", val: "128", icon: "rocket_launch" },
                  { label: "Repeat Clients", val: "42", icon: "sync" },
                  { label: "Community Rep", val: "4.9/5", icon: "star" }
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-slate-400 text-lg">{s.icon}</span>
                       <span className="text-sm font-medium text-slate-500">{s.label}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{s.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
