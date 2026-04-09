"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { API_URL } from "@/lib/api";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [role, setRole] = useState<"DEVELOPER" | "CLIENT">("DEVELOPER");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skills: "",
    title: "",
    bio: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    const modeParam = params.get("mode");
    if (roleParam === "CLIENT" || roleParam === "DEVELOPER") {
      setRole(roleParam as "DEVELOPER" | "CLIENT");
    }
    if (modeParam === "login") setMode("login");
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const response = await fetch(`${API_URL}/users/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name || "");
        localStorage.setItem("userImage", user.image || "");
        localStorage.setItem("authToken", token);
        setStatus("success");
        setTimeout(() => {
          window.location.href = role === "CLIENT" ? "/dashboard/client" : "/portfolio";
        }, 1200);
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "Something went wrong");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg(isRtl ? "فشل الاتصال بالسيرفر" : "Backend connection failed");
      setStatus("error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name || "");
        localStorage.setItem("userImage", user.image || "");
        localStorage.setItem("authToken", token);
        setStatus("success");
        setTimeout(() => {
          window.location.href = user.role === "CLIENT" ? "/dashboard/client" : "/portfolio";
        }, 1200);
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "Invalid credentials");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg(isRtl ? "فشل الاتصال بالسيرفر" : "Backend connection failed");
      setStatus("error");
    }
  };

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <header className={`fixed top-0 w-full z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl px-8 h-20 flex items-center max-w-[1920px] mx-auto border-b border-slate-200/20 ${isRtl ? 'flex-row-reverse' : 'flex-row justify-between'}`}>
        <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-plus-jakarta">Mina Ghareeb</Link>
          <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse ml-1"></div>
        </div>
        <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm text-slate-500 font-be-vietnam">
            {mode === "login" 
              ? (isRtl ? "ليس لديك حساب؟" : "No account yet?") 
              : (isRtl ? "هل انضممت بالفعل؟" : "Already joined?")}
          </span>
          <button 
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setStatus("idle"); setErrorMsg(""); }}
            className="px-5 py-2 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all border border-slate-200 dark:border-slate-800"
          >
            {mode === "login" ? (isRtl ? "إنشاء حساب" : "Sign Up") : (isRtl ? "تسجيل الدخول" : "Sign In")}
          </button>
        </div>
      </header>

      <main className="min-h-screen pt-32 pb-20 px-8 flex justify-center items-center">
        <div className={`w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          <div className={`space-y-12 ${isRtl ? 'text-start' : 'text-left'}`}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-plus-jakarta">
                {mode === "login" ? (
                  isRtl ? (
                    <><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">أهلاً</span> بعودتك.</>
                  ) : (
                    <>Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Back</span>.</>
                  )
                ) : (
                  isRtl ? (
                    <>بوابة الانضمام للـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">نخبة</span>.</>
                  ) : (
                    <>Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Elite</span> Network.</>
                  )
                )}
              </h1>
              <p className="text-lg text-slate-500 max-w-md font-be-vietnam leading-relaxed font-medium">
                {mode === "login" 
                  ? (isRtl ? "سجل دخولك الآن للوصول إلى لوحة التحكم، استكمال المشاريع، والرد على الرسائل بأمان تام في بيئتك المعزولة." : "Sign in to securely access your isolated dashboard, deploy your projects, and respond to incoming packets.")
                  : (isRtl ? "حيث تلتقي الأنظمة والمشاريع المعقدة مع أفضل المهارات الهندسية ومطوري الواجهات الخلفية (Backend) والواجهات الأمامية." : "Where complex systems and architectures meet top-tier backend and frontend engineering talent.")}
              </p>
            </div>

            {mode === "register" ? (
              <div className="space-y-8 animate-in delay-150">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 font-plus-jakarta">{isRtl ? "حدد نوع حسابك" : "Define Identity"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setRole("DEVELOPER")}
                      className={`p-6 flex flex-col rounded-3xl border-2 transition-all text-start group relative overflow-hidden focus:outline-none ${role === "DEVELOPER" ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 shadow-xl shadow-cyan-500/10" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-500/30 hover:-translate-y-1"}`}
                    >
                      <div className="absolute -bottom-4 -right-4 opacity-5 text-8xl font-black font-mono">{"{}"}</div>
                      <span className={`material-symbols-outlined text-4xl mb-4 ${role === "DEVELOPER" ? "text-cyan-500" : "text-slate-400"}`}>terminal</span>
                      <div className="font-black text-xl text-slate-900 dark:text-white font-plus-jakarta mb-2">{t('imADeveloper')}</div>
                      <div className="text-[11px] text-slate-500 font-medium leading-relaxed">{t('devBenefits')}</div>
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => setRole("CLIENT")}
                      className={`p-6 flex flex-col rounded-3xl border-2 transition-all text-start group relative overflow-hidden focus:outline-none ${role === "CLIENT" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-xl shadow-blue-500/10" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/30 hover:-translate-y-1"}`}
                    >
                      <div className="absolute -bottom-4 -right-4 opacity-5 text-8xl font-black font-mono">{"()"}</div>
                      <span className={`material-symbols-outlined text-4xl mb-4 ${role === "CLIENT" ? "text-blue-500" : "text-slate-400"}`}>cloud_done</span>
                      <div className="font-black text-xl text-slate-900 dark:text-white font-plus-jakarta mb-2">{t('imAClient')}</div>
                      <div className="text-[11px] text-slate-500 font-medium leading-relaxed">{t('clientBenefits')}</div>
                    </button>
                  </div>
                </div>

                <div className="rounded-[2rem] overflow-hidden relative aspect-video border-[6px] border-white dark:border-slate-800 shadow-2xl group">
                  <div className="absolute inset-0 bg-cyan-900/20 mix-blend-multiply z-10"></div>
                  <img src={role === "DEVELOPER" ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" alt="Tech" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent flex flex-col justify-end p-6 z-20">
                    <p className="text-white text-sm font-bold font-plus-jakarta mb-1">
                      {role === "DEVELOPER" 
                        ? (isRtl ? 'بيئة متكاملة تضمن لك جودة الشيفرة وتسليم الكود في الوقت المحدد.' : 'Integrated pipelines ensuring code quality and timely shipping.')
                        : (isRtl ? 'وظّف نُخبة المبرمجين وانشر مشاريعك الهندسية فوراً.' : 'Hire elite hackers and deploy your architecture seamlessly.')}
                    </p>
                    <div className="flex gap-4 mt-2 text-[10px] font-black uppercase text-cyan-400 tracking-widest">
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">verified</span> {isRtl ? 'أمان' : 'Secure'}</span>
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">speed</span> {isRtl ? 'سرعة' : 'O(1) Speed'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in delay-150">
                 <div className="rounded-[2.5rem] overflow-hidden relative aspect-[4/3] border-[8px] border-white dark:border-slate-800 shadow-3xl group">
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply z-10"></div>
                  <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" alt="Matrix" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-8 z-20">
                    <div className="space-y-2">
                       <h4 className="text-cyan-400 font-black text-xl font-headline italic">Terminal Ready.</h4>
                       <p className="text-slate-300 text-sm font-medium leading-relaxed">
                         {isRtl ? 'محطة التحكم الخاصة بك جاهزة للعمل، راجع رسائلك الكودية ونظم مهامك بكفاءة.' : 'Your workstation is armed. Review logs, chat with peers, and deploy code securely.'}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] shadow-3xl border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
            <div className={`absolute top-0 ${isRtl ? 'left-0 translate-x-[-50%]' : 'right-0 translate-x-[50%]'} translate-y-[-50%] w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl`}></div>
            
            <form className="space-y-8 relative z-10" onSubmit={mode === "login" ? handleLogin : handleRegister}>
              <div className="space-y-8">
                
                {/* Section 1: Security & Auth */}
                <div className="space-y-4">
                  {mode === "register" && (
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2 text-slate-400">
                       {isRtl ? "بيانات الدخول الأساسية" : "Authentication Details"}
                    </h4>
                  )}
                  <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "البريد الإلكتروني" : "Email Address"}</label>
                       <div className="relative group">
                          <span className="absolute top-1/2 -translate-y-1/2 left-5 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 transition-colors">alternate_email</span>
                          <input 
                            required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="alex@example.com"
                            className={`w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none font-be-vietnam text-start ${isRtl ? 'pr-5 pl-14 text-end' : 'pl-14 pr-5'}`}
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "كلمة المرور" : "Security Key (Password)"}</label>
                       <div className="relative group">
                          <span className="absolute top-1/2 -translate-y-1/2 left-5 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 transition-colors">lock</span>
                          <input 
                            required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••"
                            className={`w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none font-be-vietnam text-start ${isRtl ? 'pr-5 pl-14 text-end' : 'pl-14 pr-5'}`}
                          />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Personal Profile */}
                {mode === "register" && (
                  <div className="space-y-4 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2 text-slate-400">
                       {isRtl ? "الملف الشخصي" : "Personal Profile"}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                         <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "الاسم الكامل" : "Full Name"}</label>
                         <div className="relative group">
                            <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 text-lg transition-colors">person</span>
                            <input 
                              required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Alex Rivers"
                              className={`w-full py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none font-be-vietnam text-start ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                            />
                         </div>
                      </div>
                      
                      <div className="space-y-2">
                         <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
                         <div className="relative group">
                            <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 text-lg transition-colors">call</span>
                            <input 
                              type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+20 123 456 7890"
                              className={`w-full py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none font-be-vietnam text-start ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                            />
                         </div>
                      </div>
                    </div>
                    
                    {role === "DEVELOPER" && (
                      <div className="space-y-5 pt-2">
                        <div className="space-y-2">
                           <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "المسمى الوظيفي" : "Professional Title"}</label>
                           <div className="relative group">
                              <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 text-lg transition-colors">badge</span>
                              <input 
                                required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Senior Full-Stack Engineer"
                                className={`w-full py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none font-be-vietnam text-start ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "المهارات (مفصولة بفواصل)" : "Skills (comma separated)"}</label>
                           <div className="relative group">
                              <span className="absolute top-1/2 -translate-y-1/2 left-4 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 text-lg transition-colors">code_blocks</span>
                              <input 
                                required value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} placeholder="React, Next.js, Rust, PostgreSQL"
                                className={`w-full py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none font-be-vietnam text-start ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                              />
                           </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 pt-2">
                       <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 font-plus-jakarta text-start">{isRtl ? "وصف مختصر (Bio)" : "Description / Bio"}</label>
                       <div className="relative group">
                          <span className="absolute top-6 -translate-y-1/2 left-4 material-symbols-outlined text-slate-400 group-focus-within:text-cyan-500 text-lg transition-colors">edit_document</span>
                          <textarea 
                            value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} placeholder={isRtl ? "صف خبراتك بإيجاز..." : "Briefly describe your expertise..."}
                            className={`w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-cyan-500/50 dark:text-white transition-all outline-none resize-none h-32 font-be-vietnam text-start ${isRtl ? 'pr-4 pl-12 text-end' : 'pl-12 pr-4'}`}
                          />
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={status === "loading"}
                className={`w-full mt-8 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 font-plus-jakarta ${
                  status === "success"
                  ? "bg-emerald-500 text-white"
                  : mode === "login"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100"
                  : role === "CLIENT" 
                  ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/25" 
                  : "bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-500/25"
                }`}
              >
                {status === "loading" 
                  ? (isRtl ? "جاري المعالجة..." : "Processing...") 
                  : status === "success" 
                  ? (isRtl ? "تم المصادقة!" : "Authenticated!") 
                  : mode === "login"
                  ? (isRtl ? "بدء الجلسة" : "Initialize Session")
                  : (isRtl ? "تسجيل كـ " : "Register as ") + (role === "CLIENT" ? (isRtl ? "مؤسسة" : "Client") : (isRtl ? "مهندس" : "Engineer"))}
                <span className={`material-symbols-outlined font-black ${isRtl ? 'rotate-180' : ''}`}>
                   {status === "success" ? "check_circle" : "arrow_forward"}
                </span>
              </button>

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 flex items-start gap-3">
                   <span className="material-symbols-outlined text-red-500">error</span>
                   <p className="text-red-600 dark:text-red-400 text-sm font-bold font-be-vietnam mt-0.5">
                     {errorMsg || (isRtl ? "حدث خطأ ما. تأكد من عمل بيئة التطوير (Backend)." : "Connection refused. Verify backend port.")}
                   </p>
                </div>
              )}

              <p className="text-center text-slate-400 text-[10px] font-bold leading-relaxed font-be-vietnam uppercase tracking-widest px-8 mt-6">
                {isRtl ? (
                  <>بالاستمرار، فإنك توافق على <Link href="#" className="text-cyan-600 hover:text-cyan-500 underline underline-offset-4">بروتوكولات الأمان</Link> و <Link href="#" className="text-cyan-600 hover:text-cyan-500 underline underline-offset-4">سياسة البيانات</Link>.</>
                ) : (
                  <>By proceeding, you agree to the <Link href="#" className="text-cyan-600 hover:text-cyan-500 underline underline-offset-4">Security Protocols</Link> and <Link href="#" className="text-cyan-600 hover:text-cyan-500 underline underline-offset-4">Data Policy</Link>.</>
                )}
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className={`w-full py-12 px-12 border-t border-slate-200/20 bg-white dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
        <div>© 2024 Mina Ghareeb. {isRtl ? "عمل حر راقٍ" : "High-end Freelancing"}.</div>
        <div className="flex gap-12">
          <Link href="#" className="hover:text-cyan-600 transition-colors">{isRtl ? "الشروط" : "Terms"}</Link>
          <Link href="#" className="hover:text-cyan-600 transition-colors">{isRtl ? "الخصوصية" : "Privacy"}</Link>
          <Link href="#" className="hover:text-cyan-600 transition-colors">{isRtl ? "المساعدة" : "Help"}</Link>
        </div>
      </footer>
    </div>
  );
}
