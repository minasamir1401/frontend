"use client";
import React from "react";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import TopDevelopersSection from "@/components/home/TopDevelopers";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const handleAction = (role: string) => {
    window.location.href = `/register?role=${role}`;
  };

  return (
    <div className={`bg-cyan-50/30 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />
      
      <main className="pt-40 md:pt-52">
        <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 z-0 select-none">
            <div className={`absolute top-0 ${isRtl ? 'left-0 rotate-12 -translate-x-1/4' : 'right-0 -skew-x-12 translate-x-1/4'} w-1/2 h-full bg-cyan-100/5 dark:bg-cyan-900/10 transition-all duration-1000`}></div>
            <div className={`absolute top-1/4 ${isRtl ? 'right-0' : 'left-0'} w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] opacity-20`}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.05),transparent_25%)]"></div>
            
            {/* Programming Code Symbols as Shapes */}
            <div className="absolute left-10 top-1/4 select-none opacity-[0.03] dark:opacity-[0.05] text-[15rem] font-mono leading-none tracking-tighter text-cyan-600 font-black rotate-12">
               {"{}"}
            </div>
            <div className="absolute right-10 bottom-1/4 select-none opacity-[0.03] dark:opacity-[0.05] text-[12rem] font-mono leading-none tracking-tighter text-slate-500 font-black -rotate-12 animate-pulse">
               {"</>"}
            </div>
            <div className="absolute left-1/2 top-10 select-none opacity-[0.02] dark:opacity-[0.04] text-[8rem] font-mono leading-none tracking-tighter text-cyan-500 font-black -translate-x-1/2 transition-transform duration-[10s] hover:rotate-180">
               {"[ ]"}
            </div>
          </div>
          
          <div className="container mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className={`space-y-12 ${isRtl ? 'text-start' : 'text-start'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm animate-ui-fade-in">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-system-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {t('nextGenEngineering')}
                  </span>
                </div>
                
                <h1 className="text-slate-900 dark:text-white font-plus-jakarta font-black leading-[1.05] text-5xl md:text-7xl lg:text-8xl tracking-tight animate-ui-slide-down" style={{ animationDelay: '150ms' }}>
                  <span className="block">{isRtl ? 'المنصة الأرقى' : 'The Premier'}</span>
                  <span className="text-cyan-600 block">{isRtl ? 'لهندسة البرمجيات' : 'Engineering'}</span>
                  <span className="block">{isRtl ? 'عالية الجودة' : 'Marketplace'}</span>
                </h1>
                
                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium animate-ui-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                  {t('heroSubtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 animate-ui-fade-in" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
                <button 
                  onClick={() => handleAction("Developer Registration")}
                  className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-sm uppercase tracking-widest hover:animate-btn-bounce active:scale-95 transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/20 dark:bg-slate-900/20 rounded-full opacity-0 group-hover:animate-btn-ripple pointer-events-none"></span>
                  {t('imADeveloper')}
                  <span className="material-symbols-outlined text-xl">terminal</span>
                </button>
                <button 
                  onClick={() => handleAction("Client Registration")}
                  className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 hover:animate-btn-bounce active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 rounded-full opacity-0 group-hover:animate-btn-ripple pointer-events-none"></span>
                  {t('imAClient')}
                  <span className="material-symbols-outlined text-xl">business_center</span>
                </button>
              </div>

              <div className={`flex items-center gap-4 py-4 border-t border-slate-200/50 dark:border-slate-800/50 animate-ui-fade-in ${isRtl ? 'flex-row-reverse' : ''}`} style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 ring-4 ring-slate-100 dark:ring-slate-900 overflow-hidden">
                      <img src={`https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OTuIwFmItoGmeNt2T6umCv87RdiOY6kzRNjEsjZMYQ5H1Xp0o2We3qzi9AY-rURpfICWUNUXKbgmXhaog-gPZoFzUwNXOk2ZcW62q9k8-8LqJoDbd3RG6DXCRmRKhWsy4qX6S-RMkUFqWPdoSa4pqClciB1Ne03KyPwj0zCeBu0F-DdkaIIul92f0BiVUfTCYOEm5uhDj8-8-fa9u-OxyDmQSa0EMBDlh6HXh1WlPWh8WXJaZiRZL-oEygi_ZUDCl2Ce-8cfQY`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {isRtl ? 'أكثر من ١٢ ألف مهندس برمجيات محترف انضموا إلينا' : 'Joined by 12,000+ elite software engineers'}
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block animate-ui-scale-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              {/* Hero Image */}
              <div className="absolute -top-8 -right-8 w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 z-30 rotate-3">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Developer working" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-[10px] font-bold uppercase tracking-widest">Dev @ Work</div>
              </div>
              <div className="relative z-10 p-8 rounded-[3.5rem] bg-slate-950 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-800 hover:animate-card-glow group overflow-hidden transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-400"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-[10px] font-mono tracking-tighter text-slate-400">match-engine.core.ts</p>
                  </div>
                </div>

                <div className={`space-y-4 font-mono text-sm relative z-10 ${isRtl ? 'text-end' : 'text-start'}`}>
                  <div className="flex gap-4 animate-dev-code" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                    <span className="text-slate-600">01</span>
                    <p className="text-cyan-400">async function <span className="text-white">vulnerabilityScan</span>(codeRepo) {"{"}</p>
                  </div>
                  <div className="flex gap-4 animate-dev-code" style={{ animationDelay: '1000ms', animationFillMode: 'both' }}>
                    <span className="text-slate-600">02</span>
                    <p className="ml-4 text-cyan-400">const <span className="text-white">securityAudit</span> = await AI.analyze(codeRepo);</p>
                  </div>
                  <div className="flex gap-4 animate-dev-code" style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                    <span className="text-slate-600">03</span>
                    <p className="ml-4 text-cyan-400">if (<span className="text-white">securityAudit.score</span> {">"} 0.98) {"{"}</p>
                  </div>
                  <div className="flex gap-4 animate-dev-code" style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
                    <span className="text-slate-600">04</span>
                    <p className="ml-8 text-emerald-400">return <span className="text-white">VettedStatus.ELITE;</span></p>
                  </div>
                  <div className="flex gap-4 animate-dev-code" style={{ animationDelay: '1600ms', animationFillMode: 'both' }}>
                    <span className="text-slate-600">05</span>
                    <p className="ml-4 text-cyan-400">{"}"}</p>
                  </div>
                  <div className="flex gap-4 animate-dev-code" style={{ animationDelay: '1800ms', animationFillMode: 'both' }}>
                    <span className="text-slate-600">06</span>
                    <p className="text-cyan-400">{"}"}</p>
                  </div>
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between relative z-10 animate-dev-deploy" style={{ animationDelay: '2200ms', animationFillMode: 'both' }}>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-900">
                      <span className="material-symbols-outlined font-black">shield_person</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Integrity</p>
                      <p className="text-sm font-bold text-white uppercase tracking-tighter">Verified Audit Passed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-system-pulse"></span>
                    <span className="text-[10px] font-bold text-emerald-400">SECURE</span>
                  </div>
                </div>
              </div>

              {/* Floatings */}
              <div className={`absolute -bottom-10 ${isRtl ? '-right-10' : '-left-10'} p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-3xl z-20 space-y-4`}>
                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="h-10 w-10 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-cyan-600">monitoring</span>
                  </div>
                  <div className="text-start">
                    <p className="text-[9px] font-black uppercase text-slate-400">Talent Match</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">98.4% Precision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-12 text-center space-y-12"
          >
             <h2 className="text-sm font-extrabold tracking-tight font-mono text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.3em]">{t('backedByBest')}</h2>
             <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 font-mono">
               <span className="text-3xl font-black tracking-tighter flex items-center gap-2"><span className="material-symbols-outlined text-4xl">terminal</span> Docker</span>
               <span className="text-3xl font-black tracking-tighter flex items-center gap-2"><span className="material-symbols-outlined text-4xl">deployed_code</span> GitHub</span>
               <span className="text-3xl font-black tracking-tighter flex items-center gap-2"><span className="material-symbols-outlined text-4xl">memory</span> Vercel</span>
               <span className="text-3xl font-black tracking-tighter flex items-center gap-2"><span className="material-symbols-outlined text-4xl">api</span> AWS</span>
             </div>
          </motion.div>
        </section>

        <TestimonialsMarquee />

        {/* Professional Freelance Categories Section with Framer Motion */}
        <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyan-600/10 rounded-full blur-[150px] z-0 pointer-events-none"></div>
           
           <div className="container mx-auto px-6 sm:px-12 relative z-10 text-center space-y-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-sm font-extrabold tracking-[0.3em] font-mono text-cyan-500 uppercase mb-4">{isRtl ? 'مجالات العمل' : 'Freelance Categories'}</h2>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl text-white font-black font-headline max-w-4xl mx-auto leading-tight">
                  {isRtl ? 'اكتشف خدماتنا ' : 'Explore Our '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{isRtl ? 'الاحترافية' : 'Professional Services'}</span>
                </h3>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { 
                     title: isRtl ? 'برمجة وتطوير' : 'Development', 
                     img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop',
                     delay: 0.1
                   },
                   { 
                     title: isRtl ? 'تصميم واجهات' : 'UI/UX Design', 
                     img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
                     delay: 0.2
                   },
                   { 
                     title: isRtl ? 'الذكاء الاصطناعي' : 'AI & Data', 
                     img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop',
                     delay: 0.3
                   },
                   { 
                     title: isRtl ? 'أمن المعلومات' : 'Cyber Security', 
                     img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop',
                     delay: 0.4
                   },
                 ].map((cat, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6, delay: cat.delay, ease: "easeOut" }}
                     whileHover={{ y: -10 }}
                     className="relative group rounded-[2.5rem] overflow-hidden h-[450px] cursor-pointer shadow-2xl shadow-indigo-900/20 ring-1 ring-white/10"
                   >
                     {/* Image Background */}
                     <div className="absolute inset-0 z-0">
                       <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                     </div>
                     {/* Gradient Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                     <div className="absolute inset-0 bg-cyan-900/30 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 z-10"></div>
                     
                     {/* Content */}
                     <div className={`absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end h-full`}>
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.8 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5, delay: cat.delay + 0.3 }}
                         className={`h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-xl ${isRtl ? 'self-end' : 'self-start'}`}
                       >
                         <span className="material-symbols-outlined text-white">north_east</span>
                       </motion.div>
                       <h3 className={`text-3xl font-bold font-headline text-white ${isRtl ? 'text-right' : 'text-left'} leading-tight`} style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{cat.title}</h3>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Top Developers Section */}
        <TopDevelopersSection />

        {/* New Scientific Section: Infrastructure */}
        <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
           <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} w-1/3 h-full bg-cyan-500/5 blur-[120px]`}></div>
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="container mx-auto px-12 relative z-10"
           >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                 <div className="space-y-8 text-start">
                    <span className="text-cyan-600 font-black text-[10px] uppercase tracking-[0.4em]">{t('scientificVerification')}</span>
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white font-headline leading-tight">{t('infrastructureTitle')}</h2>
                    <p className="text-slate-500 text-lg leading-relaxed font-body">{t('infrastructureDesc')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                       {[ 'technicalPrecision', 'algorithmicTrust', 'quantumSecurity', 'cloudNative' ].map(key => (
                         <div key={key} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-cyan-500 text-xl font-black">token</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t(key)}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                  <div className="relative">
                     <div className="rounded-[3rem] shadow-3xl border border-slate-100 dark:border-slate-800 overflow-hidden relative group">
                        {/* Main image */}
                        <div className="relative h-72 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Infrastructure dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                        </div>
                        {/* Overlay stat card */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-950/95 backdrop-blur-sm">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">
                              <span>Network Latency</span>
                              <span>0.004ms</span>
                           </div>
                           <div className="h-12 flex items-end gap-1">
                              {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                                <div key={i} className="flex-1 bg-cyan-500 rounded-t-sm animate-system-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}></div>
                              ))}
                           </div>
                        </div>
                        {/* Second floating image */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl z-10">
                          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80" alt="Server room" className="w-full h-full object-cover" />
                        </div>
                     </div>
                  </div>
              </div>
           </motion.div>
        </section>

        {/* New Scientific Section: Validation */}
        <section className="py-32 bg-white dark:bg-slate-900">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="container mx-auto px-12 text-center max-w-4xl space-y-12"
           >
              <div className="space-y-6">
                 <h2 className="text-5xl font-black text-slate-900 dark:text-white font-headline leading-tight">{t('verifiedTitle')}</h2>
                 <p className="text-slate-500 text-xl font-medium leading-relaxed font-body">{t('verifiedDesc')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
                 {[
                   { icon: 'biotech', title: 'biotechIntegration', desc: 'Neural architectures.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80', alt: 'AI Neural' },
                   { icon: 'shield_lock', title: 'securityAudit', desc: 'Cryptographic proofs.', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80', alt: 'Security' },
                   { icon: 'account_tree', title: 'blockchainArch', desc: 'Immutable records.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', alt: 'Blockchain network' }
                 ].map((box, i) => (
                   <div key={i} className="rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all group">
                      <div className="relative h-44 overflow-hidden">
                        <img src={box.img} alt={box.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 h-12 w-12 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-2xl font-black">{box.icon}</span>
                        </div>
                      </div>
                      <div className="p-8 bg-slate-50 dark:bg-slate-800/50 space-y-3">
                        <h4 className="text-xl font-bold font-headline text-slate-900 dark:text-white">{t(box.title)}</h4>
                        <p className="text-slate-500 text-sm">{box.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* New Content Section: Delivery Pipeline */}
        <section className="py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800 text-start overflow-hidden">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="container mx-auto px-12 space-y-20"
           >
              <div className="text-center">
                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-headline">{t('pipelineTitle')}</h2>
              </div>
              
              <div className="relative">
                 {/* Connecting Line */}
                 <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 -translate-y-1/2 hidden md:block"></div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    {[
                      { step: '01', title: 'step1Title', desc: 'step1Desc', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', alt: 'Post a project' },
                      { step: '02', title: 'step2Title', desc: 'step2Desc', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', alt: 'Connect with developers' },
                      { step: '03', title: 'step3Title', desc: 'step3Desc', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80', alt: 'Ship code' }
                    ].map((s, i) => (
                       <div key={i} className={`rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-4 group`}>
                          <div className="relative h-44 overflow-hidden">
                            <img src={s.img} alt={s.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900 text-xl font-black font-mono shadow-lg">{s.step}</div>
                          </div>
                          <div className="p-8 bg-white dark:bg-slate-900 space-y-3 text-center">
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-headline">{t(s.title)}</h4>
                            <p className="text-slate-500 font-medium">{t(s.desc)}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Mission Statement / Code Execution */}
        <section className="py-40 bg-slate-950 border-t border-slate-800 text-white relative overflow-hidden text-center">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent"></div>
           </div>
           
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none font-mono text-[80px] break-all text-left overflow-hidden leading-tight text-cyan-500">
             01000110 01110010 01100101 01100101 01101100 01100001 01101110 01100011 01100101 00100000 01110000 01101100 01100001 01110100 01100110 01101111 01110010 01101101 00100000 01100110 01101111 01110010 00100000 01110000 01110010 01101111 01100111 01110010 01100001 01101101 01101101 01100101 01110010 01110011
           </div>

           <div className="container mx-auto px-12 relative z-10 space-y-10">
              <div className="font-mono text-cyan-500 mb-6 text-sm flex justify-center gap-4">
                 <span className="px-3 py-1 bg-cyan-900/30 rounded-md border border-cyan-800/50">status: compiling</span>
                 <span className="px-3 py-1 bg-cyan-900/30 rounded-md border border-cyan-800/50">mode: production</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-headline max-w-5xl mx-auto leading-tight italic">
                "{t('missionStatement')}"
              </h2>
              <div className="flex justify-center gap-12 pt-8">
                 <div className="text-center p-6 border border-slate-800 rounded-3xl bg-slate-900/50 backdrop-blur-xl">
                    <p className="text-5xl font-black text-cyan-500 font-mono">1.2M+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Commits Pushed</p>
                 </div>
                 <div className="text-center p-6 border border-slate-800 rounded-3xl bg-slate-900/50 backdrop-blur-xl">
                    <p className="text-5xl font-black text-cyan-500 font-mono">12k+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Verified Architects</p>
                 </div>
              </div>
           </div>
        </section>

        {/* New Content Section: Production Case Studies */}
        <section className="py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800 text-start overflow-hidden">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="container mx-auto px-12 space-y-16"
           >
              <div className="text-center">
                 <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-headline">{t('prodCasesTitle')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                 {[
                   { id: 1, title: 'case1', desc: 'case1Desc', log: 'deploy_id: 8f9a2c', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', alt: 'Fintech project' },
                   { id: 2, title: 'case2', desc: 'case2Desc', log: 'deploy_id: 3b1e9f', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80', alt: 'Cloud deployment' }
                 ].map((c) => (
                   <div key={c.id} className="group rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-white dark:bg-slate-900">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img src={c.img} alt={c.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-md border border-cyan-500/30">{c.log}</span>
                          <span className="material-symbols-outlined text-green-400 text-lg drop-shadow-lg">check_circle</span>
                        </div>
                      </div>
                      <div className="p-8 sm:p-10 space-y-4">
                         <h3 className="text-2xl font-black text-slate-900 dark:text-white font-headline">{t(c.title)}</h3>
                         <p className="text-slate-500 font-medium leading-relaxed">{t(c.desc)}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* New Content Section: System Documentation (FAQ) */}
        <section className="py-32 bg-slate-950 text-start border-t border-slate-800 text-slate-300 relative">
           <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10"
           >
              <div className="lg:col-span-4 space-y-8">
                 <div className="space-y-4">
                    <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.2em]">{t('techArsenal')}</span>
                    <h2 className="text-5xl font-black text-white font-headline leading-tight">{t('sysDocTitle')}</h2>
                 </div>
                 <p className="text-slate-500 leading-relaxed max-w-sm">
                   {isRtl ? 'اعتمد على إجابات تقنية دقيقة للأسئلة الشائعة لمعرفة كيفية إدارة عملياتك بثقة.' : 'Refer to our technical knowledge base regarding platform operations and mechanics.'}
                 </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { q: 'sysDoc1', a: 'sysDoc1Desc', icon: 'verified_user' },
                   { q: 'sysDoc2', a: 'sysDoc2Desc', icon: 'functions' },
                   { q: 'sysDoc3', a: 'sysDoc3Desc', icon: 'copyright' },
                   { q: 'sysDoc4', a: 'sysDoc4Desc', icon: 'security' }
                 ].map((faq, i) => (
                   <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 hover:border-cyan-500/30 transition-colors">
                      <span className="material-symbols-outlined text-3xl text-cyan-600">{faq.icon}</span>
                      <h4 className="text-xl font-bold text-white font-headline">{t(faq.q)}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{t(faq.a)}</p>
                   </div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-32 border-t border-slate-800 text-center relative overflow-hidden min-h-[500px] flex items-center justify-center">
           {/* Background Image */}
           <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-slate-950/85"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
           </div>
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="container mx-auto px-12 relative z-10 space-y-12"
           >
              {/* Floating team images */}
              <div className="flex justify-center gap-6 mb-8">
                {[
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
                  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=200&q=80',
                ].map((src, i) => (
                  <div key={i} className="w-16 h-16 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-xl shadow-cyan-500/20" style={{ animationDelay: `${i * 150}ms` }}>
                    <img src={src} alt="Freelancer" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <h2 className="text-5xl sm:text-7xl font-black text-white font-headline">{t('joinCtaTitle')}</h2>
              <button 
                onClick={() => handleAction("Developer Registration")}
                className="px-14 py-6 bg-cyan-500 text-slate-950 rounded-full font-black text-xl hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:animate-btn-bounce relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:animate-btn-ripple pointer-events-none"></span>
                {t('beginCompileBtn')}
              </button>
           </motion.div>
        </section>
      </main>
    </div>
  );
}
