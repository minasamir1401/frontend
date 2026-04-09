"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { API_URL } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [role, setRole] = useState<"DEVELOPER" | "CLIENT">("DEVELOPER");
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "", skills: "", title: "", bio: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    const modeParam = params.get("mode");
    if (roleParam === "CLIENT" || roleParam === "DEVELOPER") setRole(roleParam as "DEVELOPER" | "CLIENT");
    if (modeParam === "login") setMode("login");
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading"); setErrorMsg("");
    try {
      const response = await fetch(`${API_URL}/users/sync`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });
      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        localStorage.setItem("userRole", role); localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name || ""); localStorage.setItem("userImage", user.image || "");
        localStorage.setItem("authToken", token);
        setStatus("success");
        setTimeout(() => window.location.href = role === "CLIENT" ? "/dashboard/client" : "/portfolio", 1500);
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "Registration failed"); setStatus("error");
      }
    } catch (err) {
      setErrorMsg(isRtl ? "خطأ في الاتصال بالخادم" : "Server connection failed"); setStatus("error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading"); setErrorMsg("");
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        localStorage.setItem("userRole", user.role); localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name || ""); localStorage.setItem("userImage", user.image || "");
        localStorage.setItem("authToken", token);
        setStatus("success");
        setTimeout(() => window.location.href = user.role === "CLIENT" ? "/dashboard/client" : "/portfolio", 1500);
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "Invalid credentials"); setStatus("error");
      }
    } catch (err) {
      setErrorMsg(isRtl ? "خطأ في الاتصال بالخادم" : "Server connection failed"); setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className={`min-h-screen bg-[#070b14] text-white flex overflow-hidden ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto relative z-10">
        
        {/* Left Side: Visual/Branding (Hidden on small screens) */}
        <div className="hidden lg:flex w-[45%] flex-col justify-between p-16 relative border-r border-white/5 bg-slate-950/50 backdrop-blur-3xl">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/" className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="material-symbols-outlined text-white">webhook</span>
              </span>
              Mina Ghareeb
            </Link>
          </motion.div>

          <div className="relative flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={mode + role}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                   <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                   <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-100">
                     {mode === 'login' ? 'Secure Authentication' : 'Network Registration'}
                   </span>
                </div>
                
                <h1 className="text-5xl xl:text-6xl font-black leading-tight">
                  {mode === 'login' ? (
                    isRtl ? <>أهلاً بك مرة أخرى في <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">منصتك الخاصة.</span></> : <>Welcome back to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Your Workspace.</span></>
                  ) : (
                    role === 'DEVELOPER' 
                    ? (isRtl ? <>انضم لنخبة <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">المهندسين.</span></> : <>Join the Elite <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Engineering Network.</span></>)
                    : (isRtl ? <>وظّف أفضل الكفاءات <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">لمشروعك.</span></> : <>Hire Top-Tier Talent <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">For Your Vision.</span></>)
                  )}
                </h1>
                
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  {mode === 'login' 
                    ? (isRtl ? 'قم بتسجيل الدخول للوصول إلى مشاريعك، مراسلة عملائك، ومتابعة نموك الاحترافي بأمان تام.' : 'Sign in to access your projects, securely message your partners, and track your professional growth.')
                    : (isRtl ? 'بوابتك لعالم العمل الحر الاحترافي، حيث تلتقي المشاريع الطموحة مع المهارات التقنية الفائقة ببيئة آمنة وموثوقة.' : 'Your gateway to a premium freelance ecosystem, matching ambitious visions with exceptional technical execution in a secure environment.')}
                </p>

                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                    <div className="space-y-2">
                       <span className="text-3xl font-black text-white">12k+</span>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{isRtl ? 'مهندس موثق' : 'Verified Engineers'}</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-3xl font-black text-white">$4M+</span>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{isRtl ? 'حجم المشاريع' : 'Project Volume'}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-cyan-400 transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">{isRtl ? 'شروط الخدمة' : 'Terms of Service'}</Link>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
          
          <div className="w-full max-w-md lg:hidden mb-12 flex justify-between items-center z-20">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">webhook</span>
              </span>
              Mina
            </Link>
          </div>

          <motion.div 
            variants={containerVariants} initial="hidden" animate="show"
            className="w-full max-w-xl mx-auto space-y-10 relative z-20"
          >
            {/* Header / Tabs */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black">{mode === 'login' ? (isRtl ? 'تسجيل الدخول' : 'Sign In') : (isRtl ? 'إنشاء حساب' : 'Create Account')}</h2>
                  <p className="text-slate-400 mt-2">
                    {mode === 'login' 
                      ? (isRtl ? 'ليس لديك حساب؟ ' : 'Don\'t have an account? ') 
                      : (isRtl ? 'لديك حساب بالفعل؟ ' : 'Already have an account? ')}
                    <button onClick={() => {setMode(mode === 'login' ? 'register' : 'login'); setStatus('idle'); setErrorMsg('');}} className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline underline-offset-4">
                      {mode === 'login' ? (isRtl ? 'سجل الآن' : 'Register now') : (isRtl ? 'سجل دخول' : 'Sign in')}
                    </button>
                  </p>
                </div>
              </div>

              {/* Role Selector (Only for Register) */}
              <AnimatePresence>
                {mode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="flex p-1 bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <button 
                      onClick={(e) => { e.preventDefault(); setRole('DEVELOPER'); }}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${role === 'DEVELOPER' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                      {isRtl ? 'مطور' : 'Developer'}
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); setRole('CLIENT'); }}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${role === 'CLIENT' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">business_center</span>
                      {isRtl ? 'عميل' : 'Client'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Form */}
            <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-6">
              
              <AnimatePresence mode="popLayout">
                {mode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 ml-1 block">{isRtl ? 'الاسم الكامل' : 'Full Name'}</label>
                       <div className="relative">
                         <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-500 text-lg">person</span>
                         <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                           placeholder={isRtl ? 'جون دو' : 'John Doe'}
                         />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 ml-1 block">{isRtl ? 'رقم الهاتف' : 'Phone Number'}</label>
                       <div className="relative">
                         <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-500 text-lg">call</span>
                         <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                           className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                           placeholder="+1 234 567 890"
                         />
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants} className="space-y-5">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-400 ml-1 block">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                   <div className="relative">
                     <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-500 text-lg">mail</span>
                     <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                       placeholder="hello@example.com"
                     />
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between items-center mb-1">
                     <label className="text-xs font-bold text-slate-400 ml-1">{isRtl ? 'كلمة المرور' : 'Password'}</label>
                     {mode === 'login' && <Link href="#" className="text-xs text-cyan-400 hover:underline">{isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?'}</Link>}
                   </div>
                   <div className="relative">
                     <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-500 text-lg">lock</span>
                     <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                       className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                       placeholder="••••••••"
                     />
                   </div>
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {mode === 'register' && role === 'DEVELOPER' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-5"
                  >
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 ml-1 block">{isRtl ? 'المسمى الوظيفي' : 'Professional Title'}</label>
                       <div className="relative">
                         <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-500 text-lg">badge</span>
                         <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                           className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                           placeholder="Full-Stack Developer"
                         />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 ml-1 block">{isRtl ? 'المهارات (مفصولة بفواصل)' : 'Skills (comma separated)'}</label>
                       <div className="relative">
                         <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-500 text-lg">code_blocks</span>
                         <input required value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})}
                           className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                           placeholder="React, Node.js, Python"
                         />
                       </div>
                    </div>
                  </motion.div>
                )}
                
                {mode === 'register' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-2">
                     <label className="text-xs font-bold text-slate-400 ml-1 block">{isRtl ? 'نبذة مختصرة' : 'Short Bio'}</label>
                     <div className="relative">
                       <span className="absolute top-4 left-4 material-symbols-outlined text-slate-500 text-lg">edit_document</span>
                       <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})}
                         className={`w-full bg-slate-900/50 border border-white/10 focus:border-cyan-500 py-3.5 rounded-xl outline-none transition-all placeholder:text-slate-600 resize-none h-24 ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                         placeholder={isRtl ? 'اخبرنا قليلاً عن نفسك...' : 'Tell us a bit about yourself...'}
                       />
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {status === 'error' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 text-red-500">
                  <span className="material-symbols-outlined">error</span>
                  <p className="text-sm font-bold">{errorMsg}</p>
                </motion.div>
              )}

              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={status === 'loading'}
                className={`w-full py-4 text-center rounded-xl font-bold text-slate-950 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 ${status === 'success' ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400'}`}
              >
                {status === 'loading' 
                  ? <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  : status === 'success'
                  ? <><span className="material-symbols-outlined">check_circle</span> {isRtl ? 'تم بنجاح!' : 'Success!'}</>
                  : <>{mode === 'login' ? (isRtl ? 'دخول للمنصة' : 'Sign In securely') : (isRtl ? 'إنشاء حسابي' : 'Create my account')} <span className={`material-symbols-outlined text-lg ${isRtl ? 'rotate-180' : ''}`}>arrow_forward_ios</span></>
                }
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
